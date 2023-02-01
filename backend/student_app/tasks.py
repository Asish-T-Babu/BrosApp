from  __future__ import absolute_import,unicode_literals
from celery import shared_task
from django.core.mail import EmailMessage
import uuid

def send_email(email,username):
    subject = "Email verification"
    myuuid = uuid.uuid4()
    message = "http://localhost:3000/verify/"+str(myuuid)+"/"+username
    email_from = "asishtbabuf1@gmail.com"
    recipeint = [email]
    email = EmailMessage(subject=subject,body=message,to=recipeint)
    email.send()   




@shared_task(name='celeryusing')
def celeryusing(email,username):
    return send_email(email,username)