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
    total_minutes: int
    streak_days: int
    completed_steps: int
    current_subject: Optional[str]


class HeatmapEntry(BaseModel):
    date: str
    total_seconds: int
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    username: str
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Roadmap Schemas
class RoadmapStepResponse(BaseModel):
    id: str
    order: int
    title: str
    description: str
    completed: bool

    class Config:
        from_attributes = True

class RoadmapResponse(BaseModel):
    id: str
    title: str
    description: str
    subject: str
    level: str
    duration: int
    steps: List[RoadmapStepResponse]
    created_at: datetime

    class Config:
        from_attributes = True

class RoadmapCreate(BaseModel):
    subject: str
    level: str
    duration: int

# Study Session Schemas
class StudySessionCreate(BaseModel):
    duration_minutes: int
    subject: str

class StudySessionResponse(BaseModel):
    id: str
    subject: str
    duration_minutes: int
    created_at: datetime

    class Config:
        from_attributes = True

