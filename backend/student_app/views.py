from django.shortcuts import render,redirect
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from student_app.tasks import celeryusing
import random
from twilio.rest import Client
# Create your views here.

@api_view(['POST'])
def user_register(request):
    if request.method == 'POST':
        data=request.data
        serialzer = UserSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            print("hiii",data['username'],"&",data['email'])
            celeryusing.delay(data['email'],data['username'])
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST']) 
def validate(request):
    token = request.data['id']
    username = request.data['username']
    if token is not None:
        ts = User.objects.get(username = username)
        ts.is_verfied = True
        ts.save()
        return Response(200) 
    else:
        return Response( status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_profile(request,id):
    print('io')
    if request.method == 'PUT':
        asish=User.objects.get(id=id)
        print(request.data)
        serialzer = ProfileSerializer(asish,data=request.data,partial=True)
        print('yadhu',serialzer.is_valid())
        print('err',serialzer.errors)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_profile(request,id):
    if request.method == 'GET':
        posts = User.objects.get(id=id)
        serialzer = ProfileSerializer(posts)
        return Response(serialzer.data)

@api_view(['GET'])
def view_manifest(request,id):
    if request.method == 'GET':
        posts = User.objects.get(id=id)
        serialzer = UserSerializer(posts)
        return Response(serialzer.data)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("HFD",token)
        # Add custom claims
        token['name'] = user.first_name
        token['is_superuser'] = user.is_superuser
        token['is_reviewer'] = user.is_reviewer
        token['is_advisor'] = user.is_advisor
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def otplogin(request):
    if request.method == 'POST':
        phone = request.data["phone"]
        request.session['phone'] = phone

        if User.objects.filter(phone=phone).exists():
            # totp= pyotp.TOTP('base32secret3232').now()
            request.session['phone_no'] = phone

            client = Client("ACea1db142f98a1e87384255b29ee82e18","0531e2c850036c5bef623ac0d3b121b5")
            verification = client.verify \
                .services("VA024fef6e8c95886f041a91ff57ee61ef") \
                .verifications \
                .create(to='+91'+phone, channel='sms')
            return Response("OTP sended successfully") 

        else:
            return Response("user not registered")






# def otp_send(request):
#     phone=request.data["phone"]
#     try:
#         phone_number=User.objects.get(phone=phone)
#     except:
#         return Response("user not registered")   
#     if phone_number:
    

#         # account_sid = os.environ['ACCOUNT_SID']
#         # auth_token = os.environ['AUTH_TOKEN']
#         client = Client('AC8e0362d370ccfbd9eb24836063046750','f6910d11a24e02723cc95bca340e940a')
#         otp=random.randint(1, 10000)
#         for i in phone_number:
#             i.otp=otp
#             i.save() 
        
#         message = client.messages .create(
#                             body="Your otp code is"+str(otp),
#                             from_='+16506634151',
#                             to='+91'+phone
#                         )

#         print(message.sid)
#         return Response("OTP sended successfully")  


@api_view(['POST'])
def otp_verify(request):
    otp=request.data['otp'] 
    print("otpp",otp)
    phone_no=request.session.get('phone_no')
    client = Client('ACea1db142f98a1e87384255b29ee82e18','0531e2c850036c5bef623ac0d3b121b5')
    verification_check = client.verify \
        .services("VA024fef6e8c95886f041a91ff57ee61ef") \
        .verification_checks \
        .create(to='+91'+phone_no, code=otp)
    if verification_check.status == "approved":
        user_phone= request.session.get('phone')
        print("user_phone",user_phone)
        user=User.objects.get(phone=user_phone)
        jwt=MyTokenObtainPairSerializer(TokenObtainPairSerializer)
        return redirect(jwt.get_token,user)
        # return Response("user_phone")