from rest_framework import serializers
from .models import Gear, GearImage, GearCategory, GearRentalAvailability, GearReview


class GearCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GearCategory
        fields = ['id', 'name', 'slug', 'description', 'icon']


class GearImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GearImage
        fields = ['id', 'image', 'caption', 'is_cover', 'uploaded_at']


class GearRentalAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = GearRentalAvailability
        fields = ['id', 'start_date', 'end_date', 'is_available']


class GearReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)

    class Meta:
        model = GearReview
        fields = ['id', 'reviewer_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['reviewer_name', 'created_at']

    def create(self, validated_data):
        validated_data['reviewer'] = self.context['request'].user
        return super().create(validated_data)


class GearListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)

    class Meta:
        model = Gear
        fields = [
            'id', 'title', 'slug', 'category_name', 'seller_name',
            'brand', 'condition', 'listing_type', 'size',
            'sell_price', 'rent_price_per_day', 'price_currency',
            'is_negotiable', 'location', 'is_available', 'is_featured',
            'average_rating', 'views_count', 'cover_image', 'created_at',
        ]

    def get_cover_image(self, obj):
        cover = obj.images.filter(is_cover=True).first()
        if cover:
            request = self.context.get('request')
            return request.build_absolute_uri(cover.image.url) if request else cover.image.url
        return None


class GearDetailSerializer(serializers.ModelSerializer):
    images = GearImageSerializer(many=True, read_only=True)
    rental_availability = GearRentalAvailabilitySerializer(many=True, read_only=True)
    reviews = GearReviewSerializer(many=True, read_only=True)
    category = GearCategorySerializer(read_only=True)
    seller_name = serializers.CharField(source='seller.username', read_only=True)

    class Meta:
        model = Gear
        fields = '__all__'


class GearCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gear
        exclude = ['seller', 'views_count', 'average_rating', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['seller'] = self.context['request'].user
        return super().create(validated_data)