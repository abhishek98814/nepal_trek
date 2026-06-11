from django.db import models
from django.contrib.auth import get_user_model

from rest_framework import generics, permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        # 🔥 IMPORTANT: return real error instead of generic 400
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })



class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class AdminStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        from treks.models import Trek
        from tour.models import Tour
        from gear.models import Gear
        from booking.models import Booking, Payment
        from reviews.models import Review

        total_revenue = Payment.objects.filter(
            status='success'
        ).aggregate(
            total=models.Sum('amount')
        )['total'] or 0

        return Response({
            "users": {
                "total": User.objects.count(),
                "travellers": User.objects.filter(role='traveller').count(),
                "guides": User.objects.filter(role='guide').count(),
                "agencies": User.objects.filter(role='agency').count(),
                "sellers": User.objects.filter(role='seller').count(),
            },
            "treks": {
                "total": Trek.objects.count(),
                "active": Trek.objects.filter(status='active').count(),
                "draft": Trek.objects.filter(status='draft').count(),
            },
            "tours": {
                "total": Tour.objects.count(),
                "active": Tour.objects.filter(status='active').count(),
            },
            "gear": {
                "total": Gear.objects.count(),
                "active": Gear.objects.filter(status='active').count(),
            },
            "bookings": {
                "total": Booking.objects.count(),
                "pending": Booking.objects.filter(status='pending').count(),
                "confirmed": Booking.objects.filter(status='confirmed').count(),
                "cancelled": Booking.objects.filter(status='cancelled').count(),
                "completed": Booking.objects.filter(status='completed').count(),
            },
            "revenue": {
                "total": float(total_revenue),
            },
            "reviews": {
                "total": Review.objects.count(),
            },
        })



class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['username', 'email', 'phone']
    filterset_fields = ['role', 'is_verified']


class AdminUserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

