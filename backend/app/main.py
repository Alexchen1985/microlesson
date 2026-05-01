"""
微课工场 - FastAPI 后端
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api import auth, courses, videos
from app.core.config import settings
from app.core.database import engine
from app.models.models import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="微课工场 API",
    description="面向高校教师的专业微课视频制作平台",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["认证"])
app.include_router(courses.router, prefix="/api/courses", tags=["课程"])
app.include_router(videos.router, prefix="/api/videos", tags=["视频"])


@app.get("/api/health")
async def health():
    return {"status": "ok"}