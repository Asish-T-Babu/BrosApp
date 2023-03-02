from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
# Create your models here.

class Batch(models.Model):
    batch=models.CharField(max_length=10)
    batch_advisor=models.CharField(max_length=30,null=True)
    location=models.CharField(max_length=30,null=True)
    date=models.DateField(auto_now_add=True,null=True)

class Domain(models.Model):
    domain=models.CharField(max_length=10)

class MyAccountManager(BaseUserManager):
    def create_user(self,phone, first_name, username,password=None):
        if not username:
            raise ValueError('User must have an username')


        user = self.model(
            first_name=first_name,
            username=username,
            phone=phone
   
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username, password,first_name,phone):
        user = self.create_user(
            first_name=first_name,
            username=username,
            password = password,
            phone=phone
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    first_name = models.CharField(max_length=200,null=True)
    username = models.CharField(max_length=200,null=True,unique=True)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200,default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # a admin user; non super-user
    is_admin = models.BooleanField(default=False)
    is_reviewer = models.BooleanField(default=False)
    is_advisor = models.BooleanField(default=False)
    is_verfied=models.BooleanField(default=False)
    batch = models.ForeignKey(Batch,on_delete=models.CASCADE,null=True,related_name="user")
    domain = models.CharField(max_length=20,default=False)
    photo = models.FileField(upload_to='image',null=True)
    bio=models.CharField(max_length=100,null=True)
    phone=models.CharField(max_length=10,null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name','phone']
    objects = MyAccountManager()

class Manifest(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="user_manifest")
    week=models.CharField(max_length=10,null=True)
    status=models.CharField(max_length=10,null=True)
    project_updation=models.CharField(max_length=1000,null=True)
    next_week_task=models.CharField(max_length=1000,null=True)
    reviewer_name=models.CharField(max_length=50,null=True)
    advisor_name=models.CharField(max_length=50,null=True)
    techinical_score=models.CharField(max_length=50,null=True)
    extra_workouts_review=models.CharField(max_length=1000,null=True)
    extra_workouts_score=models.CharField(max_length=10,null=True)
    date=models.DateField(auto_now_add=True,null=True)
    english_review=models.CharField(max_length=1000,null=True)
    english_score=models.CharField(max_length=50,null=True)
    total_score=models.CharField(max_length=50,null=True)
    star_rating=models.CharField(max_length=10,null=True)


class TimeAvailable(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="reviewer_time")
    time=models.CharField(max_length=30)
    date=models.DateField(auto_now_add=True)
    book=models.BooleanField(default=False)
    whoBook=models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="advisor_time")

class Room(models.Model):
    first_person = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='thread_first_person')
    second_person = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True,related_name='thread_second_person')
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    room = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class ChatGroup(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(User)
    creator= models.IntegerField()
    about= models.CharField(max_length=255)
    photo = models.FileField(upload_to='frontend\src\static',null=True)

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sender_name =  models.CharField(max_length=255,null=True)