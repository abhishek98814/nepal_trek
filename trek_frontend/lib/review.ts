import api from './axios';
import { Review, ReviewFormData } from '@/types/review';

// --- Get all reviews (with optional filters) ---
export const getReviews = async (params?: {
  type?: string;
  id?: number;
}) => {
  const response = await api.get('/reviews/', { params });
  return response.data;
};

// --- Get featured reviews ---
export const getFeaturedReviews = async () => {
  const response = await api.get('/reviews/featured/');
  return response.data;
};

// --- Get single review ---
export const getReviewById = async (id: number) => {
  const response = await api.get(`/reviews/${id}/`);
  return response.data;
};

// --- Get my reviews ---
export const getMyReviews = async () => {
  const response = await api.get('/reviews/my-reviews/');
  return response.data;
};

// --- Create review ---
export const createReview = async (data: ReviewFormData) => {
  const response = await api.post('/reviews/create/', data);
  return response.data;
};

// --- Update review ---
export const updateReview = async (id: number, data: Partial<ReviewFormData>) => {
  const response = await api.put(`/reviews/${id}/`, data);
  return response.data;
};

// --- Delete review ---
export const deleteReview = async (id: number) => {
  const response = await api.delete(`/reviews/${id}/`);
  return response.data;
};

// --- Mark review as helpful ---
export const markReviewHelpful = async (id: number) => {
  const response = await api.post(`/reviews/${id}/helpful/`);
  return response.data;
};

// --- Upload review image ---
export const uploadReviewImage = async (formData: FormData) => {
  const response = await api.post('/reviews/images/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// --- Trek reviews ---
export const getTrekReviews = async (id: number) => {
  const response = await api.get('/reviews/', {
    params: { type: 'trek', id },
  });
  return response.data;
};

// --- Tour reviews ---
export const getTourReviews = async (id: number) => {
  const response = await api.get('/reviews/', {
    params: { type: 'tour', id },
  });
  return response.data;
};

// --- Guide reviews ---
export const getGuideReviews = async (id: number) => {
  const response = await api.get('/reviews/', {
    params: { type: 'guide', id },
  });
  return response.data;
};

// --- Gear reviews ---
export const getGearReviews = async (slug: string) => {
  const response = await api.get(`/gear/${slug}/reviews/`);
  return response.data;
};