from celery import Celery

from ..settings import settings

celery_app = Celery('my_app',
    broker=settings.REDISS_URL,
    backend=settings.REDISS_URL,
    include=['app.utils.genaric', 'app.utils.mail.mail']
    )

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

celery_app.conf.broker_transport_options = {'visibility_timeout': 3600}

celery_app.conf.result_backend_transport_options = {
    'retry_policy': {
       'timeout': 5.0
    }
}