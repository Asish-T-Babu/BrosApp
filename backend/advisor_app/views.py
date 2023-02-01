from django.shortcuts import render
from student_app.models import *
from student_app.serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from datetime import date

# Create your views here.
@api_view(['GET'])
def view_reviewer(request,domain):
    if request.method == 'GET':
        posts = User.objects.filter(domain=domain)
        print(posts)
        serialzer = AdvisorSerializer(posts,many=True)
        return Response(serialzer.data)

@api_view(['PUT'])
def book_time(request,uid,time):
    if request.method == 'PUT':
        posts = TimeAvailable.objects.get(user=uid,time=time,date=date.today())
        print(posts)
        serializer = TimeAvailableSerializer(posts,data=request.data,partial=True)
        # print(serializer.is_valid())
        # print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)