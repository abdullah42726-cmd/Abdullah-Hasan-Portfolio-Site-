import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import AnimatedSection from './AnimatedSection';

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
    </section>
  );
};

export default React.memo(ProjectIdea);