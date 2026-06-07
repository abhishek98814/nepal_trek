from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Review, ReviewImage, ReviewHelpful
from .serializers import (
    ReviewListSerializer, ReviewDetailSerializer,
    ReviewCreateSerializer, ReviewImageSerializer
)


class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Review.objects.all()
        review_type = self.request.query_params.get('type')
        content_id = self.request.query_params.get('id')
        if review_type:
            queryset = queryset.filter(review_type=review_type)
        if content_id and review_type:
            queryset = queryset.filter(**{f'{review_type}_id': content_id})
        return queryset


class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewCreateSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == 'admin':
            return Review.objects.all()
        return Review.objects.filter(user=user)


class MyReviewListView(generics.ListAPIView):
    serializer_class = ReviewListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)


class ReviewHelpfulView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        helpful, created = ReviewHelpful.objects.get_or_create(
            review=review, user=request.user
        )
        if created:
            review.helpful_count += 1
            review.save()
            return Response({'message': 'Marked as helpful'})
        else:
            helpful.delete()
            review.helpful_count -= 1
            review.save()
            return Response({'message': 'Removed helpful mark'})


class ReviewImageUploadView(generics.CreateAPIView):
    serializer_class = ReviewImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class FeaturedReviewView(generics.ListAPIView):
    queryset = Review.objects.filter(is_featured=True)
    serializer_class = ReviewListSerializer
    permission_classes = [permissions.AllowAny]