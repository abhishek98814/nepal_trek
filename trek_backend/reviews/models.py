from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class Review(models.Model):
    REVIEW_TYPE_CHOICES = [
        ('trek', 'Trek'),
        ('tour', 'Tour'),
        ('gear', 'Gear'),
        ('guide', 'Guide'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name='reviews')
    review_type = models.CharField(max_length=20, choices=REVIEW_TYPE_CHOICES)
    booking_reference = models.CharField(max_length=20, blank=True)

    # Content ID (one will be filled)
    trek_id = models.PositiveIntegerField(null=True, blank=True)
    tour_id = models.PositiveIntegerField(null=True, blank=True)
    gear_id = models.PositiveIntegerField(null=True, blank=True)
    guide_id = models.PositiveIntegerField(null=True, blank=True)

    # Review content
    title = models.CharField(max_length=200)
    comment = models.TextField()
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    # Detailed ratings
    value_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True
    )
    service_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True
    )
    safety_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True
    )
    scenery_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True
    )

    # Media
    images = models.ManyToManyField('ReviewImage', blank=True)

    # Status
    is_verified = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    helpful_count = models.PositiveIntegerField(default=0)

    travel_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} — {self.review_type} review ({self.rating}★)"

    class Meta:
        ordering = ['-created_at']


class ReviewImage(models.Model):
    image = models.ImageField(upload_to='review_images/')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                     on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review image by {self.uploaded_by.username}"


class ReviewHelpful(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE,
                                related_name='helpful_votes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['review', 'user']

    def __str__(self):
        return f"{self.user.username} found review helpful"