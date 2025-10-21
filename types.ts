export interface User {
    id: string; // Supabase user ID is a UUID string
    name: string;
    email: string;
    role: 'admin' | 'user';
    verified: boolean;
}

export interface Comment {
    id: number;
    post_id: number;
    author: string;
    date: string;
    text: string;
}

export interface Post {
    id?: number;
    title: string;
    author: string;
    category: string;
    date: string;
    status: 'Published' | 'Draft';
    content?: string;
    imageUrl?: string; // Corresponds to image_url in DB
    comments?: Comment[];
}

export interface PortfolioItem {
    id?: number;
    title: string;
    description: string;
    coverImage: string; // Corresponds to cover_image in DB
    galleryImages: string[]; // Corresponds to gallery_images in DB
    category: string;
}

export interface Service {
    id?: number;
    title: string;
    description: string;
    imageUrl: string; // Corresponds to image_url in DB
    content: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string; // Corresponds to created_at in DB
  status: 'unread' | 'read';
}