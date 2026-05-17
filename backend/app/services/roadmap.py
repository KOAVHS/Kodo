import uuid
import anthropic
import json
from app.core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from ..models.study import Roadmap, RoadmapStep
from ..schemas.schemas import RoadmapCreate, RoadmapResponse

class RoadmapService:
    @staticmethod
    async def generate_roadmap(db: AsyncSession, user_id: str, roadmap_data: RoadmapCreate) -> RoadmapResponse:
        prompt = f"""Genera un roadmap de estudio para aprender {roadmap_data.subject} a nivel {roadmap_data.level} en {roadmap_data.duration} meses. Incluye pasos detallados y recursos recomendados.
           Responde SOLO en JSON con este formato:
             [
               {{"order": 1, "title": "Título del paso", "description": "Descripción"}},
               {{"order": 2, "title": "Título del paso", "description": "Descripción"}}
             ]
        Sin texto adicional, solo el JSON."""
        client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        messages = client.messages.create(
            model = settings.AI_MODEL,
            max_tokens= 1000,
            messages = [
                {"role": "user", "content": prompt},
            ]
        )
        response_text = messages.content[0].text
        steps_data = json.loads(response_text)
        roadmap = Roadmap(
            id=str(uuid.uuid4()),
            user_id=user_id,
            title=f"Learn {roadmap_data.subject}",
            description=f"A {roadmap_data.level} level roadmap for {roadmap_data.subject}",
            subject=roadmap_data.subject,
            level=roadmap_data.level,
            duration=roadmap_data.duration,
        )
        
       
        steps = [
            RoadmapStep(
                id=str(uuid.uuid4()),
                roadmap_id=roadmap.id,
                order=step["order"],
                title=step["title"],
                description=step["description"],
                completed=False,
            ) for step in steps_data
            
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
