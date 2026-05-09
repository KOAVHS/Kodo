from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..core.database import get_db
from ..services.stats import StatsService
from ..schemas.schemas import StudySessionCreate, UserStats

router = APIRouter(prefix="/goals", tags=["goals"])

@router.get("")
async def get_goals(user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para obtener metas
    return {"goals": []}

@router.post("")
async def create_goal(user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para crear meta
    return {"message": "Goal created"}

@router.put("/{goal_id}")
async def update_goal(goal_id: str, user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para actualizar meta
    return {"message": "Goal updated"}

@router.delete("/{goal_id}")
async def delete_goal(goal_id: str, user_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para eliminar meta
    return {"message": "Goal deleted"}
