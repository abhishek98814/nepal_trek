from rest_framework import serializers
from .models import Tour, TourImage, TourItinerary, TourAvailability, TourCategory, TourGuide


class TourCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCategory
        fields = ['id', 'name', 'slug', 'description', 'icon']


class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'image', 'caption', 'is_cover', 'uploaded_at']


class TourItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourItinerary
        fields = ['id', 'day', 'title', 'description',
                  'accommodation', 'meals', 'places_to_visit']


class TourAvailabilitySerializer(serializers.ModelSerializer):
    remaining_slots = serializers.ReadOnlyField()

    class Meta:
        model = TourAvailability
        fields = ['id', 'start_date', 'end_date', 'available_slots',
                  'booked_slots', 'remaining_slots', 'is_active']


class TourGuideSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = TourGuide
        fields = ['id', 'username', 'email', 'license_number',
                  'experience_years', 'languages', 'specialization',
                  'is_verified', 'average_rating', 'total_tours',
                  'profile_picture', 'bio']


class TourListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    discounted_price = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'slug', 'tour_type', 'difficulty',
            'duration_days', 'duration_hours', 'destination',
            'region', 'price_per_person', 'discounted_price',
            'discount_percent', 'best_season', 'is_featured',
            'average_rating', 'total_bookings', 'cover_image',
            'category_name', 'guide_included', 'transport_included',
            'meals_included',
        ]

    def get_cover_image(self, obj):
        cover = obj.images.filter(is_cover=True).first()
        if cover:
            request = self.context.get('request')
            return request.build_absolute_uri(cover.image.url) if request else cover.image.url
        return None


class TourDetailSerializer(serializers.ModelSerializer):
    images = TourImageSerializer(many=True, read_only=True)
    itinerary = TourItinerarySerializer(many=True, read_only=True)
    availability = TourAvailabilitySerializer(many=True, read_only=True)
    discounted_price = serializers.ReadOnlyField()
    category = TourCategorySerializer(read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Tour
        fields = '__all__'


class TourCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        exclude = ['created_by', 'total_bookings', 'average_rating',
                   'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)