import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';


interface ServicePageProps {
    service: Service | null;
    allServices: Service[];
    onBack: () => void;
    onServiceSelect: (service: Service) => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ service, allServices, onBack, onServiceSelect }) => {
    if (!service) return null;

    const otherServices = allServices.filter(s => s.title !== service.title);

    return (
      <>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32">
            <AnimatedSection animation="fade-in-down">
                <button 
                  onClick={onBack} 
                  className="flex items-center text-gray-400 hover:text-white mb-8 group transition-colors duration-300"
                  aria-label="Go back to services"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </button>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                    {service.title}
                </h1>
                <div className="w-24 h-1 bg-brand-blue-500 mt-6 mb-10"></div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <AnimatedSection delay={200}>
                        <h2 className="text-3xl font-bold text-white mb-4">Service Overview</h2>
                        <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
                            {service.longDescription}
                        </p>
                    </AnimatedSection>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <AnimatedSection delay={300}>
                        <div className="bg-brand-dark-2 p-6 rounded-2xl">
                            <h3 className="text-2xl font-bold text-white mb-4">What's Included</h3>
                             <ul className="space-y-3 text-gray-400">
                                {service.details.map((detail, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-4 h-4 text-brand-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay={400}>
                        <div className="glass-effect p-6 rounded-2xl text-white">
                            <h3 className="text-2xl font-bold mb-1">{service.pricing.planName}</h3>
                            <p className="text-4xl font-extrabold text-brand-blue-500 my-4">{service.pricing.price}</p>
                            <ul className="space-y-3 text-gray-300 mb-6">
                                {service.pricing.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm">
                                        <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a 
                                href="https://wa.me/8801725796895"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1DAE52] transition-all duration-300 transform hover:scale-105"
                                aria-label="Chat on WhatsApp for a quote"
                            >
                                <WhatsAppIcon className="w-5 h-5 mr-2" />
                                Contact for a Quote
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>

        <section className="mt-12 py-16 bg-brand-dark-2">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Explore Other Services
                    </h2>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherServices.map((s, i) => (
                        <AnimatedSection key={s.title} delay={i * 150}>
                            <ServiceCard service={s} index={i} onClick={onServiceSelect} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
      </>
    );
};

export default ServicePage;