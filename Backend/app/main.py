from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .db.session import Base, engine
from .routers.auth import auth_router
from .routers.actions import actions_router
from .routers.contact import contact_router
from .routers.pay import pay_route

from .models.operations import Operation
from .models.user import User
from .models.otps import Otps
from .models.purchase import Purchase
from .models.contact import Contact
from .models.payment import Order, Payment

load_dotenv()

origins = [
    os.getenv("CORS_ORIGIN"),
    os.getenv("CORS_ORIGIN_"),
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router, prefix='/api/v1', tags=["Auth"])
app.include_router(actions_router, prefix='/api/v1', tags=["Actions"])
app.include_router(contact_router, prefix='/api/v1', tags=["Contact"])
app.include_router(pay_route, prefix='/api/v1', tags=["Payments"])

@app.get('/')
def root():
    return {
        'message': 'it works!! 👍👍👍👍'
    }

