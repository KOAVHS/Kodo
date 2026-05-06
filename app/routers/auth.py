from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.config import settings
from app.models.user import User, Provider
from app.schemas.schemas import TokenResponse
import httpx

router = APIRouter(prefix="/auth", tags=["auth"])

GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_URL = "https://api.github.com/user"
GITHUB_EMAIL_URL = "https://api.github.com/user/emails"

GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USER_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


async def upsert_user(
    db: AsyncSession,
    email: str,
    name: str,
    avatar_url: str | None,
    provider: Provider,
    provider_id: str,
) -> User:
    result = await db.execute(
        select(User).where(
            User.provider == provider, User.provider_id == provider_id
        )
    )
    user = result.scalar_one_or_none()

    if not user:
        # busca por email para unir cuentas si ya existe
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

    if user:
        user.name = name
        user.avatar_url = avatar_url
    else:
        user = User(
            email=email,
            name=name,
            avatar_url=avatar_url,
            provider=provider,
            provider_id=provider_id,
        )
        db.add(user)

    await db.flush()
    await db.refresh(user)
    return user


@router.get("/github/callback", response_model=TokenResponse)
async def github_callback(code: str, db: AsyncSession = Depends(get_db)):
    async with httpx.AsyncClient() as client:
        # intercambia code por token
        token_res = await client.post(
            GITHUB_TOKEN_URL,
            headers={"Accept": "application/json"},
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            },
        )
        token_data = token_res.json()
        access_token = token_data.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="github auth fallida")

        headers = {"Authorization": f"Bearer {access_token}"}

        # datos del usuario
        user_res = await client.get(GITHUB_USER_URL, headers=headers)
        github_user = user_res.json()

        # email (puede ser privado en GitHub)
        email = github_user.get("email")
        if not email:
            emails_res = await client.get(GITHUB_EMAIL_URL, headers=headers)
            emails = emails_res.json()
            primary = next((e for e in emails if e.get("primary")), None)
            email = primary["email"] if primary else f"{github_user['id']}@github.local"

    user = await upsert_user(
        db=db,
        email=email,
        name=github_user.get("name") or github_user.get("login", ""),
        avatar_url=github_user.get("avatar_url"),
        provider=Provider.github,
        provider_id=str(github_user["id"]),
    )

    return TokenResponse(access_token=create_access_token(user.id))


@router.get("/google/callback", response_model=TokenResponse)
async def google_callback(
    code: str, redirect_uri: str, db: AsyncSession = Depends(get_db)
):
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code",
                "redirect_uri": redirect_uri,
            },
        )
        token_data = token_res.json()
        access_token = token_data.get("access_token")

        if not access_token:
            raise HTTPException(status_code=400, detail="google auth fallida")

        user_res = await client.get(
            GOOGLE_USER_URL,
            headers={"Authorization": f"Bearer {access_token}"},
        )
        google_user = user_res.json()

    user = await upsert_user(
        db=db,
        email=google_user["email"],
        name=google_user.get("name", ""),
        avatar_url=google_user.get("picture"),
        provider=Provider.google,
        provider_id=google_user["id"],
    )

    return TokenResponse(access_token=create_access_token(user.id))
