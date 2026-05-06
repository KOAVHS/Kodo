from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.core.config import settings
from app.core.security import get_current_user
from app.routers import auth, study, stats
from app.services.suggestions import get_suggestions
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(study.router)
app.include_router(stats.router)


@app.get("/")
async def root():
    return {"app": settings.APP_NAME, "status": "online"}


@app.get("/me")
async def me(user=Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "avatar_url": user.avatar_url,
        "plan": user.plan,
    }


@app.get("/suggestions")
async def suggestions(
    user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return {"suggestions": await get_suggestions(user.id, db)}
