from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "user"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    preferred_theme = Column(String, nullable=True, default="light")

    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    @property
    def badges(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None:
            return []
        from app.models.badge import Badge
        return _sess.query(Badge).filter(Badge.user_id == self.id).all()

    @property
    def habits(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None:
            return []
        from app.models.habit import Habit
        return _sess.query(Habit).filter(Habit.user_id == self.id).all()

    # Relationships
    # Note: Related models (Habit, HabitLog, Badge) are imported in main.py
    # to ensure they are registered with Base.metadata.