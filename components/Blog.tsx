import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface BlogCardProps {
    imageUrl: string;
    category: string;
    author: string;
    date: string;
    title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageUrl, category, author, date, title }) => (
    <div>
        <div className="relative mb-4">
            <img src={imageUrl} alt={title} className="rounded-3xl w-full h-auto object-cover"/>
            <button className="absolute bottom-4 right-4 bg-brand-dark hover:bg-gray-800 transition-colors w-16 h-16 rounded-full flex items-center justify-center">
                <ArrowRightIcon className="w-8 h-8 text-white" />
            </button>
        </div>
        <div className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full inline-block text-sm font-medium mb-3">{category}</div>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
            <span>● {author}</span>
            <span>● {date}</span>
        </div>
        <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
    </div>
);

const Blog: React.FC = () => {
  return (
    <section className="py-20">
      <div className="flex flex-col items-start gap-y-4 sm:flex-row sm:justify-between sm:items-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          From my <br/> <span className="text-brand-blue-500">blog post</span>
        </h2>
        <button className="bg-brand-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity flex-shrink-0">
          See All
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <BlogCard 
            imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800"
            category="UI/UX Design"
            author="Abdullah Hasan"
            date="10 Nov, 2023"
            title="Design Unraveled: Behind the Scenes of UI/UX Magic"
        />
         <BlogCard 
            imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
            category="App Design"
            author="Abdullah Hasan"
            date="09 Oct, 2023"
            title="Sugee: Loan Management System for Rural Sector."
        />
         <BlogCard 
            imageUrl="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800"
            category="Web Development"
            author="Abdullah Hasan"
            date="13 Aug, 2023"
            title="Cinetrade: Innovative way to invest in Digital Media"
        />
      </div>
    </section>
  );
};

export default Blog;