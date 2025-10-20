import { User, Post, PortfolioItem } from './types';

// In a real app, this would be a database.
// Passwords should be hashed. For this demo, they are plaintext.
export const mockUsers: User[] = [
    { id: 1, name: "Kalamanik1", email: "admin@example.com", password: "ABdullah42726@#", role: "admin", verified: true },
    { id: 2, name: "Alice", email: "alice@example.com", password: "password123", role: "user", verified: true },
    { id: 3, name: "Bob", email: "bob@example.com", password: "password123", role: "user", verified: true },
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


export const mockPostsData: Post[] = [
    { 
        id: 1, 
        title: "Design Unraveled: Behind the Scenes of UI/UX Magic", 
        author: "Abdullah Hasan", 
        category: "UI/UX Design", 
        date: "2023-11-10", 
        status: "Published", 
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800", 
        content: "Detailed content about UI/UX magic...",
        comments: [
            { id: 101, author: 'Alice', date: '2023-11-11', text: 'Great insights! Really loved the breakdown of the design process.' },
            { id: 102, author: 'Bob', date: '2023-11-12', text: 'This was super helpful. Thanks for sharing!' }
        ]
    },
    { 
        id: 2, 
        title: "Sugee: Loan Management System for Rural Sector.", 
        author: "Abdullah Hasan", 
        category: "App Design", 
        date: "2023-10-09", 
        status: "Published", 
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800", 
        content: "Deep dive into the Sugee project...",
        comments: []
    },
    { 
        id: 3, 
        title: "Cinetrade: Innovative way to invest in Digital Media", 
        author: "Abdullah Hasan", 
        category: "Web Development", 
        date: "2023-08-13", 
        status: "Published", 
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800", 
        content: "Exploring the Cinetrade platform...",
        comments: [
            { id: 103, author: 'Alice', date: '2023-08-15', text: 'Fascinating concept. The web design looks clean.' }
        ]
    },
    { 
        id: 4, 
        title: "Upcoming: The Future of Motion Graphics", 
        author: "Abdullah Hasan", 
        category: "Motion Graphics", 
        date: "2024-01-05", 
        status: "Draft", 
        content: "A draft about future trends.",
        comments: []
    },
];