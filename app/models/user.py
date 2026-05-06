from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime
from enum import Enum as PyEnum
import uuid

Base = declarative_base()


class Provider(PyEnum):
    github = "github"
    google = "google"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    avatar_url = Column(String, nullable=True)
    provider = Column(Enum(Provider))
    provider_id = Column(String, unique=True)
    plan = Column(String, default="free")  # free, pro
    created_at = Column(DateTime, default=datetime.utcnow)
