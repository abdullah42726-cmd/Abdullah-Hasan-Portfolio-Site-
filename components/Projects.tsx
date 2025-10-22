import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import AnimatedSection from './AnimatedSection';
import PortfolioDetailModal from './PortfolioDetailModal';

interface ProjectsProps {
  items: PortfolioItem[];
}

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
              className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-brand-blue-500 text-white'
                  : 'bg-brand-dark-2 text-gray-300 hover:bg-brand-blue-500/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 100}>
            <div 
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedItem(item)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${item.title}`}
            >
              <img src={item.imageUrl} alt={item.title} className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-sm bg-brand-blue-500/80 text-white px-2 py-1 rounded">{item.category}</span>
                <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
              </div>
              <div className="absolute inset-0 bg-brand-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                <span className="text-white text-lg font-semibold">View Project</span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <PortfolioDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default React.memo(Projects);