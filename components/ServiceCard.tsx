import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
  onClick: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onClick }) => (
  <div 
    onClick={() => onClick(service)}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(service)}
    role="button"
    tabIndex={0}
    className="glass-effect rounded-3xl p-6 md:p-8 h-full flex flex-col group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-blue-500"
    aria-label={`View details for ${service.title}`}
    >
    <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-white pr-4">{service.title}</h3>
        <span className="text-5xl font-extrabold text-gray-700/50 transition-colors duration-300 group-hover:text-brand-blue-500/50">
            {String(index + 1).padStart(2, '0')}
        </span>
    </div>
    <ul className="mt-4 space-y-3 text-gray-400 flex-grow">
        {service.details.map((detail, i) => (
            <li key={i} className="flex items-start">
                <svg className="w-4 h-4 text-brand-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{detail}</span>
            </li>
        ))}
    </ul>
     <div className="mt-6 text-right">
        <span className="text-sm font-semibold text-brand-blue-500 group-hover:underline">View Details &rarr;</span>
    </div>
  </div>
);

export default ServiceCard;