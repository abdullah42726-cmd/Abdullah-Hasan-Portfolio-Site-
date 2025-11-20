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
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1611162617213-6d221bde3867?q=75&w=600",
        category: "Social Media",
        liveUrl: "https://www.behance.net/embed/project/235962793?ilo0=1",
    },
    {
        id: 2,
        title: "Minimalist Logo Design",
        description: "A series of clean and modern logo designs that embody brand identity through minimalist principles, ensuring versatility and memorability.",
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=75&w=600",
        category: "Branding & Logo Design",
        liveUrl: "https://www.behance.net/embed/project/219640911?ilo0=1",
    },
     {
        id: 3,
        title: "Creative T-Shirt Graphics",
        description: "Unique and eye-catching T-shirt graphics created for various brands, focusing on creative illustration and typography to make a statement.",
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=75&w=600",
        category: "Apparel Design",
        liveUrl: "https://www.behance.net/embed/project/134848195?ilo0=1",
    },
    {
        id: 4,
        title: "Mobile App UI/UX",
        description: "A comprehensive UI/UX design for a lifestyle mobile application, focusing on user-centric design principles to create a seamless and enjoyable experience.",
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=75&w=600",
        category: "UI/UX Design",
        liveUrl: "https://www.behance.net/embed/project/134848195?ilo0=1", // Placeholder URL
    },
    {
        id: 5,
        title: "Promotional Video Editing",
        description: "Edited a series of promotional videos for a product launch, incorporating motion graphics, sound design, and color grading to create a high-impact final product.",
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1574717024633-591b31a80e73?q=75&w=600",
        category: "Video Editing",
        liveUrl: "https://www.behance.net/embed/project/134848195?ilo0=1", // Placeholder URL
    },
    {
        id: 6,
        title: "Packaging Design for Cosmetics",
        description: "Designed product packaging for a new line of organic cosmetics, creating a visually appealing and brand-consistent look that stands out on shelves.",
        // Optimized: w=600 & q=75
        imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=75&w=600",
        category: "Packaging Design",
        liveUrl: "https://www.behance.net/embed/project/134848195?ilo0=1", // Placeholder URL
    },
];