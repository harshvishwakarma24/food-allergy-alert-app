from django.contrib import admin
from .models import ScanHistory


@admin.register(ScanHistory)
class ScanHistoryAdmin(admin.ModelAdmin):
    list_display = ("user", "product_name", "barcode", "result", "scanned_at")
    list_filter = ("result", "scanned_at")
    search_fields = ("product_name", "barcode", "user__username")
    ordering = ("-scanned_at",)

    # 👇 This makes scanned_at visible in edit page
    
