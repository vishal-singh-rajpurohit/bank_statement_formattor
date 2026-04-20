from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session
from ..middleware.auth_middleware import is_loggedin
from ..controllers.pay import create_payment_order
from ..schema.req import PayOrderPayload
from ..db.session import get_db



pay_route = APIRouter(prefix='pay', dependencies=[Depends(is_loggedin)])


@pay_route.post('/create-pay-order', status_code=status.HTTP_201_CREATED)
async def root(req: Request, payload: PayOrderPayload, db:Session = Depends(get_db)):
    return await create_payment_order(req, payload, db)
