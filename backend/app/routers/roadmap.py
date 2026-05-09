from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..core.database import get_db
from ..services.roadmap import RoadmapService
from ..schemas.schemas import RoadmapCreate, RoadmapResponse

router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])

@router.get("", response_model=list[RoadmapResponse])
async def get_roadmaps(user_id: str, db: AsyncSession = Depends(get_db)):
    return await RoadmapService.get_user_roadmaps(db, user_id)

@router.get("/{roadmap_id}", response_model=RoadmapResponse)
async def get_roadmap(roadmap_id: str, db: AsyncSession = Depends(get_db)):
    try:
        return await RoadmapService.get_roadmap_by_id(db, roadmap_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap(roadmap_data: RoadmapCreate, user_id: str, db: AsyncSession = Depends(get_db)):
    return await RoadmapService.generate_roadmap(db, user_id, roadmap_data)

@router.post("/{roadmap_id}/steps/{step_id}/complete")
async def complete_step(roadmap_id: str, step_id: str, db: AsyncSession = Depends(get_db)):
    # TODO: Implementar lógica para marcar paso como completado
    return {"message": "Step completed"}
