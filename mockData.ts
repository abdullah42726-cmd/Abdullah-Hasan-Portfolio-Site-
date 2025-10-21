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
        title: "Lirante - Food Delivery Solution",
        description: "Lirante is a comprehensive food delivery platform designed with a user-first approach. I crafted a seamless and intuitive UI/UX, from browsing menus to checkout, ensuring a delightful and efficient ordering experience for customers.",
        imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800",
        category: "Product Design",
    },
    {
        id: 2,
        title: "Mobile Banking App Concept",
        description: "A modern and secure mobile banking application concept with a focus on user-friendly navigation and clear data visualization to help users manage their finances effectively.",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
        category: "UI/UX Design",
    },
     {
        id: 3,
        title: "Animated Landing Page",
        description: "An engaging landing page for a tech startup featuring custom animations and interactive elements to capture user attention and tell a compelling brand story.",
        imageUrl: "https://images.unsplash.com/photo-1559028006-44a3a2521f3c?q=80&w=800",
        category: "Animation",
    },
];
