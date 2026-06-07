from rest_framework import serializers
from .models import Trek, TrekImage, TrekAvailibility , Category, TrekItinerary


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon']


class TrekImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrekImage
        fields = ['id', 'image', 'caption', 'is_cover', 'uploaded_at']


class TrekItinerarySerializer(serializers.ModelSeializer):
    class Meta:
        model = TrekItinerary
        fields = ['id', 'day_number', 'title', 'description', 'meals_included']


class TrekAvailibilitySerializer(serializers.ModelSerializer):
    remaining_slot = serializers.ReadonlyField()

    class Meta:
        model = TrekAvailibility
        fields = ['id', 'start_date', 'end_date', 'available_slots',
                  'booked_slot', 'remaining_slot', 'is_active']
        


class TrekListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    discounted_price = serializers.ReadOnlyField()
    category_name = serializers.CharField(source='category.name', read_only=True)


    class Meta:
        model = Trek

        fields = [
            'id', 'title', 'slug', 'difficulty', 'duration_days',
            'max_altitude', 'price_per_person', 'discounted_price',
            'discount_percent', 'best_season', 'region',
            'average_rating', 'total_bookings', 'is_featured',
            'cover_image', 'category_name', 'tims_required',
        ]
        def get_cover_image(self, obj):

            cover = obj.images.filter(is_cover=True).first()
            if cover:
                request = self.context.get('request')
                return request.build_absolute_url(cover.image.url) if request else cover.image.url 
            return None
        
class TrekDetailSerializer(serializers.ModelSerializer):
    images = TrekImageSerializer(many=True, read_only=True)
    itinerary = TrekItinerarySerializer(many=True, read_only=True)
    availibility = TrekAvailibilitySerializer(many=True, read_only=True)
    discounted_price = serializers.ReadOnlyField()
    Category = CategorySerializer(read_only = True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Trek
        field = '__all__'

        
class TreakCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trek
        exclude = ['created_by', 'total_bookings', 'average_rating', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].User
        return super().create(validated_data)