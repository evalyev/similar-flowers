from fastapi import APIRouter

from app.api import similar_photos, frontend

api_router = APIRouter()

api_router.include_router(similar_photos.router, tags=["similar-photos"])

api_router.include_router(frontend.router, tags=["/"])
