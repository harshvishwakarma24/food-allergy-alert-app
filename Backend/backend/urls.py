from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/allergens/', include('allergens.urls')),
    path('api/history/', include('history.urls')),
]




