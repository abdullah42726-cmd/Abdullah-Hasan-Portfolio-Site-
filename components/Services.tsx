import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

const ServiceCard: React.FC<{ title: string; imageUrl: string }> = ({ title, imageUrl }) => (
  <div className="bg-brand-dark-2 rounded-3xl p-6 flex flex-col">
    <h3 className="text-2xl font-bold">{title}</h3>
    <div className="flex-grow my-4 relative overflow-hidden rounded-2xl">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover"/>
    </div>
    <div className="flex justify-end">
      <button className="bg-gray-800 hover:bg-gray-700 transition-colors w-16 h-16 rounded-full flex items-center justify-center">
        <ArrowRightIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-brand-dark text-white rounded-3xl p-12 my-20">
      <div className="flex justify-between items-start mb-10">
        <h2 className="text-5xl font-bold">My Services</h2>
        <p className="max-w-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc, posuere in justo vulputate, bibendum sodales.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard title="UI/UX Design" imageUrl="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800" />
        <ServiceCard title="Web Design" imageUrl="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=800" />
        <ServiceCard title="Landing Page" imageUrl="https://images.unsplash.com/photo-1559028006-44a3a2521f3c?q=80&w=800" />
      </div>
       <div className="flex justify-center mt-8 space-x-2">
        <span className="block w-6 h-2 rounded-full bg-brand-blue-500"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-600"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-600"></span>
      </div>
    </section>
  );
};

export default Services;