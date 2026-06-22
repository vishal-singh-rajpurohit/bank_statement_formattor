import resend
import base64
from typing import Dict

from ...settings import settings
from .templates import success_template, fail_template, otp_template, message_recived_template


resend.api_key = settings.RESENDER_API_KEY

ADMIN_EMAIL = settings.ADMIN_MAIL_ADDRESS

def genrate_otp() -> str:
    pass

def encode_file(file_path: str):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

async def send_mail(to:str, sub: str, username: str, bank_name: str, xml_path: str, file_name: str) -> Dict:

    xml_file = encode_file(xml_path)

    params: resend.Emails.SendParams = {
        "from": settings.RESENDER_DOMAIN,
        "to": [f'{to}'],
        "subject": f'{sub}',
        "html":  success_template(username, bank_name, file_name) ,
        "attachments": [
            {
                "filename": f"{file_name}.xml",
                "content": xml_file
            },
        ]
    }
    email: resend.Email = resend.Emails.send(params)

    return email


async def send_mail_error(to:str, sub: str, bank_name: str,  file_name: str) -> Dict:


    params: resend.Emails.SendParams = {
        "from": settings.RESENDER_DOMAIN,
        "to": [f'{to}'],
        "subject": f'{sub}',
        "html":  fail_template(file_name, bank_name),
    }

    email: resend.Email = resend.Emails.send(params)

    return email


async def send_opt_mail(to: str, otp: str):

    params: resend.Emails.SendParams = {
        "from": settings.RESENDER_DOMAIN,
        "to": [f'{to}'],
        "subject": "Verify Your Email Account",
        "html":  otp_template(otp),
    }
    email: resend.Email = resend.Emails.send(params)

    return email

async def send_new_message_mail(user:str, email: str, mobile: str, message: str):
    params: resend.Emails.SendParams = {
        "from": settings.RESENDER_DOMAIN,
        "to": [f'{ADMIN_EMAIL}'],
        "subject": "Verify Your Email Account",
        "html":  message_recived_template(user, email, mobile, message),
    }
    email: resend.Email = resend.Emails.send(params)

    return email