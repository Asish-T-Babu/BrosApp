# from django.urls import path
# from . import views

# urlpatterns = [
#     path('api/messages/<str:room_name>/', views.messages_view, name='messages'),
# ]



import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path
from student_app.consumers import *
from student_app.consumer import *


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
application=get_asgi_application()


application = ProtocolTypeRouter({
    "http": get_asgi_application(),

    # WebSocket chat handler
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
               path('ws/chat/<str:room_name>/<int:user_id>/', ChatConsumer.as_asgi()),
               path('ws/groupchat/<str:room_name>/<int:user_id>/', GroupChatConsumer.as_asgi()),
            ])
        )
    ),
})