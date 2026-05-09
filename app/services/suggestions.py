from datetime import datetime, timedelta, timezone
from app.models.study import Session, Subject
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


async def get_suggestions(user_id: int, db: AsyncSession) -> list[str]:
    """
    Genera sugerencias inteligentes basadas en patrones del usuario.
    Sin costo — lógica pura en backend.
    En plan Pro se puede reemplazar por Claude API para sugerencias más ricas.
    """
    now = datetime.now(timezone.utc)
    week_ago = now - timedelta(days=7)
    two_weeks_ago = now - timedelta(days=14)

    sessions_result = await db.execute(
        select(Session).where(Session.user_id == user_id)
    )
    sessions = sessions_result.scalars().all()

    subjects_result = await db.execute(
        select(Subject).where(Subject.user_id == user_id)
    )
    subjects = subjects_result.scalars().all()
    subject_map = {s.id: s.name for s in subjects}

    suggestions = []

    # 1. Materia descuidada esta semana
    weekly_totals: dict[int, int] = {}
    prev_week_totals: dict[int, int] = {}

    for s in sessions:
        if s.date >= week_ago:
            weekly_totals[s.subject_id] = (
                weekly_totals.get(s.subject_id, 0) + s.duration_seconds
            )
        elif s.date >= two_weeks_ago:
            prev_week_totals[s.subject_id] = (
                prev_week_totals.get(s.subject_id, 0) + s.duration_seconds
            )

    for subject in subjects:
        if subject.id not in weekly_totals and subject.id in prev_week_totals:
            days_since = (now - max(
                s.date for s in sessions if s.subject_id == subject.id
            )).days
            suggestions.append(
                f"llevas {days_since} días sin tocar {subject_map[subject.id]} — ¿lo agendamos esta semana?"
            )

    # 2. Racha en peligro
    today = now.date()
    studied_today = any(s.date.date() == today for s in sessions)
    if not studied_today:
        hour = now.hour
        if hour >= 20:
            suggestions.append(
                "son las 8pm y aún no registras sesión — no rompas la racha hoy."
            )

    # 3. Comparación semana anterior
    total_this_week = sum(weekly_totals.values())
    total_prev_week = sum(prev_week_totals.values())

    if total_prev_week > 0:
        change = (total_this_week - total_prev_week) / total_prev_week * 100
        if change <= -30:
            suggestions.append(
                f"esta semana estudiaste {abs(int(change))}% menos que la anterior — ¿todo bien?"
            )
        elif change >= 20:
            suggestions.append(
                f"esta semana estudiaste {int(change)}% más que la anterior — buen ritmo."
            )

    # 4. Materia dominante
    if weekly_totals:
        top_id = max(weekly_totals, key=lambda k: weekly_totals[k])
        top_hours = weekly_totals[top_id] / 3600
        if top_hours > 10:
            suggestions.append(
                f"llevas más de {int(top_hours)}h en {subject_map[top_id]} esta semana — considera balancear con otras materias."
            )

    return suggestions[:3]  # máximo 3 sugerencias a la vez
