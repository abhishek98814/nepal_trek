# gear/urls.py
from django.urls import path
from .views import (
    GearCategoryListView, GearListView, GearDetailView,
    GearCreateView, GearUpdateDeleteView, MyGearListView,
    FeaturedGearView, GearImageUploadView,
    GearRentalAvailabilityView, GearReviewView
)

urlpatterns = [
    # Categories
    path('categories/', GearCategoryListView.as_view(), name='gear-category-list'),

    # Gear
    path('', GearListView.as_view(), name='gear-list'),
    path('create/', GearCreateView.as_view(), name='gear-create'),
    path('featured/', FeaturedGearView.as_view(), name='gear-featured'),
    path('my/', MyGearListView.as_view(), name='gear-my'),
    path('<slug:slug>/', GearDetailView.as_view(), name='gear-detail'),
    path('<slug:slug>/edit/', GearUpdateDeleteView.as_view(), name='gear-update-delete'),

    # Images
    path('<slug:slug>/images/', GearImageUploadView.as_view(), name='gear-image-upload'),

    # Rental Availability
    path('<slug:slug>/availability/', GearRentalAvailabilityView.as_view(), name='gear-availability'),

    # Reviews
    path('<slug:slug>/reviews/', GearReviewView.as_view(), name='gear-reviews'),
]