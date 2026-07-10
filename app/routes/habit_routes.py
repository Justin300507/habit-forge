from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.schemas.habit import HabitCreate, HabitResponse, HabitLogResponse
from app.utils.auth import get_current_user
from app.schemas.habit import HabitLogResponse

habit_router = APIRouter()

@habit_router.get("/habits", response_model=List[HabitResponse])
def list_habits(
    search: Optional[str] = None,
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Habit).filter(Habit.user_id == current_user.id)
    if search:
        query = query.filter(Habit.name.ilike(f"%{search}%"))
    return query.offset(offset).limit(limit).all()

@habit_router.get("/habits/{habit_id}", response_model=HabitResponse)
def get_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Not found")
    return habit

@habit_router.post("/habits", response_model=HabitResponse, status_code=status.HTTP_201_CREATED)
def create_habit(
    habit_in: HabitCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    new_habit = Habit(name=habit_in.name, user_id=current_user.id)
    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)
    return new_habit

@habit_router.put("/habits/{habit_id}", response_model=HabitResponse)
def update_habit(
    habit_in: HabitCreate,
    habit_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Not found")
    habit.name = habit_in.name
    db.commit()
    db.refresh(habit)
    return habit

@habit_router.delete("/habits/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(habit)
    db.commit()
    return None

@habit_router.post("/habits/{habit_id}/logs", response_model=HabitLogResponse, status_code=status.HTTP_201_CREATED)
def create_habit_log(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Not found")
    log = HabitLog(habit_id=habit_id)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

@habit_router.get("/habits/{habit_id}/logs", response_model=List[HabitLogResponse])
def list_habit_logs(
    habit_id: int,
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Not found")
    return db.query(HabitLog).filter(HabitLog.habit_id == habit_id).offset(offset).limit(limit).all()