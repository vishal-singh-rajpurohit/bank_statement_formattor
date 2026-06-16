from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from ..settings import settings

DB_URI = settings.PGQL_URL


engine = create_engine(DB_URI)

LocalSession = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()