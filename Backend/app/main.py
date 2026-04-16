from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .db.session import Base, engine
from .routers.auth import auth_router
from .models.operations import Operation
from app.models.user import User
import os

load_dotenv()

origins = [os.getenv("CORS_ORIGIN)")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix='/api/v1', tags=["Auth"])

@app.get('/')
def root():
    return {
        'message': 'hii'
    }

