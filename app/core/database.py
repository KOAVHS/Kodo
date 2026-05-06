from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.user import Base as UserBase
from app.models.study import Base as StudyBase

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
)

AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, future=True
)


async def init_db():
    """Inicializa la base de datos"""
    async with engine.begin() as conn:
        await conn.run_sync(UserBase.metadata.create_all)
        await conn.run_sync(StudyBase.metadata.create_all)


async def get_db() -> AsyncSession:
    """Dependency para obtener sesión de BD"""
    async with AsyncSessionLocal() as session:
        yield session
