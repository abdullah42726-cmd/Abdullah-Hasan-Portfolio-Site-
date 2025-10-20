import React from 'react';
import StarIcon from './icons/StarIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Swoosh: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 54 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.31641 32.4238C9.72974 23.8028 23.3794 10.5367 51.1111 2.31641" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2.31641 23.0332C9.72974 14.4122 23.3794 1.14611 51.1111 9.36642" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);


const Hero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  // Reverted WebP to original PNG.
  const imageUrl = `https://i.imgur.com/mJ2JB0f.png`;

  return (
    <section id="home" ref={ref} className="relative pt-12 pb-24 text-center overflow-x-clip">
      
      {/* Top elements */}
      <div className="relative z-10">
        <div className={`inline-block relative animate-gentle-bounce scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className={`absolute -top-3 -right-10 transform scale-75 -rotate-12 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                 <Swoosh className="w-12 h-auto text-brand-blue-500 animate-subtle-wave" />
            </div>
            <div className="bg-white border-2 border-brand-dark rounded-full px-5 py-2 text-md shadow-sm text-brand-dark font-medium">
                Hello!
            </div>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-dark leading-tight mt-6 relative max-w-4xl mx-auto scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            I'm <span className="text-brand-blue-500">Abdullah Hasan</span>,<br/>
            <span className="text-3xl sm:text-4xl md:text-5xl">Graphics Designer &amp; Video Editor</span>
        </h1>
        <div className={`absolute top-full -mt-4 left-4 md:left-1/4 transform rotate-[-25deg] scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
             <Swoosh className="w-16 h-auto text-brand-blue-500 animate-subtle-wave" />
        </div>
      </div>

      {/* Main content area */}
      <div className="mt-12 md:-mt-8 relative flex justify-center items-center h-[480px] md:h-[550px]">
        
        {/* Left Testimonial */}
        <div className={`hidden md:block absolute left-0 top-1/4 max-w-[220px] text-left z-20 bg-white p-6 rounded-xl shadow-lg scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <span className="text-5xl text-gray-400 font-serif leading-none block -mb-4">“</span>
            <p className="text-gray-700 text-sm font-medium">
                Abdullah's Exceptional design work ensures our website's success. Highly Recommended
            </p>
        </div>

        {/* Right Experience */}
        <div className={`hidden md:block absolute right-0 top-1/4 max-w-xs text-left z-20 bg-white p-6 rounded-xl shadow-lg scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex text-brand-blue-500">
                <StarIcon className="w-5 h-5"/><StarIcon className="w-5 h-5"/><StarIcon className="w-5 h-5"/><StarIcon className="w-5 h-5"/><StarIcon className="w-5 h-5"/>
            </div>
            <p className="text-4xl font-bold text-brand-dark mt-2">10 Years</p>
            <p className="text-gray-500">Experience</p>
        </div>

        {/* Centerpiece Image & Background */}
        <div className={`absolute bottom-0 w-full max-w-[480px] md:max-w-[550px] h-full scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '500ms' }}>
          {/* Replaced 'opacity-0 motion-safe:animate-slide-up-hero' with the scroll animation classes */}
          <div className="absolute bottom-0 w-full h-1/2 bg-brand-blue-200 rounded-t-full" />
          {/* The image container */}
          <div 
            className="relative w-full h-full flex justify-center items-end"
          >
              <img 
                  src={imageUrl}
                  alt="Abdullah Hasan, a smiling graphics designer and video editor." 
                  className="h-[95%] w-auto object-contain"
              />
          </div>
        </div>
      </div>
      
      {/* Buttons at the bottom */}
       <div className={`relative -mt-24 sm:-mt-16 z-30 flex justify-center scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '600ms' }}>
        <div className="flex items-center rounded-full p-2 glass-effect">
            <a href="#portfolio" onClick={handleNavClick} className="bg-brand-blue-500 text-white px-8 py-3 rounded-full text-sm font-semibold flex items-center hover:bg-brand-blue-600 transition-colors">
                Portfolio <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a href="#contact" onClick={handleNavClick} className="text-brand-dark px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/50 transition-colors">
                Hire me
            </a>
        </div>
      </div>

    </section>
  );
};

export default React.memo(Hero);