from django.urls import path
from .views import get_institutes, create_institute

urlpatterns = [
    path('', get_institutes, name="get_institutes"),
    path('create/', create_institute, name='create_institute')
]