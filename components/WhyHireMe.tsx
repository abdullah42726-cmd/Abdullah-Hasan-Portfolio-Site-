import React from 'react';
import AnimatedSection from './AnimatedSection';

const WhyHireMe: React.FC = () => {
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
  
  // Updated image to a full-body portrait with a transparent background.
  const imageUrl = `https://i.imgur.com/ZoHJxFb.png`;

  return (
    <section className="bg-brand-dark-2 border border-white/10 rounded-3xl p-8 md:p-12 my-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Visuals Column */}
        <AnimatedSection animation="fade-in-left">
          <div className="relative h-[400px] md:h-[450px] flex justify-center items-center">
            {/* Background circle */}
            <div className="absolute w-80 h-80 md:w-[404px] md:h-[404px] bg-brand-blue-500 opacity-30 rounded-full"></div>
            
            {/* Image container - no clipping */}
            <div className="relative w-full h-full flex justify-center items-end">
                <img
                    src={imageUrl}
                    alt="Abdullah Hasan"
                    className="h-full w-auto object-contain z-10"
                    loading="lazy"
                />
            </div>
          </div>
        </AnimatedSection>
        
        {/* Text Content Column */}
        <AnimatedSection animation="fade-in-right" delay={200}>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold"><span className="text-white">Why</span> <span className="text-brand-blue-500">Hire me?</span></h2>
            <p className="text-gray-400 mt-6 max-w-md">
              With over 6 years of experience, I blend creative artistry with technical skill to deliver designs that not only look stunning but also drive results and captivate audiences.
            </p>
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-12 mt-8">
              <div>
                <p className="text-4xl font-bold text-white">450+</p>
                <p className="text-gray-400">Project Completed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">100+</p>
                <p className="text-gray-400">Happy Clients</p>
              </div>
            </div>
            <a href="#contact" onClick={handleNavClick} className="inline-block mt-10 bg-brand-dark border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Hire me
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(WhyHireMe);