from django.shortcuts import render
from student_app.models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from student_app.serializers import *
from django.shortcuts import get_object_or_404

# Create your views here.
@api_view(['POST'])
def register_batch(request):
    if request.method == 'POST':
        serialzer = AdminBatchSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def admin_register(request):
    if request.method == 'POST':
        serialzer = AdminSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_domain(request):
    if request.method == 'POST':
        serialzer = DomainSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_chat(request,id):
    if request.method == 'GET':
        posts = User.objects.all().exclude(id=id)
        serialzer = ChatSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['GET'])
def create_or_find_room(request,id1,id2):
    id1=User.objects.get(id=id1)
    id2=User.objects.get(id=id2)
    if request.method == 'GET':
        try:
            posts = Room.objects.get(first_person=id1,second_person=id2)
        except:
            try:
                posts = Room.objects.get(first_person=id2,second_person=id1)
            except:
                posts = Room.objects.create(first_person=id1,second_person=id2)
                posts.save()
        serialzer = RoomSerializer(posts)
        return Response(serialzer.data)

@api_view(['GET'])
def view_all_messages(request,id):
    if request.method == 'GET':
        posts = Message.objects.filter(room=id)
        serialzer = MessageSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['POST'])
def create_group(request):
    if request.method == 'POST':
        print(request.data)
        serialzer = ChatGroupSerializer(data=request.data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        else:
            print(serialzer.errors)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def my_groups(request,id):
    if request.method == 'GET':
        user = User.objects.get(id=id)
        groups = ChatGroup.objects.filter(members=user)
        serialzer = ChatGroupSerializer(groups, many=True)
        print(serialzer.data)
        return Response(serialzer.data)

@api_view(['GET'])
def view_all_messages_of_group(request,id):
    if request.method == 'GET':
        posts = ChatMessage.objects.filter(room=id)
        serialzer = ChatMessageSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['GET'])
def view_group(request,id):
    if request.method == 'GET':
        posts = ChatGroup.objects.get(id=id)
        serialzer = ChatGroupSerializer(posts)
        return Response(serialzer.data)

@api_view(['PATCH'])
def AddMembersToChatGroupView(request, id):
    group_chat = get_object_or_404(ChatGroup, id=id)
    group_chat.members.set(request.data.get("members"))
    group_chat.save()
    return Response({"message": "Members added to group chat successfully."}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_batch(request):
    if request.method == 'GET':
        posts = Batch.objects.all().order_by('id')
        serialzer = BatchSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['GET'])
def view_domain(request):
    if request.method == 'GET':
        posts = Domain.objects.all().order_by('id')
        serialzer = DomainSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['POST'])
def add_week(request):
    print(request.data)
    if request.method == 'POST':
        data=request.data.copy()
        print(data['week'])
        try:
            a=int(data["techinical_score"])
        except:
            a=0
        try:
            b=int(data["extra_workouts_score"])
        except:
            b=0
        try:
            c=int(data["english_score"])
        except:
            c=0
        data["total_score"]=a+b+c
        serialzer = ManifestSerializer(data=data,partial=True)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data, status=status.HTTP_201_CREATED)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def edit_week(request,id):
    if request.method == 'PUT':
        data=request.data.copy()
        print(data['week'])
        try:
            a=int(data["techinical_score"])
        except:
            a=0
        try:
            b=int(data["extra_workouts_score"])
        except:
            b=0
        try:
            c=int(data["english_score"])
        except:
            c=0
        data["total_score"]=a+b+c
        posts = Manifest.objects.get(id=id)
        print(posts)
        serializer = ManifestSerializer(posts,data=data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_advisor(request):
    if request.method == 'GET':
        posts = User.objects.filter(is_advisor=True).order_by('id')
        serialzer = AdminSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['GET'])
def view_reviewer(request):
    if request.method == 'GET':
        posts = User.objects.filter(is_reviewer=True).order_by('id')
        serialzer = AdminSerializer(posts, many=True)
        return Response(serialzer.data)

@api_view(['DELETE'])
def advisor_delete(request,id):
    if request.method == 'DELETE':
        posts = User.objects.get(id=id)
        posts.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['DELETE'])
def reviewer_delete(request,id):
    if request.method == 'DELETE':
        posts = User.objects.get(id=id)
        posts.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['DELETE'])
def batch_delete(request,id):
    if request.method == 'DELETE':
        posts = Batch.objects.get(id=id)
        posts.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['DELETE'])
def domain_delete(request,id):
    if request.method == 'DELETE':
        posts = Domain.objects.get(id=id)
        posts.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_batch(request):
    if request.method == 'GET':
        posts = Batch.objects.all().order_by('id')
        serialzer = AdminBatchSerializer(posts, many=True)
        return Response(serialzer.data)
