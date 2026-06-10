export interface ReviewImage {
  id: number;
  image: string;
  uploaded_at: string;
}

export interface Review {
  id: number;
  username: string;
  profile_picture: string | null;
  review_type: 'trek' | 'tour' | 'gear' | 'guide';
  trek_id: number | null;
  tour_id: number | null;
  gear_id: number | null;
  guide_id: number | null;
  title: string;
  comment: string;
  rating: number;
  value_rating: number | null;
  service_rating: number | null;
  safety_rating: number | null;
  scenery_rating: number | null;
  images: ReviewImage[];
  is_verified: boolean;
  is_featured: boolean;
  helpful_count: number;
  travel_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewFormData {
  review_type: 'trek' | 'tour' | 'gear' | 'guide';
  trek_id?: number;
  tour_id?: number;
  gear_id?: number;
  guide_id?: number;
  booking_reference?: string;
  title: string;
  comment: string;
  rating: number;
  value_rating?: number;
  service_rating?: number;
  safety_rating?: number;
  scenery_rating?: number;
  travel_date?: string;
}