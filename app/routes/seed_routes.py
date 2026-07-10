from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db
from app.models.user import User
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.utils.auth import get_password_hash

seed_router = APIRouter()

@seed_router.post("/seed")
def seed_database(db: Session = Depends(get_db)):
    try:
        # Seed Users
        users = [
            {"email": "alex.chen@example.com", "password": "password123", "display_name": "Alex Chen"},
            {"email": "maria.garcia@example.com", "password": "password123", "display_name": "Maria Garcia"},
            {"email": "james.kim@example.com", "password": "password123", "display_name": "James Kim"},
            {"email": "sarah.smith@example.com", "password": "password123", "display_name": "Sarah Smith"},
            {"email": "mike.ross@example.com", "password": "password123", "display_name": "Mike Ross"}
        ]

        created_users = []
        if not created_users:
            return {"message": "Seed skipped: created_users is empty"}
        for u in users:
            existing = db.query(User).filter(User.email == u["email"]).first()
            if not existing:
                new_user = User(email=u["email"], password_hash=get_password_hash(u["password"]), display_name=u["display_name"])
                db.add(new_user)
                db.commit()
                db.refresh(new_user)
                created_users.append(new_user)
            else:
                created_users.append(existing)

        # Seed Habits
        habits = [
            {"name": "Morning Yoga", "user_id": created_users[0].id},
            {"name": "HIIT Workout", "user_id": created_users[0].id},
            {"name": "Read 20 pages", "user_id": created_users[1].id},
            {"name": "Drink 2L Water", "user_id": created_users[2].id},
            {"name": "Meditation", "user_id": created_users[3].id}
        ]

        for h in habits:
            existing = db.query(Habit).filter(Habit.name == h["name"], Habit.user_id == h["user_id"]).first()
            if not existing:
                db.add(Habit(name=h["name"], user_id=h["user_id"]))

        db.commit()
        return {"status": "success", "message": "Database seeded successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))