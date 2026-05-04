from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserAllergen

@receiver(post_save, sender=User)
def create_user_allergens(sender, instance, created, **kwargs):
    if created:
        UserAllergen.objects.create(user=instance)
