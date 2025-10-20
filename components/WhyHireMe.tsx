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
  
  // Reverted WebP to original PNG.
  const imageUrl = `https://i.imgur.com/mJ2JB0f.png`;

  return (
    <section ref={ref} className="bg-brand-gray rounded-3xl p-8 md:p-12 my-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Visuals Column */}
        <div className={`relative h-[450px] flex justify-center items-end scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>
          {/* Blue circle purely for background color */}
          <div className="absolute w-[404px] h-[404px] bg-brand-blue-500 rounded-full bottom-0"></div>

          {/* The image, positioned on top, with a clip-path */}
          <img
              src={imageUrl}
              alt="Abdullah Hasan"
              className="relative h-[505px] object-contain"
              style={{
                  // This creates a circular clip area with a 202px radius (half of 404px).
                  // The center of the circle is positioned horizontally at 50% and vertically
                  // at 303px from the top of the image. This aligns the bottom of the clip
                  // circle with the bottom of the image, while leaving the top part (head) unclipped.
                  clipPath: 'circle(202px at 50% 303px)'
              }}
          />
        </div>
        
        {/* Text Content Column */}
        <div className={`scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-4xl md:text-5xl font-bold"><span className="text-brand-dark">Why</span> <span className="text-brand-blue-500">Hire me?</span></h2>
          <p className="text-gray-500 mt-6 max-w-md">
            With a decade of experience, I blend creative artistry with technical skill to deliver designs that not only look stunning but also drive results and captivate audiences.
          </p>
          <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-12 mt-8">
            <div>
              <p className="text-4xl font-bold text-brand-dark">450+</p>
              <p className="text-gray-500">Project Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-dark">100+</p>
              <p className="text-gray-500">Happy Clients</p>
            </div>
          </div>
          <a href="#contact" onClick={handleNavClick} className="inline-block mt-10 bg-white border border-gray-300 text-brand-dark px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Hire me
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyHireMe);