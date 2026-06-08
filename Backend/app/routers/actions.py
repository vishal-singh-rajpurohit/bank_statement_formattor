from fastapi import APIRouter, Depends, UploadFile, Request, Response, status
from sqlalchemy.orm import Session
from ..middleware.auth_middleware import is_loggedin
from ..controllers.actions import upload_pdf, initiate_action, complete_action
from ..schema.req import ActionPayload
from ..db.session import get_db


actions_router = APIRouter(prefix='/actions', dependencies=[Depends(is_loggedin)])

@actions_router.post('/upload', status_code=status.HTTP_201_CREATED)
async def root(req: Request, resp: Response, file: UploadFile,  db: Session = Depends(get_db)):
    return await upload_pdf(req, resp, file,  db)

@actions_router.post('/upload-statement', status_code=status.HTTP_201_CREATED)
async def upload_statement(req: Request, resp: Response, file: UploadFile,  db: Session = Depends(get_db)):
    return await upload_pdf(req, resp, file,  db)

# @actions_router.post('/upload_statement', status_code=status.HTTP_201_CREATED)
# async def upload_statement_snake(req: Request, resp: Response, file: UploadFile,  db: Session = Depends(get_db)):
#     return await upload_pdf(req, resp, file,  db)

@actions_router.post('/feed-data', status_code=status.HTTP_201_CREATED)
async def root(req: Request, resp: Response, payload: ActionPayload, db: Session = Depends(get_db)):
    return await initiate_action(req, resp, payload, db)

@actions_router.post('/initiate-action', status_code=status.HTTP_201_CREATED)
async def initiate_statement_action(req: Request, resp: Response, payload: ActionPayload, db: Session = Depends(get_db)):
    return await initiate_action(req, resp, payload, db)

# @actions_router.post('/initiate_action', status_code=status.HTTP_201_CREATED)
# async def initiate_statement_action_snake(req: Request, resp: Response, payload: ActionPayload, db: Session = Depends(get_db)):
#     return await initiate_action(req, resp, payload, db)

@actions_router.get('/', status_code=status.HTTP_200_OK)
async def root(req: Request, resp: Response, db: Session = Depends(get_db)):
    return await complete_action(req, resp, db)

@actions_router.post('/complete-action', status_code=status.HTTP_200_OK)
async def complete_statement_action(req: Request, resp: Response, db: Session = Depends(get_db)):
    return await complete_action(req, resp, db)

# @actions_router.post('/complete_action', status_code=status.HTTP_200_OK)
# async def complete_statement_action_snake(req: Request, resp: Response, db: Session = Depends(get_db)):
#     return await complete_action(req, resp, db)

