"""
课程API
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.models import User, Course
from app.schemas.schemas import CourseCreate, CourseResponse
from app.api.auth import get_current_user


router = APIRouter()


@router.get("", response_model=List[CourseResponse])
def list_courses(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Course).filter(Course.user_id == current_user.id).all()


@router.post("", response_model=CourseResponse)
def create_course(data: CourseCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = Course(user_id=current_user.id, title=data.title, description=data.description)
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id, Course.user_id == current_user.id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    return course


@router.delete("/{course_id}")
def delete_course(course_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id, Course.user_id == current_user.id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    db.delete(course)
    db.commit()
    return {"message": "已删除"}