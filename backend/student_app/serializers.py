from .models import User
from rest_framework import serializers
from .models import *


class ManifestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manifest
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    user_manifest = ManifestSerializer(many=True)
    class Meta:
        model = User
        fields = ['id','first_name','username','email','password','is_superuser','user_manifest','phone']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','password','domain','is_reviewer','is_advisor','phone']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class TimeAvailableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeAvailable
        fields = "__all__"

class ReviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','password','domain','is_reviewer','is_advisor']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class AdvisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','password','domain','is_reviewer','is_advisor']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
class BatchSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)
    class Meta:
        model = Batch
        fields = ["id","batch","user"]

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','photo','bio','phone']
        
class AdminBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = "__all__"

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','phone']

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"

class GroupUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','username','email','phone']

class ChatGroupSerializer(serializers.ModelSerializer):
    name=serializers.CharField()
    members =serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    creator=serializers.IntegerField()
    about=serializers.CharField()
    
    class Meta:
        model = ChatGroup
        fields = ['id', 'name', 'members','creator','about']

# class ChatGroupMemberSerializer(serializers.ModelSerializer):
#     members = serializers.ManyRelatedField(GroupUserSerializer(many=True))
#     class Meta:
#         model = ChatGroup
#         fields = ['id', 'name', 'members','creator','about']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"