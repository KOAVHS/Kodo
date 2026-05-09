from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.study import Subject, Session, Goal
from app.schemas.schemas import (
    SubjectCreate, SubjectResponse,
    SessionCreate, SessionResponse,
    GoalCreate, GoalResponse,
)

router = APIRouter(tags=["study"])

FREE_SUBJECT_LIMIT = 5


# --- SUBJECTS ---
@router.get("/subjects", response_model=list[SubjectResponse])
async def list_subjects(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Subject).where(Subject.user_id == user.id)
    )
    return result.scalars().all()


@router.post("/subjects", response_model=SubjectResponse, status_code=201)
async def create_subject(
    payload: SubjectCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.plan == "free":
        count = await db.scalar(
            select(func.count()).where(Subject.user_id == user.id)
        )
        if count >= FREE_SUBJECT_LIMIT:
            raise HTTPException(
                status_code=403,
                detail=f"plan free: máximo {FREE_SUBJECT_LIMIT} materias. actualiza a pro.",
            )

    subject = Subject(user_id=user.id, name=payload.name)
    db.add(subject)
    await db.flush()
    await db.refresh(subject)
    return subject


@router.delete("/subjects/{subject_id}", status_code=204)
async def delete_subject(
    subject_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Subject).where(Subject.id == subject_id, Subject.user_id == user.id)
    )
    subject = result.scalar_one_or_none()
    if not subject:
        raise HTTPException(status_code=404, detail="materia no encontrada")
    await db.delete(subject)


# --- SESSIONS ---
@router.get("/sessions", response_model=list[SessionResponse])
async def list_sessions(
    range: str = "week",
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    from datetime import datetime, timedelta, timezone

    now = datetime.now(timezone.utc)
    if range == "week":
        since = now - timedelta(days=7)
    elif range == "month":
        since = now - timedelta(days=30)
    else:
        since = now - timedelta(days=365)

    result = await db.execute(
        select(Session).where(
            Session.user_id == user.id,
            Session.date >= since,
        ).order_by(Session.date.desc())
    )
    return result.scalars().all()


@router.post("/sessions", response_model=SessionResponse, status_code=201)
async def create_session(
    payload: SessionCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    subject = await db.scalar(
        select(Subject).where(
            Subject.id == payload.subject_id, Subject.user_id == user.id
        )
    )
    if not subject:
        raise HTTPException(status_code=404, detail="materia no encontrada")

    session = Session(
        user_id=user.id,
        subject_id=payload.subject_id,
        duration_seconds=payload.duration_seconds,
        note=payload.note,
    )
    db.add(session)
    await db.flush()
    await db.refresh(session)
    return session


# --- GOALS ---
@router.get("/goals", response_model=list[GoalResponse])
async def list_goals(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Goal).where(Goal.user_id == user.id)
    )
    return result.scalars().all()


@router.post("/goals", response_model=GoalResponse, status_code=201)
async def create_goal(
    payload: GoalCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    goal = Goal(
        user_id=user.id,
        subject_id=payload.subject_id,
        target_seconds=payload.target_seconds,
        period=payload.period,
    )
    db.add(goal)
    await db.flush()
    await db.refresh(goal)
    return goal


@router.delete("/goals/{goal_id}", status_code=204)
async def delete_goal(
    goal_id: int,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Goal).where(Goal.id == goal_id, Goal.user_id == user.id)
    )
    goal = result.scalar_one_or_none()
    if not goal:
        raise HTTPException(status_code=404, detail="meta no encontrada")
    await db.delete(goal)
