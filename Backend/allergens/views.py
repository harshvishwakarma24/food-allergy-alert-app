from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserAllergen


@api_view(['GET'])
def get_allergens(request, username):
    try:
        user = User.objects.get(username=username)
        #  AUTO-CREATE if missing
        record, created = UserAllergen.objects.get_or_create(user=user)

        return Response(
            {"allergens": record.allergens},
            status=status.HTTP_200_OK
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
def save_allergens(request):
    try:
        username = request.data.get("username")
        allergens = request.data.get("allergens")

        if not isinstance(allergens, list):
            return Response(
                {"error": "Allergens must be a list"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.get(username=username)
        # AUTO-CREATE if missing
        record, created = UserAllergen.objects.get_or_create(user=user)
        record.allergens = allergens
        record.save()

        return Response(
            {"message": "Allergens saved successfully"},
            status=status.HTTP_200_OK
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
