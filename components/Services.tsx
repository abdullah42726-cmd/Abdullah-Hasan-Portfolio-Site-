import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

const Services: React.FC<{ services: Service[], onServiceClick: (service: Service) => void }> = ({ services, onServiceClick }) => {
  return (
    <section id="services" className="bg-brand-dark text-white rounded-3xl p-6 md:p-12 my-20 scroll-mt-20">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">My Services</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I offer a range of creative services designed to elevate your brand and engage your audience. Click on any service to view details and pricing information.
          </p>
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <AnimatedSection key={service.title} delay={index * 150}>
            <ServiceCard service={service} index={index} onClick={onServiceClick} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default React.memo(Services);