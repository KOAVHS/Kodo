from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Literal


# --- Auth ---
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    avatar_url: str | None
    plan: Literal["free", "pro"]
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Subjects ---
class SubjectCreate(BaseModel):
    name: str


class SubjectResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Sessions ---
class SessionCreate(BaseModel):
    subject_id: int
    duration_seconds: int
    note: str | None = None


class SessionResponse(BaseModel):
    id: int
    subject_id: int
    duration_seconds: int
    note: str | None
    date: datetime

    model_config = {"from_attributes": True}


# --- Goals ---
class GoalCreate(BaseModel):
    subject_id: int
    target_seconds: int
    period: Literal["weekly", "monthly"] = "weekly"


class GoalResponse(BaseModel):
    id: int
    subject_id: int
    target_seconds: int
    period: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Stats ---
class SubjectStat(BaseModel):
    subject_id: int
    subject_name: str
    total_seconds: int


class StatsOverview(BaseModel):
    total_seconds_today: int
    total_seconds_week: int
    total_seconds_month: int
    current_streak: int
    best_streak: int
    top_subject: str | None
    subjects: list[SubjectStat]


class HeatmapEntry(BaseModel):
    date: str
    total_seconds: int
