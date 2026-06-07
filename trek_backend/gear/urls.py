from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Gear, GearCategory, GearImage, GearRentalAvailability, GearReview
from .serializers import (
    GearListSerializer, GearDetailSerializer, GearCreateUpdateSerializer,
    GearCategorySerializer, GearImageSerializer,
    GearRentalAvailabilitySerializer, GearReviewSerializer
)


class IsSellerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.seller == request.user or request.user.role == 'admin'


# --- Category Views ---
class GearCategoryListView(generics.ListCreateAPIView):
    queryset = GearCategory.objects.all()
    serializer_class = GearCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Gear Views ---
class GearListView(generics.ListAPIView):
    queryset = Gear.objects.filter(
        status='active', is_available=True
    ).select_related('category', 'seller').prefetch_related('images')
    serializer_class = GearListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['condition', 'listing_type', 'size',
                        'is_negotiable', 'is_featured', 'location']
    search_fields = ['title', 'description', 'brand', 'model_name', 'location']
    ordering_fields = ['sell_price', 'rent_price_per_day',
                       'average_rating', 'created_at', 'views_count']


class GearDetailView(generics.RetrieveAPIView):
    queryset = Gear.objects.filter(status='active')
    serializer_class = GearDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return serializer.data if hasattr(serializer, 'data') else super().retrieve(request, *args, **kwargs)


class GearCreateView(generics.CreateAPIView):
    serializer_class = GearCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]


class GearUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GearCreateUpdateSerializer
    permission_classes = [IsSellerOrAdmin]
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Gear.objects.all()
        return Gear.objects.filter(seller=user)


class MyGearListView(generics.ListAPIView):
    serializer_class = GearListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Gear.objects.filter(seller=self.request.user)


class FeaturedGearView(generics.ListAPIView):
    queryset = Gear.objects.filter(status='active', is_featured=True)
    serializer_class = GearListSerializer
    permission_classes = [permissions.AllowAny]


# --- Gear Image Views ---
class GearImageUploadView(generics.CreateAPIView):
    serializer_class = GearImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        gear = get_object_or_404(Gear, slug=self.kwargs['slug'])
        serializer.save(gear=gear)


# --- Rental Availability Views ---
class GearRentalAvailabilityView(generics.ListCreateAPIView):
    serializer_class = GearRentalAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        gear = get_object_or_404(Gear, slug=self.kwargs['slug'])
        return GearRentalAvailability.objects.filter(gear=gear)

    def perform_create(self, serializer):
        gear = get_object_or_404(Gear, slug=self.kwargs['slug'])
        serializer.save(gear=gear)


# --- Gear Review Views ---
class GearReviewView(generics.ListCreateAPIView):
    serializer_class = GearReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        gear = get_object_or_404(Gear, slug=self.kwargs['slug'])
        return GearReview.objects.filter(gear=gear)

    def perform_create(self, serializer):
        gear = get_object_or_404(Gear, slug=self.kwargs['slug'])
        serializer.save(gear=gear, reviewer=self.request.user)