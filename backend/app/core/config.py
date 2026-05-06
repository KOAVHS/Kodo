from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    APP_NAME: str = "study.log"
    SECRET_KEY: str
    ENVIRONMENT: Literal["development", "production"] = "development"

    DATABASE_URL: str = "sqlite+aiosqlite:///./studylog.db"

    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 días

    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""

    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""

    FRONTEND_URL: str = "exp://localhost:8081"

    class Config:
        env_file = ".env"


settings = Settings()
