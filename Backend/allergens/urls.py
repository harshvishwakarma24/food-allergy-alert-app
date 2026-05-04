from django.urls import path
from .views import save_allergens, get_allergens

urlpatterns = [
    path('save/', save_allergens),
    path('<str:username>/', get_allergens),
]
