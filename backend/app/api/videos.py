"""
视频API
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import os
import aiofiles

from app.core.database import get_db
from app.models.models import User, Course, Video, Member, VideoStatus
from app.api.auth import get_current_user


router = APIRouter()
upload_dir = "./uploads"


@router.post("/upload")
async def upload_video(
    course_id: int,
    title: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id, Course.user_id == current_user.id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    
    member = db.query(Member).filter(Member.user_id == current_user.id).first()
    if member and member.video_remaining <= 0:
        raise HTTPException(status_code=403, detail="已超过制作节数限制")
    
    os.makedirs(f"{upload_dir}/{course_id}", exist_ok=True)
    file_path = f"{upload_dir}/{course_id}/{file.filename}"
    
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(await file.read())
    
    video = Video(course_id=course_id, title=title, original_url=file_path, status=VideoStatus.UPLOADED)
    db.add(video)
    course.video_count += 1
    if member:
        member.video_remaining -= 1
    db.commit()
    db.refresh(video)
    
    return {"message": "上传成功", "video_id": video.id}


@router.get("/{video_id}")
def get_video(video_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    video = db.query(Video).join(Course).filter(Video.id == video_id, Course.user_id == current_user.id).first()
    if not video:
        raise HTTPException(status_code=404, detail="视频不存在")
    return video


@router.post("/{video_id}/transcribe")
def transcribe_video(video_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    video = db.query(Video).join(Course).filter(Video.id == video_id, Course.user_id == current_user.id).first()
    if not video:
        raise HTTPException(status_code=404, detail="视频不存在")
    video.status = VideoStatus.PROCESSING
    db.commit()
    return {"message": "字幕识别任务已提交"}


@router.post("/{video_id}/apply-template")
def apply_template(video_id: int, template_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    video = db.query(Video).join(Course).filter(Video.id == video_id, Course.user_id == current_user.id).first()
    if not video:
        raise HTTPException(status_code=404, detail="视频不存在")
    video.template_id = template_id
    video.status = VideoStatus.PROCESSED
    db.commit()
    return {"message": "模板已套用"}


@router.post("/{video_id}/export")
def export_video(video_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    video = db.query(Video).join(Course).filter(Video.id == video_id, Course.user_id == current_user.id).first()
    if not video:
        raise HTTPException(status_code=404, detail="视频不存在")
    video.status = VideoStatus.EXPORTING
    db.commit()
    return {"message": "导出任务已提交"}