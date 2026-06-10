from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Trek, Category, TrekImage, TrekItinerary, TrekAvailability
from .serializers import (
    TrekListSerializer, TrekDetailSerializer, TrekCreateUpdateSerializer,
    CategorySerializer, TrekImageSerializer,
    TrekItinerarySerializer, TrekAvailabilitySerializer
)


class IsGuideOrAgencyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role in ['guide', 'agency', 'admin']


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TrekListView(generics.ListAPIView):
    queryset = Trek.objects.filter(
        status='active'
    ).select_related('category', 'created_by').prefetch_related('images')
    serializer_class = TrekListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['difficulty', 'best_season', 'region', 'tims_required', 'is_featured']
    search_fields = ['title', 'description', 'region', 'start_point']
    ordering_fields = ['price_per_person', 'duration_days', 'average_rating', 'created_at']


class TrekDetailView(generics.RetrieveAPIView):
    queryset = Trek.objects.filter(status='active')
    serializer_class = TrekDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class TrekCreateView(generics.CreateAPIView):
    serializer_class = TrekCreateUpdateSerializer
    permission_classes = [IsGuideOrAgencyOrAdmin]


class TrekUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TrekCreateUpdateSerializer
    permission_classes = [IsGuideOrAgencyOrAdmin]
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Trek.objects.all()
        return Trek.objects.filter(created_by=user)


class MyTrekListView(generics.ListAPIView):
    serializer_class = TrekListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Trek.objects.filter(created_by=self.request.user)


class FeaturedTrekView(generics.ListAPIView):
    queryset = Trek.objects.filter(status='active', is_featured=True)
    serializer_class = TrekListSerializer
    permission_classes = [permissions.AllowAny]


class TrekImageUploadView(generics.CreateAPIView):
    serializer_class = TrekImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        trek = get_object_or_404(Trek, slug=self.kwargs['slug'])
        serializer.save(trek=trek)


class TrekItineraryView(generics.ListCreateAPIView):
    serializer_class = TrekItinerarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        trek = get_object_or_404(Trek, slug=self.kwargs['slug'])
        return TrekItinerary.objects.filter(trek=trek)

    def perform_create(self, serializer):
        trek = get_object_or_404(Trek, slug=self.kwargs['slug'])
        serializer.save(trek=trek)


class TrekAvailabilityView(generics.ListCreateAPIView):
    serializer_class = TrekAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        trek = get_object_or_404(Trek, slug=self.kwargs['slug'])
        return TrekAvailability.objects.filter(trek=trek, is_active=True)

    def perform_create(self, serializer):
        trek = get_object_or_404(Trek, slug=self.kwargs['slug'])
        serializer.save(trek=trek)