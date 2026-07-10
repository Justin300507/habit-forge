from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Badge(Base):
    __tablename__ = "badges"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    name = Column(String, nullable=False)
    earned_at = Column(DateTime, server_default=func.now(), nullable=False)

    @property
    def user(self):
        from sqlalchemy import inspect as _sa_inspect
        _sess = _sa_inspect(self).session
        if _sess is None or self.user_id is None:
            return None
        from app.models.user import User
        return _sess.query(User).get(self.user_id)
