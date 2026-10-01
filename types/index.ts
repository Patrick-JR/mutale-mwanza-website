export interface Brand {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  description: string | null;
  type: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string | null;
  avatarUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface BookingFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  eventType: string;
  service: string;
  budget: string;
  eventDate: string;
  location: string;
  message: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}
