import resend
import random
import base64
from typing import Dict
from dotenv import load_dotenv
import os

from .templates import success_template, fail_template, otp_template

load_dotenv()

resend.api_key = os.getenv("RESENDER_API_KEY")

def genrate_otp() -> str:
    pass

def encode_file(file_path: str):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

async def send_mail(is_success: bool, to:str, sub: str, username: str, bank_name: str, xml_path: str, file_name: str, otp: str = "00000", token: str = 'no') -> Dict:

    xml_file = encode_file(xml_path)

    params: resend.Emails.SendParams = {
        "from": "onboarding@resend.dev",
        "to": [f'{to}'],
        "subject": f'{sub}',
        "html":  success_template(username, bank_name, file_name) if is_success else fail_template(file_name, bank_name),
        "attachments": [
            {
                "filename": f"{file_name}.xml",
                "content": xml_file
            },
        ]
    }
    email: resend.Email = resend.Emails.send(params)

    return email


async def send_opt_mail(to: str, otp: str):

    params: resend.Emails.SendParams = {
        "from": "onboarding@resend.dev",
        "to": [f'{to}'],
        "subject": "Verify Your Email Account",
        "html":  otp_template(otp),
    }
    email: resend.Email = resend.Emails.send(params)

    return email