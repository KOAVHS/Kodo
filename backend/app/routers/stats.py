from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta, timezone
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.study import Subject, Session
from app.schemas.schemas import StatsOverview, SubjectStat, HeatmapEntry

router = APIRouter(prefix="/stats", tags=["stats"])


def compute_streak(dates: list[datetime]) -> tuple[int, int]:
    if not dates:
        return 0, 0

    unique_days = sorted(set(d.date() for d in dates), reverse=True)
    today = datetime.now(timezone.utc).date()

    current = 0
    best = 0
    temp = 0
    prev = None

    for day in unique_days:
        if prev is None:
            if day == today or day == today - timedelta(days=1):
                temp = 1
            else:
                break
        else:
            if (prev - day).days == 1:
                temp += 1
            else:
                break
        prev = day

    current = temp

    temp = 0
    prev = None
    for day in sorted(unique_days):
        if prev is None or (day - prev).days == 1:
            temp += 1
            best = max(best, temp)
        else:
            temp = 1
        prev = day

    return current, best


@router.get("/overview", response_model=StatsOverview)
async def stats_overview(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = now - timedelta(days=7)
    month_start = now - timedelta(days=30)

    all_sessions = await db.execute(
        select(Session).where(Session.user_id == user.id)
    )
    sessions = all_sessions.scalars().all()

    total_today = sum(
        s.duration_seconds for s in sessions if s.date >= today_start
    )
    total_week = sum(
        s.duration_seconds for s in sessions if s.date >= week_start
    )
    total_month = sum(
        s.duration_seconds for s in sessions if s.date >= month_start
    )

    current_streak, best_streak = compute_streak([s.date for s in sessions])

    # stats por materia esta semana
    subjects_result = await db.execute(
        select(Subject).where(Subject.user_id == user.id)
    )
    subjects = subjects_result.scalars().all()
    subject_map = {s.id: s.name for s in subjects}

    subject_totals: dict[int, int] = {}
    for s in sessions:
        if s.date >= week_start:
            subject_totals[s.subject_id] = (
                subject_totals.get(s.subject_id, 0) + s.duration_seconds
            )

    subject_stats = [
        SubjectStat(
            subject_id=sid,
            subject_name=subject_map.get(sid, "?"),
            total_seconds=total,
        )
        for sid, total in sorted(
            subject_totals.items(), key=lambda x: x[1], reverse=True
        )
    ]

    top_subject = subject_stats[0].subject_name if subject_stats else None

    return StatsOverview(
        total_seconds_today=total_today,
        total_seconds_week=total_week,
        total_seconds_month=total_month,
        current_streak=current_streak,
        best_streak=best_streak,
        top_subject=top_subject,
        subjects=subject_stats,
    )


@router.get("/heatmap", response_model=list[HeatmapEntry])
async def stats_heatmap(
    months: int = 3,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    since = datetime.now(timezone.utc) - timedelta(days=months * 30)

    result = await db.execute(
        select(Session).where(
            Session.user_id == user.id,
            Session.date >= since,
        )
    )
    sessions = result.scalars().all()

    daily: dict[str, int] = {}
    for s in sessions:
        key = s.date.strftime("%Y-%m-%d")
        daily[key] = daily.get(key, 0) + s.duration_seconds

    return [
        HeatmapEntry(date=date, total_seconds=total)
        for date, total in sorted(daily.items())
    ]
