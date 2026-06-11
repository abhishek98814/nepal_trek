from rest_framework import serializers
from .models import Trek, TrekImage, TrekAvailability, Category, TrekItinerary


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon']


class TrekImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrekImage
        fields = ['id', 'image', 'caption', 'is_cover', 'uploaded_at']


class TrekItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrekItinerary
        fields = ['id', 'day', 'title', 'description',
                  'altitude_m', 'accommodation', 'meals']


class TrekAvailabilitySerializer(serializers.ModelSerializer):
    remaining_slots = serializers.ReadOnlyField()

    class Meta:
        model = TrekAvailability
        fields = ['id', 'start_date', 'end_date', 'available_slots',
                  'booked_slots', 'remaining_slots', 'is_active']


class TrekListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    images = TrekImageSerializer(many=True, read_only=True)  # ← added
    discounted_price = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Trek
        fields = [
            'id', 'title', 'slug', 'difficulty', 'duration_days',
            'max_altitude', 'price_per_person', 'discounted_price',
            'discount_percent', 'best_season', 'region',
            'average_rating', 'total_bookings', 'is_featured',
            'cover_image', 'images', 'category_name', 'tims_required',  # ← added images
        ]

    def get_cover_image(self, obj):
        cover = obj.images.filter(is_cover=True).first()
        if not cover:
            cover = obj.images.first()  # ← fallback to first image
        if cover:
            request = self.context.get('request')
            return request.build_absolute_uri(cover.image.url) if request else cover.image.url
        return None


class TrekDetailSerializer(serializers.ModelSerializer):
    images = TrekImageSerializer(many=True, read_only=True)
    itinerary = TrekItinerarySerializer(many=True, read_only=True)
    availability = TrekAvailabilitySerializer(many=True, read_only=True)
    discounted_price = serializers.ReadOnlyField()
    category = CategorySerializer(read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Trek
        fields = '__all__'


class TrekCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trek
        exclude = ['created_by', 'total_bookings', 'average_rating',
                   'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)