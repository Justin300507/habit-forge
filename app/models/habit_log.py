from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class HabitLog(Base):
    __tablename__ = "habit_logs"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"), nullable=False)
    completed_at = Column(DateTime, server_default=func.now(), nullable=False)

    @property
    def habit(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None or self.habit_id is None:
            return None
        from app.models.habit import Habit
        return _sess.query(Habit).get(self.habit_id)
