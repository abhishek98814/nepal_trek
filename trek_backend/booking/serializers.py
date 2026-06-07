from rest_framework import serializers
from .models import Booking, BookingParticipant, Payment


class BookingParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingParticipant
        fields = ['id', 'full_name', 'age', 'nationality',
                  'passport_number', 'emergency_contact', 'medical_conditions']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'currency', 'payment_method',
                  'transaction_id', 'status', 'paid_at', 'created_at']
        read_only_fields = ['created_at']


class BookingListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'booking_reference', 'username', 'booking_type',
            'start_date', 'end_date', 'num_participants',
            'final_price', 'currency', 'payment_status',
            'status', 'created_at',
        ]


class BookingDetailSerializer(serializers.ModelSerializer):
    participants = BookingParticipantSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['booking_reference', 'final_price',
                            'created_at', 'updated_at']


class BookingCreateSerializer(serializers.ModelSerializer):
    participants = BookingParticipantSerializer(many=True, required=False)

    class Meta:
        model = Booking
        exclude = ['user', 'booking_reference', 'final_price',
                   'payment_status', 'status', 'transaction_id',
                   'paid_at', 'cancelled_at', 'completed_at',
                   'created_at', 'updated_at']

    def create(self, validated_data):
        participants_data = validated_data.pop('participants', [])
        validated_data['user'] = self.context['request'].user
        booking = Booking.objects.create(**validated_data)
        for participant in participants_data:
            BookingParticipant.objects.create(booking=booking, **participant)
        return booking


class PaymentInitSerializer(serializers.Serializer):
    booking_reference = serializers.CharField()
    payment_method = serializers.ChoiceField(choices=[
        'esewa', 'khalti', 'stripe', 'bank', 'cash'
    ])
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)