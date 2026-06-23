from .formattors.au_bank import wrapper_convertor
from .formattors.kotak import katak_mahindra_formattor
from .mail.mail import send_mail
from ..tasks.celery import celery_app

# genaric.py
@celery_app.task
def task_wrapper(data):
    print('task wrapper')
    if data['bank'] == "AU":
        # Should run first
        wrapper_convertor(
            file_name=data['file_path'],
            excel_path=data['xlsx_path'],
            party_ledger_name=data['file_name']
        )
        # After this so the files are avilable at the time of upload
        send_mail(
            to=data['db_user_email'],
            sub="Your File is Ready",
            username=data['db_user_name'],
            bank_name=data['bank'],
            xml_path=data['xml_path'],
            file_name=data['file_name']
        )
    elif data['bank'] == "KOTAK":
        # Should run first
        katak_mahindra_formattor(
            path=data['file_path'],
            ledger_name=data['file_name'],
            output_path=data['xml_path']
        )
        # After this
        send_mail(
            to=data['db_user_email'],
            sub="Your File is Ready",
            username=data['db_user_name'],
            bank_name=data['bank'],
            xml_path=data['xml_path'],
            file_name=data['file_name']
        )

    