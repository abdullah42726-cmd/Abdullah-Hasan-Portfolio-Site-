import React from 'react';
import AnimatedSection from './AnimatedSection';

const certifications = [
  "Industrial Attachment Graphics Design (UYLab)",
  "Expert Course in Motion Graphics Design (UYLab)",
  "Web Design & Development Wordpress (Home IT)",
  "UI/UX Design By Daniel Scott (Skillshear)",
];

const CheckmarkIcon = () => (
  <svg className="w-6 h-6 text-brand-blue-500 flex-shrink-0 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const Certifications: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          Certifications
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>
      
      <div className="flex-grow">
        <ul className="space-y-6">
          {certifications.map((cert, index) => (
            <AnimatedSection delay={index * 100} key={index}>
              <li className="flex items-center p-4 rounded-lg bg-brand-dark-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CheckmarkIcon />
                <span className="text-lg text-white">{cert}</span>
              </li>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Certifications;