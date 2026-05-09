import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from ..models.study import StudySession, Roadmap, RoadmapStep
from ..schemas.schemas import UserStats

class StatsService:
    @staticmethod
    async def get_user_stats(db: AsyncSession, user_id: str) -> UserStats:
        """Obtener estadísticas del usuario"""
        # Total minutos de estudio
        stmt = select(func.sum(StudySession.duration_minutes)).where(
            StudySession.user_id == user_id
        )
        result = await db.execute(stmt)
        total_minutes = result.scalar() or 0

        # Racha de días
        streak_days = await StatsService._calculate_streak(db, user_id)

        # Pasos completados
        stmt = select(func.count(RoadmapStep.id)).where(RoadmapStep.completed == True)
        result = await db.execute(stmt)
        completed_steps = result.scalar() or 0

        # Asunto actual
        stmt = (
            select(StudySession.subject)
            .where(StudySession.user_id == user_id)
            .order_by(StudySession.created_at.desc())
            .limit(1)
        )
        result = await db.execute(stmt)
        current_subject = result.scalar()

        return UserStats(
            total_minutes=total_minutes,
            streak_days=streak_days,
            completed_steps=completed_steps,
            current_subject=current_subject,
        )

    @staticmethod
    async def _calculate_streak(db: AsyncSession, user_id: str) -> int:
        """Calcular racha de días consecutivos"""
        # TODO: Implementar lógica de racha
        return 0

    @staticmethod
    async def get_weekly_stats(db: AsyncSession, user_id: str) -> dict:
        """Obtener estadísticas semanales"""
        stats = {}
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        
        for i, day in enumerate(days):
            target_date = datetime.utcnow() - timedelta(days=6-i)
            stmt = (
                select(func.sum(StudySession.duration_minutes))
                .where(
                    and_(
                        StudySession.user_id == user_id,
                        func.date(StudySession.created_at) == target_date.date(),
                    )
                )
            )
            result = await db.execute(stmt)
            stats[day] = result.scalar() or 0

        return stats

    @staticmethod
    async def record_session(
        db: AsyncSession, user_id: str, duration_minutes: int, subject: str
    ) -> StudySession:
        """Registrar sesión de estudio"""
        session = StudySession(
            id=str(uuid.uuid4()),
            user_id=user_id,
            subject=subject,
            duration_minutes=duration_minutes,
        )
        db.add(session)
        await db.commit()
        await db.refresh(session)
        return session
