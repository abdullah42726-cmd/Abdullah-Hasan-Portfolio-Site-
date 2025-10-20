import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const WhyHireMe: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  
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
  
  // Replaced broken image link with a working one.
  const imageUrl = `https://i.imgur.com/ZoHJxFb.png`;

  return (
    <section ref={ref} className="bg-brand-gray dark:bg-brand-dark-2 rounded-3xl p-8 md:p-12 my-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Visuals Column */}
        <div className={`relative h-[380px] sm:h-[450px] flex justify-center items-end scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>
          <img
              src={imageUrl}
              alt="Abdullah Hasan"
              className="relative h-full object-contain gradient-mask-bottom"
          />
        </div>
        
        {/* Text Content Column */}
        <div className={`scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-4xl md:text-5xl font-bold"><span className="text-brand-dark dark:text-white">Why</span> <span className="text-brand-blue-500">Hire me?</span></h2>
          <p className="text-gray-500 dark:text-gray-400 mt-6 max-w-md">
            With over six years of experience, I blend creative artistry with technical skill to deliver designs that not only look stunning but also drive results and captivate audiences.
          </p>
          <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-12 mt-8">
            <div>
              <p className="text-4xl font-bold text-brand-dark dark:text-white">450+</p>
              <p className="text-gray-500 dark:text-gray-400">Project Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-dark dark:text-white">100+</p>
              <p className="text-gray-500 dark:text-gray-400">Happy Clients</p>
            </div>
          </div>
          <a href="#contact" onClick={handleNavClick} className="inline-block mt-10 bg-white dark:bg-brand-dark dark:border-gray-600 border border-gray-300 text-brand-dark dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Hire me
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyHireMe);