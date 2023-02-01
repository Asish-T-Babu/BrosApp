from django.shortcuts import render
from student_app.models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from student_app.serializers import *
from datetime import date

# Create your views here.
@api_view(['POST'])
def register_time(request):
    if request.method == 'POST':
        serialzer = TimeAvailableSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_time_reviewer(request,id):
    if request.method == 'GET':
        print("ghfdgh",date.today())
        posts = TimeAvailable.objects.filter(user=id,date=date.today())
        serialzer = TimeAvailableSerializer(posts,many=True)
        return Response(serialzer.data)