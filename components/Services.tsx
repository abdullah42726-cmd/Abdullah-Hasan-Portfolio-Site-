import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  isVisible: boolean;
  delay: string;
  onSelect: (id: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isVisible, delay, onSelect }) => (
  <div 
    className={`glass-card rounded-3xl p-6 flex flex-col scroll-animate cursor-pointer group ${isVisible ? 'scroll-animate-visible' : ''}`} 
    style={{ transitionDelay: delay }}
    onClick={() => onSelect(service.id!)}
  >
    <h3 className="text-2xl font-bold">{service.title}</h3>
    <div className="flex-grow my-4 relative overflow-hidden rounded-2xl">
        <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
    </div>
    <div className="flex justify-end">
      <button className="bg-white/10 group-hover:bg-white/20 transition-colors w-16 h-16 rounded-full flex items-center justify-center">
        <ArrowRightIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  </div>
);

interface ServicesProps {
  services: Service[];
  onServiceSelect: (id: number) => void;
}

const Services: React.FC<ServicesProps> = ({ services, onServiceSelect }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" ref={ref} className="bg-brand-dark text-white rounded-3xl p-8 md:p-12 my-20">
      <div className={`flex justify-between items-start mb-10 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold">My Services</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            isVisible={isVisible}
            delay={`${index * 150}ms`}
            onSelect={onServiceSelect}
          />
        ))}
      </div>
       <div className={`flex justify-center mt-8 space-x-2 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
        <span className="block w-6 h-2 rounded-full bg-brand-blue-500"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-600"></span>
        <span className="block w-2 h-2 rounded-full bg-gray-600"></span>
      </div>
    </section>
  );
};

export default Services;