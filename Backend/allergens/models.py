from django.db import models
from django.contrib.auth.models import User

class UserAllergen(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    allergens = models.JSONField(default=list)  # ["Milk", "Peanut"]

    def __str__(self):
        return self.user.username
