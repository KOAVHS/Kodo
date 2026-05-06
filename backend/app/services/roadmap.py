import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from ..models.study import Roadmap, RoadmapStep
from ..schemas.schemas import RoadmapCreate, RoadmapResponse

class RoadmapService:
    @staticmethod
    async def generate_roadmap(db: AsyncSession, user_id: str, roadmap_data: RoadmapCreate) -> RoadmapResponse:
        """Generar roadmap (con IA en versión completa)"""
        roadmap = Roadmap(
            id=str(uuid.uuid4()),
            user_id=user_id,
            title=f"Learn {roadmap_data.subject}",
            description=f"A {roadmap_data.level} level roadmap for {roadmap_data.subject}",
            subject=roadmap_data.subject,
            level=roadmap_data.level,
            duration=roadmap_data.duration,
        )
        
        # Crear pasos predefinidos (en versión completa, serían generados por IA)
        steps = [
            RoadmapStep(
                id=str(uuid.uuid4()),
                roadmap_id=roadmap.id,
                order=1,
                title="Fundamentals",
                description=f"Learn the basics of {roadmap_data.subject}",
                completed=False,
            ),
            RoadmapStep(
                id=str(uuid.uuid4()),
                roadmap_id=roadmap.id,
                order=2,
                title="Practice",
                description=f"Practice exercises for {roadmap_data.subject}",
                completed=False,
            ),
            RoadmapStep(
                id=str(uuid.uuid4()),
                roadmap_id=roadmap.id,
                order=3,
                title="Projects",
                description=f"Real-world projects using {roadmap_data.subject}",
                completed=False,
            ),
        ]
        
        roadmap.steps = steps
        db.add(roadmap)
        await db.commit()
        await db.refresh(roadmap)
        
        return RoadmapResponse.from_orm(roadmap)

    @staticmethod
    async def get_user_roadmaps(db: AsyncSession, user_id: str) -> list:
        stmt = select(Roadmap).where(Roadmap.user_id == user_id)
        result = await db.execute(stmt)
        roadmaps = result.scalars().all()
        return [RoadmapResponse.from_orm(r) for r in roadmaps]

    @staticmethod
    async def get_roadmap_by_id(db: AsyncSession, roadmap_id: str) -> RoadmapResponse:
        stmt = select(Roadmap).where(Roadmap.id == roadmap_id)
        result = await db.execute(stmt)
        roadmap = result.scalar_one_or_none()
        if not roadmap:
            raise ValueError("Roadmap not found")
        return RoadmapResponse.from_orm(roadmap)
