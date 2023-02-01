from django.urls import path,include
from .views import *

urlpatterns = [
    path("register_time",register_time,name="register_time"),
    path("view_time_reviewer/<int:id>",view_time_reviewer,name="view_time_reviewer")
]