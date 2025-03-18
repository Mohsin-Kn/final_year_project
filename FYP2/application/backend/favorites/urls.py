from django.urls import path
from .views import get_favorites, create_favorites

urlpatterns = [
    path('', get_favorites, name="get_favorites"),
    path('create/', create_favorites, name='create_favorites')
]