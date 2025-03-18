from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/institutes/', include('institutes.urls')),
    path('api/courses/', include('courses.urls')),
    path('api/resources/', include('resources.urls')),
    path('api/saves/', include('saves.urls')),
    path('api/favorites/', include('favorites.urls')),
]
