import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

const Portfolio: React.FC = () => {
    const filters = ['Landing Page', 'Product Design', 'Animation', 'Glassmorphism', 'Cards'];
  return (
    <section id="portfolio" className="py-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-5xl font-bold">
          <span className="text-brand-dark">Lets have a look at my </span><span className="text-brand-blue-500">Portfolio</span>
        </h2>
        <button className="bg-brand-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity">
          See All
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
          <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800" alt="Portfolio item 1" className="rounded-2xl" />
          <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800" alt="Portfolio item 2" className="rounded-2xl" />
      </div>
      
      <div className="flex justify-center space-x-2 mb-10">
        <span className="block w-6 h-2 rounded-full bg-brand-blue-500"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-300"></span>
      </div>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
          {filters.map(filter => (
              <button key={filter} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">{filter}</button>
          ))}
      </div>

      <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold flex items-center justify-center gap-4 text-brand-dark">
            Lirante - Food Dilvery Solution
            <span className="bg-brand-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <ArrowRightIcon className="w-6 h-6" />
            </span>
          </h3>
          <p className="text-gray-500 mt-4">
              Lirante is a comprehensive food delivery platform designed with a user-first approach. I crafted a seamless and intuitive UI/UX, from browsing menus to checkout, ensuring a delightful and efficient ordering experience for customers.
          </p>
      </div>
    </section>
  );
};

export default Portfolio;