export interface PortfolioItem {
    id: number | null;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    liveUrl?: string;
}

// FIX: Added User interface to resolve import errors in Login, SignUp, and VerificationPage components.
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    verified: boolean;
}