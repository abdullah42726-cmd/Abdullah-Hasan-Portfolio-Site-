export interface User {
    id: number;
    name: string;
    email: string;
    password?: string; // Should not be passed to client in a real app
    role: 'admin' | 'user';
    verified: boolean;
}

export interface Comment {
    id: number;
    author: string;
    date: string;
    text: string;
}

export interface Post {
    id: number;
    title: string;
    author: string;
    category: string;
    date: string;
    status: 'Published' | 'Draft';
    content?: string;
    imageUrl?: string;
    comments?: Comment[];
}

export interface PortfolioItem {
    id: number | null;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
}
