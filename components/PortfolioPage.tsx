import React from 'react';
import { PortfolioItem } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface PortfolioCardProps {
    item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => (
    <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
        <div className="relative">
            <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
            <p className="text-sm font-semibold text-brand-blue-500 uppercase tracking-wider">{item.category}</p>
            <h3 className="text-xl font-bold text-brand-dark mt-2 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
            <button className="font-semibold text-brand-blue-500 hover:text-brand-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
                View Project <ArrowRightIcon className="w-5 h-5 ml-1" />
            </button>
        </div>
    </div>
);


interface PortfolioPageProps {
    items: PortfolioItem[];
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ items }) => {
    return (
        <div className="bg-brand-gray min-h-screen">
            <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">My Portfolio</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Here's a collection of my recent projects, showcasing my skills in UI/UX, web design, and motion graphics.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map(item => (
                        <PortfolioCard key={item.id} item={item} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PortfolioPage;
