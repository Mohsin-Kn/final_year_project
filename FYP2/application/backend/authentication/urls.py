from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register_user, user_view, custom_token_obtain_pair, logout_view

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', custom_token_obtain_pair, name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', user_view, name='user'),
    path('logout/', logout_view, name='logout'),
]
