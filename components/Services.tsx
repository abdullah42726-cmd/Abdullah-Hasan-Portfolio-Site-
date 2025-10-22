import React from 'react';
import AnimatedSection from './AnimatedSection';

interface ServiceCardProps {
  title: string;
  details: string[];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, details, index }) => (
  <div className="bg-brand-dark-2 rounded-3xl p-8 h-full flex flex-col group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue-500/10 border border-transparent hover:border-brand-blue-500/30">
    <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-white pr-4">{title}</h3>
        <span className="text-5xl font-extrabold text-gray-700/50 transition-colors duration-300 group-hover:text-brand-blue-500/50">
            {String(index + 1).padStart(2, '0')}
        </span>
    </div>
    <ul className="mt-4 space-y-3 text-gray-400 flex-grow">
        {details.map((detail, i) => (
            <li key={i} className="flex items-start">
                <svg className="w-4 h-4 text-brand-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{detail}</span>
            </li>
        ))}
    </ul>
  </div>
);


const Services: React.FC = () => {
  const services = [
    { 
      title: "Graphic Design", 
      details: ["Logo & Branding Identity", "Social Media Graphics", "Print & Marketing Materials", "Web & Ad Banners"]
    },
    { 
      title: "Video Editing", 
      details: ["Short Form (Reels, TikTok, Shorts)", "Long Form Content (YouTube)", "Documentaries & Infomercials", "Corporate & Event Videos"]
    },
    { 
      title: "UI/UX Design", 
      details: ["Mobile App Interfaces (iOS & Android)", "Website & Web App Design", "Software UI/UX Enhancement", "Interactive Prototypes"]
    },
    { 
      title: "Social Media Ad Design Package", 
      details: ["Static & Video Ad Creatives", "A/B Testing Variations", "Full Campaign Asset Packages", "Platform-Specific Optimization"]
    },
    { 
      title: "Packaging Design", 
      details: ["Product Packaging Concepts", "Label & Box Design", "3D Mockup Creation", "Print-Ready Files"] 
    },
    {
      title: "Web Design & Development",
      details: ["Custom WordPress Development", "Figma to Live Website Conversion", "E-commerce & Store Setup", "Responsive Web Design"]
    }
  ];

  return (
    <section id="services" className="bg-brand-dark text-white rounded-3xl p-8 md:p-12 my-20">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">My Services</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I offer a range of creative services designed to elevate your brand and engage your audience, delivering polished and impactful results.
          </p>
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <AnimatedSection key={service.title} delay={index * 150}>
            <ServiceCard title={service.title} details={service.details} index={index} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default React.memo(Services);