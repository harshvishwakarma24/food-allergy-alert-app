from django.urls import path
from .views import save_scan_history, get_scan_history, clear_scan_history

urlpatterns = [
    path("save/", save_scan_history),
    path("<str:username>/", get_scan_history),
    path("clear/<str:username>/", clear_scan_history),

]
