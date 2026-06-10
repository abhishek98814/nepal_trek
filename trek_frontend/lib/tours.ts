import api from './axios';

// --- Get all tours ---
export const getTours = async (params?: {
  difficulty?: string;
  best_season?: string;
  region?: string;
  tour_type?: string;
  is_featured?: boolean;
  guide_included?: boolean;
  transport_included?: boolean;
  meals_included?: boolean;
  search?: string;
  ordering?: string;
}) => {
  const response = await api.get('/tours/', { params });
  return response.data;
};

// --- Get featured tours ---
export const getFeaturedTours = async () => {
  const response = await api.get('/tours/featured/');
  return response.data;
};

// --- Get single tour by slug ---
export const getTourBySlug = async (slug: string) => {
  const response = await api.get(`/tours/${slug}/`);
  return response.data;
};

// --- Get tour itinerary ---
export const getTourItinerary = async (slug: string) => {
  const response = await api.get(`/tours/${slug}/itinerary/`);
  return response.data;
};

// --- Get tour availability ---
export const getTourAvailability = async (slug: string) => {
  const response = await api.get(`/tours/${slug}/availability/`);
  return response.data;
};

// --- Get tour images ---
export const getTourImages = async (slug: string) => {
  const response = await api.get(`/tours/${slug}/images/`);
  return response.data;
};

// --- Get tour categories ---
export const getTourCategories = async () => {
  const response = await api.get('/tours/categories/');
  return response.data;
};

// --- Get all guides ---
export const getTourGuides = async (params?: {
  search?: string;
  ordering?: string;
}) => {
  const response = await api.get('/tours/guides/', { params });
  return response.data;
};

// --- Get single guide ---
export const getTourGuideById = async (id: number) => {
  const response = await api.get(`/tours/guides/${id}/`);
  return response.data;
};

// --- Get my tours ---
export const getMyTours = async () => {
  const response = await api.get('/tours/my-tours/');
  return response.data;
};

// --- Create tour ---
export const createTour = async (data: FormData) => {
  const response = await api.post('/tours/create/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// --- Update tour ---
export const updateTour = async (slug: string, data: FormData) => {
  const response = await api.put(`/tours/${slug}/edit/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// --- Delete tour ---
export const deleteTour = async (slug: string) => {
  const response = await api.delete(`/tours/${slug}/edit/`);
  return response.data;
};

// --- Upload tour image ---
export const uploadTourImage = async (slug: string, formData: FormData) => {
  const response = await api.post(`/tours/${slug}/images/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// --- Add tour itinerary day ---
export const addTourItinerary = async (slug: string, data: {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  meals?: string;
  places_to_visit?: string;
}) => {
  const response = await api.post(`/tours/${slug}/itinerary/`, data);
  return response.data;
};

// --- Add tour availability ---
export const addTourAvailability = async (slug: string, data: {
  start_date: string;
  end_date: string;
  available_slots: number;
}) => {
  const response = await api.post(`/tours/${slug}/availability/`, data);
  return response.data;
};

// --- Register as guide ---
export const registerAsGuide = async (data: {
  license_number: string;
  experience_years: number;
  languages: string;
  specialization: string;
  bio: string;
}) => {
  const response = await api.post('/tours/guides/register/', data);
  return response.data;
};