from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import ScanHistory
from django.utils import timezone
from datetime import timedelta


@api_view(['POST'])
def save_scan_history(request):
    try:
        username = request.data.get("username")
        product_name = request.data.get("product_name")
        barcode = request.data.get("barcode")
        result = request.data.get("result")

        if not all([username, product_name, barcode, result]):
            return Response(
                {"error": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.get(username=username)

        ScanHistory.objects.create(
            user=user,
            product_name=product_name,
            barcode=barcode,
            result=result
        )

        return Response(
            {"message": "Scan history saved"},
            status=status.HTTP_201_CREATED
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User does not exist"},
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        print("HISTORY SAVE ERROR:", e)
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def get_scan_history(request, username):
    try:
        user = User.objects.get(username=username)

        # 🔴 DELETE HISTORY OLDER THAN 10 DAYS
        ten_days_ago = timezone.now() - timedelta(days=10)
        ScanHistory.objects.filter(
            user=user,
            scanned_at__lt=ten_days_ago
        ).delete()

        # 🔵 FETCH UPDATED HISTORY
        history = ScanHistory.objects.filter(
            user=user
        ).order_by("-scanned_at")

        data = [
            {
                "product_name": h.product_name,
                "barcode": h.barcode,
                "result": h.result,
                "scanned_at": h.scanned_at,
            }
            for h in history
        ]

        return Response(data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    
@api_view(['DELETE'])
def clear_scan_history(request, username):
    try:
        user = User.objects.get(username=username)
        ScanHistory.objects.filter(user=user).delete()

        return Response(
            {"message": "Scan history cleared"},
            status=status.HTTP_200_OK
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

