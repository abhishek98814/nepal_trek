from django.urls import path
from .views import (
    BookingListView, BookingCreateView, BookingDetailView,
    BookingCancelView, PaymentInitView, PaymentVerifyView,
    AdminBookingListView
)

urlpatterns = [
    path('', BookingListView.as_view(), name='booking-list'),
    path('create/', BookingCreateView.as_view(), name='booking-create'),
    path('<str:booking_reference>/', BookingDetailView.as_view(), name='booking-detail'),
    path('<str:booking_reference>/cancel/', BookingCancelView.as_view(), name='booking-cancel'),
    path('payment/initiate/', PaymentInitView.as_view(), name='payment-initiate'),
    path('payment/verify/', PaymentVerifyView.as_view(), name='payment-verify'),
    path('admin/all/', AdminBookingListView.as_view(), name='admin-bookings'),
]