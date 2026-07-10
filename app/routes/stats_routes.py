from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, date
from app.database import get_db
from app.models.user import User

# Note: We import models inside the function or use string references to avoid circular imports
# but for stats we need access to the tables to perform counts.
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.schemas.stats import StatsResponse

stats_router = APIRouter()

@stats_router.get("/stats/summary", response_model=StatsResponse)
def get_stats_summary(db: Session = Depends(get_db)):
    """
    Returns aggregate performance metrics for the dashboard.
    Metrics include total users, habits tracked today, total habit completions, and active users.
    """
    # 1. Total Members (Users)
    total_members = db.query(User).count()

    # 2. Active Today (Users who have logged at least one habit today)
    today_start = datetime.combine(date.today(), datetime.min.time())
    active_today = db.query(Habit.user_id).join(HabitLog).filter(
        HabitLog.completed_at >= today_start
    ).distinct().count()

    # 3. Total Habit Completions (Used as a proxy for 'revenue' or 'value' in this domain)
    # Since the schema requested revenue_this_month as a float, we will calculate
    # total completions this month as a metric.
    completions_this_month = db.query(HabitLog).filter(
        HabitLog.completed_at >= today_start.replace(day=1)
    ).count()

    # 4. Habits Scheduled/Tracked Today
    # In a real app, this might check a schedule. Here we count unique habits logged today.
    habits_logged_today = db.query(HabitLog).filter(
        HabitLog.completed_at >= today_start
    ).count()

    # Mapping to the requested StatsResponse schema fields:
    # total_members: int
    # active_today: int
    # revenue_this_month: float (using completions as a metric)
    # classes_today: int (using habits logged today)

    return {
        "total_members": total_members,
        "active_today": active_today,
        "revenue_this_month": float(completions_this_month),
        "classes_today": habits_logged_today
    }