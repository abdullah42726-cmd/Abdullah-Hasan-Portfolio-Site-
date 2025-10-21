import React from 'react';
import StarIcon from './icons/StarIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import AnimatedSection from './AnimatedSection';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 00-2 0v6a1 1 0 102 0V7zm6 0a1 1 0 00-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
);


const ProjectIdea: React.FC = () => {
  return (
    <section id="contact" className="py-20 text-center">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Have an Awsome Project <br/> Idea? <span className="text-brand-blue-500">Let's Discuss</span>
        </h2>
      </AnimatedSection>
      
      <AnimatedSection delay={150}>
        <div className="mt-10">
          <a 
            href="https://wa.me/8801725796895"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1DAE52] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-lg shadow-lg"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-7 h-7 mr-3" />
            Let's have a chat or Call
          </a>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:items-center sm:space-y-0 sm:space-x-8 mt-16 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
              <StarIcon className="text-yellow-400 w-5 h-5"/>
              <span>4.9/5 Average Ratings</span>
          </div>
          <div className="flex items-center space-x-2">
              <AwardIcon />
              <span>25+ Winning Awards</span>
          </div>
          <div className="flex items-center space-x-2">
              <CheckIcon />
              <span>Certified Product Designer</span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default React.memo(ProjectIdea);