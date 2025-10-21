import React from 'react';
import { PortfolioItem } from '../types';
import AnimatedSection from './AnimatedSection';

interface PortfolioPageProps {
  items: PortfolioItem[];
  onViewProject: (item: PortfolioItem) => void;
}

const PortfolioCard: React.FC<{ item: PortfolioItem; onViewProject: (item: PortfolioItem) => void; }> = ({ item, onViewProject }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onViewProject(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onViewProject(item)}
      aria-label={`View details for ${item.title}`}
    >
      <div className="rounded-2xl overflow-hidden mb-4">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-64 object-cover transition-all duration-300 ease-in-out group-hover:scale-105" 
        />
      </div>
      <h3 className="text-xl font-bold text-brand-dark dark:text-white group-hover:text-brand-blue-500 transition-colors">{item.title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{item.category}</p>
    </div>
  );
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({ items, onViewProject }) => {
  return (
    <main className="py-20 animate-fade-in-up">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-brand-dark dark:text-white">My </span>
            <span className="text-brand-blue-500">Portfolio</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Here's a selection of some of my recent work. Click on any project to see more details or view a live version.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 100}>
            <PortfolioCard item={item} onViewProject={onViewProject} />
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
};

export default PortfolioPage;