from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(String)
    subject = Column(String)
    level = Column(String)  # beginner, intermediate, advanced
    duration = Column(Integer)  # días
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")
    steps = relationship("RoadmapStep", back_populates="roadmap")

class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"

    id = Column(String, primary_key=True, index=True)
    roadmap_id = Column(String, ForeignKey("roadmaps.id"))
    order = Column(Integer)
    title = Column(String)
    description = Column(String)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    roadmap = relationship("Roadmap", back_populates="steps")

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    subject = Column(String)
    duration_minutes = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="study_sessions")
