from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Booking, BookingParticipant, Payment
from .serializers import (
    BookingListSerializer, BookingDetailSerializer,
    BookingCreateSerializer, PaymentSerializer, PaymentInitSerializer
)


class BookingListView(generics.ListAPIView):
    serializer_class = BookingListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Booking.objects.all()
        return Booking.objects.filter(user=user)


class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = BookingDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Booking.objects.all()
        return Booking.objects.filter(user=user)

    lookup_field = 'booking_reference'


class BookingCancelView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, booking_reference):
        booking = get_object_or_404(
            Booking, booking_reference=booking_reference, user=request.user
        )
        if booking.status in ['completed', 'cancelled']:
            return Response(
                {'error': f'Booking is already {booking.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        booking.status = 'cancelled'
        booking.cancelled_at = timezone.now()
        booking.cancellation_reason = request.data.get('reason', '')
        booking.save()
        return Response({'message': 'Booking cancelled successfully'})


class PaymentInitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PaymentInitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        booking = get_object_or_404(
            Booking,
            booking_reference=serializer.validated_data['booking_reference'],
            user=request.user
        )

        if booking.payment_status == 'paid':
            return Response(
                {'error': 'Booking is already paid'},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = Payment.objects.create(
            booking=booking,
            amount=serializer.validated_data['amount'],
            currency=booking.currency,
            payment_method=serializer.validated_data['payment_method'],
            transaction_id=f"TXN-{booking.booking_reference}-{timezone.now().timestamp()}",
            status='pending'
        )

        # Here you would integrate eSewa/Khalti/Stripe
        # For now returning payment details
        return Response({
            'payment_id': payment.id,
            'transaction_id': payment.transaction_id,
            'amount': payment.amount,
            'currency': payment.currency,
            'payment_method': payment.payment_method,
            'status': payment.status,
            'message': 'Payment initiated. Integrate eSewa/Khalti/Stripe here.'
        })


class PaymentVerifyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        transaction_id = request.data.get('transaction_id')
        payment = get_object_or_404(Payment, transaction_id=transaction_id)

        # Here you would verify with payment gateway
        # For now we mark it as success
        payment.status = 'success'
        payment.paid_at = timezone.now()
        payment.save()

        payment.booking.payment_status = 'paid'
        payment.booking.status = 'confirmed'
        payment.booking.paid_at = timezone.now()
        payment.booking.transaction_id = transaction_id
        payment.booking.save()

        return Response({'message': 'Payment verified successfully',
                         'booking_status': 'confirmed'})


class AdminBookingListView(generics.ListAPIView):
    serializer_class = BookingListSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Booking.objects.all()