from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class HabitLogResponse(BaseModel):
    id: int
    habit_id: Optional[int] = None
    completed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class HabitCreate(BaseModel):
    name: str = Field(min_length=1)

    model_config = ConfigDict(from_attributes=True)

class HabitUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)

    model_config = ConfigDict(from_attributes=True)

class HabitResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    name: Optional[str] = None
    current_streak: Optional[int] = None
    longest_streak: Optional[int] = None
    logs: List[HabitLogResponse] = []

    model_config = ConfigDict(from_attributes=True)

class HabitLogCreate(BaseModel):
    completed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)