from django.urls import path
from .views import (
    register_user,
    login_user,
    user_profile,
    update_user_profile
)

urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('profile/<str:username>/', user_profile),
    path('profile/update/<str:username>/', update_user_profile),
]
