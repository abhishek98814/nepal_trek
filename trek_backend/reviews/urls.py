from django.urls import path
from .views import (
    ReviewListView, ReviewCreateView, ReviewDetailView,
    MyReviewListView, ReviewHelpfulView,
    ReviewImageUploadView, FeaturedReviewView
)

urlpatterns = [
    path('', ReviewListView.as_view(), name='review-list'),
    path('create/', ReviewCreateView.as_view(), name='review-create'),
    path('featured/', FeaturedReviewView.as_view(), name='review-featured'),
    path('my-reviews/', MyReviewListView.as_view(), name='my-reviews'),
    path('<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('<int:pk>/helpful/', ReviewHelpfulView.as_view(), name='review-helpful'),
    path('images/upload/', ReviewImageUploadView.as_view(), name='review-image-upload'),
]