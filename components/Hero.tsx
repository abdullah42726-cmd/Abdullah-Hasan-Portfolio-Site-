import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';
import AnimatedSection from './AnimatedSection';

const Swoosh: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 54 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.31641 32.4238C9.72974 23.8028 23.3794 10.5367 51.1111 2.31641" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M2.31641 23.0332C9.72974 14.4122 23.3794 1.14611 51.1111 9.36642" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

interface HeroProps {
    onNavigateToPortfolio: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToPortfolio }) => {
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
  
  const imageUrl = `https://i.imgur.com/Lasn8cQ.png`;

  return (
    <section id="home" className="relative grid lg:grid-cols-2 items-center min-h-screen pt-32 pb-20 lg:pt-20 lg:pb-12 overflow-hidden">
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-200/50 via-blue-100/50 to-white dark:from-brand-dark dark:via-brand-blue-500/10 dark:to-brand-dark"></div>
      
      {/* Left Column: Text Content */}
      <div className="relative z-10 text-center lg:text-left px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="pop-in">
            <div className="inline-block relative">
                <div className="absolute -top-3 -right-10 transform scale-75 -rotate-12">
                     <Swoosh className="w-12 h-auto text-brand-blue-500 animate-subtle-wave" />
                </div>
                <div className="bg-white dark:bg-brand-dark-2 dark:border-gray-700 border-2 border-brand-dark rounded-full px-5 py-2 text-md shadow-sm text-brand-dark dark:text-white font-medium">
                    Hello!
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={150}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-dark dark:text-white leading-tight mt-6 relative">
                I'm <span className="text-brand-blue-500">Abdullah Hasan</span>,<br/>
                <span className="text-3xl sm:text-4xl md:text-5xl">Graphics Designer &amp; Video Editor</span>
            </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={300}>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
              A creative professional with over 6 years of experience, crafting visually stunning designs and impactful video content that captivates audiences and drives results.
            </p>
        </AnimatedSection>
       
        <AnimatedSection delay={450} className="relative z-30 mt-8 flex justify-center lg:justify-start">
            <div className="flex items-center rounded-full p-2 glass-effect gap-2">
                <button onClick={onNavigateToPortfolio} className="bg-brand-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center hover:bg-brand-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    Portfolio <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                <a href="#projects" onClick={handleNavClick} className="text-brand-dark dark:text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/50 dark:hover:bg-black/20 transition-colors whitespace-nowrap">
                    View My Work
                </a>
            </div>
        </AnimatedSection>
      </div>

      {/* Right Column: Image and Stats */}
      <div className="relative h-[60vh] lg:h-full flex items-center justify-center">
          <AnimatedSection animation="fade-in-right" delay={200} className="w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Background Shape */}
                <div className="absolute w-80 h-80 md:w-[450px] md:h-[450px] bg-brand-blue-200 dark:bg-brand-blue-500/20 rounded-full animate-gentle-bounce"></div>
                
                {/* Image */}
                <img 
                    src={imageUrl}
                    alt="Abdullah Hasan" 
                    className="absolute bottom-0 h-[90%] lg:h-full w-auto object-contain z-10" 
                    loading="eager"
                />

                {/* Stat Card */}
                <div className="absolute top-1/4 right-0 sm:right-10 lg:right-0 xl:right-10 z-20">
                    <AnimatedSection animation="pop-in" delay={400} className="bg-white/50 dark:bg-brand-dark/50 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20">
                        <p className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white">6+</p>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-tight">Years<br/>Experience</p>
                    </AnimatedSection>
                </div>
            </div>
          </AnimatedSection>
      </div>

    </section>
  );
};

export default React.memo(Hero);