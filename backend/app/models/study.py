from sqlalchemy import String, Integer, ForeignKey, DateTime, Text, Enum, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
import enum


class GoalPeriod(str, enum.Enum):
    weekly = "weekly"
    monthly = "monthly"


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(100))
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    sessions: Mapped[list["Session"]] = relationship(back_populates="subject")
    goals: Mapped[list["Goal"]] = relationship(back_populates="subject")


class Session(Base):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    duration_seconds: Mapped[int] = mapped_column(Integer)
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    date: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    subject: Mapped["Subject"] = relationship(back_populates="sessions")


class Goal(Base):
    __tablename__ = "goals"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"))
    target_seconds: Mapped[int] = mapped_column(Integer)
    period: Mapped[GoalPeriod] = mapped_column(
        Enum(GoalPeriod), default=GoalPeriod.weekly
    )
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    subject: Mapped["Subject"] = relationship(back_populates="goals")
