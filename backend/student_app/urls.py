from django.urls import path,include
from student_app.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('user_register',user_register,name='user_register'),
    path('view_manifest/<int:id>',view_manifest,name='view_manifest'),
    path('validate',validate,name='validate'),
    path('update_profile/<int:id>',update_profile, name='update_profile'),
    path('view_profile/<int:id>',view_profile, name='view_profile'),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('otplogin',otplogin,name='otplogin'),
    # path('otp_verify',otp_verify,name='otp_verify'),
]