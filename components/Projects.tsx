import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import AnimatedSection from './AnimatedSection';
import PortfolioDetailModal from './PortfolioDetailModal';

interface ProjectsProps {
  items: PortfolioItem[];
}

// Sub-component to handle individual image loading states
const ProjectCard: React.FC<{ item: PortfolioItem; onClick: (item: PortfolioItem) => void; delay: number }> = ({ item, onClick, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimatedSection delay={delay}>
      <div 
        className="group relative overflow-hidden rounded-lg cursor-pointer bg-brand-dark-2 shadow-lg"
        onClick={() => onClick(item)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(item)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${item.title}`}
      >
        {/* Image Container with Skeleton Loader */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-800">
          
          {/* Skeleton Pulse (Visible until image loads) */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-700/50 animate-pulse z-10" />
          )}

          <img 
            src={item.imageUrl} 
            alt={item.title} 
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transform transition-all duration-700 ease-out
              ${isLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-105'}
            `}
            loading="lazy"
            decoding="async"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300"></div>
        </div>

        {/* Content Content */}
        <div className="absolute bottom-0 left-0 p-6 w-full z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block text-xs font-semibold bg-brand-blue-500 text-white px-2 py-1 rounded mb-2 shadow-sm">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-brand-blue-200 transition-colors">
            {item.title}
          </h3>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-brand-blue-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-30">
          <span className="text-white text-lg font-bold tracking-wide border-2 border-white px-6 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
            View Project
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
};

const Projects: React.FC<ProjectsProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          My Portfolio
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-center">
          Here are some of the projects I've worked on. Each project is a testament to my commitment to quality and creativity.
        </p>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-brand-blue-500 text-white border-brand-blue-500 shadow-lg shadow-brand-blue-500/25'
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <ProjectCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem} 
            delay={index * 100} 
          />
        ))}
      </div>

      <PortfolioDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default React.memo(Projects);