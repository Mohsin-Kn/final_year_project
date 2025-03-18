from django.urls import path
from .views import get_saves, create_saves

urlpatterns = [
    path('', get_saves, name="get_saves"),
    path('create/', create_saves, name='create_saves')
]