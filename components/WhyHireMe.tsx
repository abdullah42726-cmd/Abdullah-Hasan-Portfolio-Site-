import React from 'react';

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
    <section className="bg-brand-gray rounded-3xl p-8 md:p-12 my-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Visuals Column */}
        <div className="relative h-[450px] flex justify-center items-center">
          {/* Background circle */}
          <div className="absolute w-[404px] h-[404px] bg-brand-blue-200 rounded-full"></div>
          
          {/* Image container - no clipping */}
          <div className="relative w-full h-full flex justify-center items-end">
              <img
                  src={imageUrl}
                  alt="Abdullah Hasan"
                  className="h-full w-auto object-contain"
              />
          </div>
        </div>
        
        {/* Text Content Column */}
        <div>
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