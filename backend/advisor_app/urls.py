from django.urls import path,include
from advisor_app.views import *

urlpatterns = [
    path("view_reviewer/<str:domain>",view_reviewer,name="view_reviewer"),
    path("book_time/<int:uid>/<str:time>",book_time,name="book_time"),
]