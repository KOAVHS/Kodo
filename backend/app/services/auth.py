import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..models.user import User
from ..core.security import get_password_hash, verify_password, create_access_token
from ..schemas.schemas import UserRegister, TokenResponse, UserResponse

class AuthService:
    @staticmethod
    async def register_user(db: AsyncSession, user_data: UserRegister) -> TokenResponse:
        # Verificar si usuario ya existe
        stmt = select(User).where((User.email == user_data.email) | (User.username == user_data.username))
        result = await db.execute(stmt)
        if result.scalar_one_or_none():
            raise ValueError("User already exists")
        
        # Crear usuario
        user = User(
            id=str(uuid.uuid4()),
            email=user_data.email,
            username=user_data.username,
            hashed_password=get_password_hash(user_data.password),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        
        # Generar token
        access_token = create_access_token({"sub": user.id})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.from_orm(user),
        )

    @staticmethod
    async def login_user(db: AsyncSession, email: str, password: str) -> TokenResponse:
        stmt = select(User).where(User.email == email)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(password, user.hashed_password):
            raise ValueError("Invalid credentials")
        
        access_token = create_access_token({"sub": user.id})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.from_orm(user),
        )

    @staticmethod
    async def get_user_by_id(db: AsyncSession, user_id: str) -> User:
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
