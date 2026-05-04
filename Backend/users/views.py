from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from .models import Profile


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    print(serializer.errors)  #  ADD THIS
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {"error": "Username and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response(
            {
                "message": "Login successful",
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {"error": "Invalid credentials"},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
def user_profile(request, username):
    try:
        user = User.objects.get(username=username)
        profile, created = Profile.objects.get_or_create(user=user)

        return Response(
            {
                "username": user.username,
                "email": user.email,
                "age": profile.age,
            },
            status=status.HTTP_200_OK
        )
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['PUT'])
def update_user_profile(request, username):
    try:
        user = User.objects.get(username=username)
        profile, created = Profile.objects.get_or_create(user=user)

        new_username = request.data.get('username')
        new_age = request.data.get('age')

        if new_username:
            user.username = new_username
            user.save()

        # Safe age handling
        if new_age is not None:
            if new_age == "":
                profile.age = None
            else:
                profile.age = int(new_age)

            profile.save()

        return Response(
            {
                "message": "Profile updated successfully",
                "username": user.username,
                "email": user.email,
                "age": profile.age,
            },
            status=status.HTTP_200_OK
        )

    except Exception as e:
        print("UPDATE ERROR:", str(e))
        return Response(
            {"error": "Update failed"},
            status=status.HTTP_400_BAD_REQUEST
        )

