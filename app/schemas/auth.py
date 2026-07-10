from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class AuthResponse(BaseModel):
    id: int
    email: Optional[str] = None
    display_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class RegisterRequest(BaseModel):
    model_config = {"from_attributes": True}
    email: str = Field(min_length=1)
    password: str = Field(min_length=1)
    display_name: str = Field(min_length=1)

class LoginRequest(BaseModel):
    model_config = {"from_attributes": True}
    email: str = Field(min_length=1)
    password: str = Field(min_length=1)

class Token(BaseModel):
    model_config = {"from_attributes": True}
    access_token: str
    token_type: str
    user_id: int
    email: str
    display_name: str

class AuthCreate(BaseModel):
    model_config = {"from_attributes": True}
    email: str = Field(min_length=1)
    password: str = Field(min_length=1)
    display_name: str = Field(min_length=1)

class AuthUpdate(BaseModel):
    model_config = {"from_attributes": True}
    email: Optional[str] = None
    display_name: Optional[str] = None