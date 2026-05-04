from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class ScanHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=50)
    result = models.CharField(max_length=100)
    scanned_at = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return f"{self.product_name} - {self.user.username}"
