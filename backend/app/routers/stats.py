from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..core.database import get_db
from ..schemas.schemas import StudySessionCreate, UserStats

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("", response_model=UserStats)
async def get_stats(user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para obtener estadísticas del usuario
    return UserStats(
        total_minutes=1200,
        streak_days=7,
        completed_steps=15,
        current_subject="Python",
    )

@router.get("/weekly")
async def get_weekly_stats(user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para obtener estadísticas semanales
    return {
        "monday": 120,
        "tuesday": 90,
        "wednesday": 150,
        "thursday": 100,
        "friday": 80,
        "saturday": 200,
        "sunday": 60,
    }

@router.post("/session")
async def record_study_session(session_data: StudySessionCreate, user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para registrar sesión de estudio
    return {"message": "Session recorded", "duration_minutes": session_data.duration_minutes}
