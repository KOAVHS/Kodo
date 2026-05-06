from sqlalchemy import String, Enum, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
import enum


class Plan(str, enum.Enum):
    free = "free"
    pro = "pro"


class Provider(str, enum.Enum):
    google = "google"
    github = "github"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    provider: Mapped[Provider] = mapped_column(Enum(Provider))
    provider_id: Mapped[str] = mapped_column(String(255), index=True)
    plan: Mapped[Plan] = mapped_column(Enum(Plan), default=Plan.free)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
