from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    APP_NAME: str = "Statement Formatter"

    CORS_ORIGIN: str
    CORS_ORIGIN_2: str
    CORS_ORIGIN_3: str
    CORS_ORIGIN_4: str

    PGQL_URL: str

    ACCESS_TOKEN_SECRET: str
    ACCESS_TOKEN_EXPIRY: int

    REFRESH_TOKEN_SECRET: str
    REFRESH_TOKEN_EXPIRY: int

    ALGO: str

    RESENDER_API_KEY: str
    RESENDER_DOMAIN: str

    SESSION_SECRET: str

    ADMIN_MAIL_ADDRESS: str

    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str
    RAZORPAY_WEBHOOK_SECRET: str

    REDISS_URL: str

@lru_cache
def get_settings():
    return Settings()


settings = get_settings()