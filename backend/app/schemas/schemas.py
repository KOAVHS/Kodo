from pydantic import BaseModel, EmailStr
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

# Stats Schemas
class UserStats(BaseModel):
    total_minutes: int
    streak_days: int
    completed_steps: int
    current_subject: Optional[str]
