from django.urls import path,include
from .views import *

urlpatterns = [
    path('register_batch/',register_batch,name="register_batch"),
    path('register_domain/',register_domain,name="register_domain"),
    path('view_chat/<int:id>',view_chat,name='view_chat'),
    path('create_or_find_room/<int:id1>/<int:id2>',create_or_find_room,name='create_or_find_room'),
    path('view_all_messages/<int:id>',view_all_messages,name='view_all_messages'),
    path('create_group/',create_group,name="create_group"),
    path('my_groups/<int:id>',my_groups,name='my_groups'),
    path('view_all_messages_of_group/<int:id>',view_all_messages_of_group,name='view_all_messages_of_group'),
    path('view_group/<int:id>',view_group,name='view_group'),
    path('AddMembersToChatGroupView/<int:id>',AddMembersToChatGroupView,name='AddMembersToChatGroupView'),
    path('view_batch',view_batch,name='view_batch'),
    path('view_domain',view_domain,name='view_domain'),
    path('admin_register',admin_register,name="admin_register"),
    path('add_week',add_week,name='add_week'),
    path('edit_week/<int:id>',edit_week,name='edit_week'),
    path('view_advisor',view_advisor,name='view_advisor'),
    path('view_reviewer',view_reviewer,name='view_reviewer'),
    path('advisor_delete/<int:id>',advisor_delete,name='advisor_delete'),
    path('reviewer_delete/<int:id>',reviewer_delete,name='reviewer_delete'),
    path('batch_delete/<int:id>',batch_delete,name='batch_delete'),
    path('domain_delete/<int:id>',domain_delete,name='domain_delete'),
    path('view_all_batch',view_all_batch,name='view_all_batch'),
]