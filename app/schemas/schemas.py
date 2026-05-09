from pydantic import BaseModel
from datetime import datetime


# ===== AUTH =====
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ===== SUBJECTS =====
class SubjectCreate(BaseModel):
    name: str


class SubjectResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True


# ===== SESSIONS =====
class SessionCreate(BaseModel):
    subject_id: int
    duration_seconds: int
    note: str | None = None


class SessionResponse(BaseModel):
    id: int
    subject_id: int
    date: datetime
    duration_seconds: int
    note: str | None = None

    class Config:
        from_attributes = True


# ===== GOALS =====
class GoalCreate(BaseModel):
    subject_id: int
    target_seconds: int
    period: str


class GoalResponse(BaseModel):
    id: int
    subject_id: int
    target_seconds: int
    period: str

    class Config:
        from_attributes = True


# ===== STATS =====
class SubjectStat(BaseModel):
    subject_id: int
    subject_name: str
    total_seconds: int


class HeatmapEntry(BaseModel):
    date: str
    minutes: int


class StatsOverview(BaseModel):
    total_today: int
    total_week: int
    total_month: int
    current_streak: int
    best_streak: int
    subject_stats: list[SubjectStat]
    heatmap: list[HeatmapEntry]
