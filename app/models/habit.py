from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Habit(Base):
    __tablename__ = "habits"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    name = Column(String, nullable=True)
    current_streak = Column(Integer, default=0, nullable=False)
    longest_streak = Column(Integer, default=0, nullable=False)

    @property
    def logs(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None:
            return []
        from app.models.habit_log import HabitLog
        return _sess.query(HabitLog).filter(HabitLog.habit_id == self.id).all()

    @property
    def user(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None or self.user_id is None:
            return None
        from app.models.user import User
        return _sess.query(User).get(self.user_id)
