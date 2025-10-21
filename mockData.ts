import { PortfolioItem, User } from './types';

// In a real app, this would be a database.
// Passwords should be hashed. For this demo, they are plaintext.
// FIX: Exported mockUsers to resolve import errors in Login and SignUp components.
export const mockUsers: User[] = [
    {
        id: 999,
        name: 'Admin',
        email: 'admin@example.com',
        password: 'Password123!',
        role: 'admin',
        verified: true,
    },
];

export const mockPortfolioData: PortfolioItem[] = [
    {
        id: 1,
        title: "Social Media Post Design",
        description: "A collection of engaging and visually appealing social media posts designed to capture audience attention and boost brand presence.",
        imageUrl: "https://images.unsplash.com/photo-1611162617213-6d221bde3867?q=80&w=800",
        category: "Social Media",
        liveUrl: "https://www.behance.net/embed/project/235962793?ilo0=1",
    },
    {
        id: 2,
        title: "Minimalist Logo Design",
        description: "A series of clean and modern logo designs that embody brand identity through minimalist principles, ensuring versatility and memorability.",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800",
        category: "Branding & Logo Design",
        liveUrl: "https://www.behance.net/embed/project/219640911?ilo0=1",
    },
     {
        id: 3,
        title: "Creative T-Shirt Graphics",
        description: "Unique and eye-catching T-shirt graphics created for various brands, focusing on creative illustration and typography to make a statement.",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
        category: "Apparel Design",
        liveUrl: "https://www.behance.net/embed/project/134848195?ilo0=1",
    },
];