from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base

# Import all models to ensure Base.metadata registers them for FK resolution
from app.models.habit import *  # noqa: F401
from app.models.habit_log import *  # noqa: F401
from app.models.user import *  # noqa: F401
from app.models.badge import *  # noqa: F401

# Import all routers
from app.routes.habit_routes import habit_router
from app.routes.stats_routes import stats_router
from app.routes.auth_routes import auth_router
from app.routes.seed_routes import seed_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (required for frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint (required for deployment health checks)
@app.get("/health")
def health():
    return {"status": "ok"}

# Register routers
app.include_router(habit_router)
app.include_router(stats_router)
app.include_router(auth_router)
app.include_router(seed_router)