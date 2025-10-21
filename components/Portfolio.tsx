import React, { useState } from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!items || items.length === 0) {
        return (
            <section id="portfolio" className="py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold">
                    <span className="text-brand-dark">My </span><span className="text-brand-blue-500">Portfolio</span>
                </h2>
                <p className="text-gray-500 mt-4">No portfolio items to display yet.</p>
            </section>
        );
    }
    
    const activeItem = items[activeIndex];
    const nextItemIndex = (activeIndex + 1) % items.length;
    const nextItem = items[nextItemIndex];
    
    const goToNext = () => setActiveIndex(nextItemIndex);
    const goToIndex = (index: number) => setActiveIndex(index);

  return (
    <section id="portfolio" className="py-20">
      <div className="flex flex-col items-start gap-y-4 sm:flex-row sm:justify-between sm:items-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-brand-dark">Lets have a look at my </span><span className="text-brand-blue-500">Portfolio</span>
        </h2>
        <button className="bg-brand-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity flex-shrink-0">
          See All
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
          <img src={activeItem.imageUrl} alt={activeItem.title} className="rounded-2xl w-full h-full object-cover" />
          <img src={nextItem.imageUrl} alt={nextItem.title} className="rounded-2xl w-full h-full object-cover hidden md:block" />
      </div>
      
      <div className="flex justify-center space-x-2 mb-10">
        {items.map((_, index) => (
             <button 
               key={index} 
               onClick={() => goToIndex(index)} 
               className={`block h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-brand-blue-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
               aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>

      <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-4 text-brand-dark">
            {activeItem.title}
            <button 
                onClick={goToNext} 
                className="bg-brand-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-brand-blue-600 transition-colors"
                aria-label="Next project"
            >
                <ArrowRightIcon className="w-6 h-6" />
            </button>
          </h3>
          <p className="text-gray-500 mt-4">
              {activeItem.description}
          </p>
      </div>
    </section>
  );
};

export default Portfolio;
