from typing import Optional
from pydantic import BaseModel, ConfigDict

class StatsResponse(BaseModel):
    total_members: Optional[int] = None
    active_today: Optional[int] = None
    revenue_this_month: Optional[float] = None
    classes_today: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

class StatsCreate(BaseModel):
    model_config = {"from_attributes": True}
    # Stats are typically read-only aggregates, but schema structure required
    pass

class StatsUpdate(BaseModel):
    model_config = {"from_attributes": True}
    pass