from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class SeedCreate(BaseModel):
    model_config = {"from_attributes": True}
    action: str = Field(min_length=1)
    force_reset: bool = False

class SeedUpdate(BaseModel):
    model_config = {"from_attributes": True}
    action: Optional[str] = None

class SeedResponse(BaseModel):
    id: int
    status: Optional[str] = None
    message: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

