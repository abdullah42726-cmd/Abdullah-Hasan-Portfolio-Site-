import React, { useState, useEffect } from 'react';
import BehanceIcon from './icons/BehanceIcon';
import AnimatedSection from './AnimatedSection';

const HandWaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.994 496.994" className={className}>
        <g>
            <path fill="#f9cfac" d="m488.329 297.198-150.15 157.15a144.009 144.009 0 0 1-101.83 42.18h-28.35c-72.896 0-132-59.098-132-132 0-35.13-9.25-69.63-26.81-100.05l-44.9-77.77c-6.874-11.904-5.248-26.481 3.17-36.53 14.129-16.905 41.052-14.859 52.26 4.53 65.343 113.181-10.324-17.886 63.94 110.75-51.165-190.945-50.943-185.344-49.14-195.7 0-1.038 1.305-6.21 3.11-9.82 14.736-30.269 58.656-25.525 67.2 6.33l47.17 176.06c0-218.052-.158-207.027.29-210.38 2.494-18.688 18.798-31.37 33.86-31.37 20.857-1.017 37.85 15.559 37.85 35.95v212c60.187-209.94 55.193-195.219 59.64-202 9.364-14.838 30.545-21.065 47.43-11.6 13.39 6.722 21.854 23.982 17.35 40.82l-52.42 195.62v42.53c0 14.26 17.23 21.4 27.31 11.32 48.396-56.028 44.072-51.165 46.39-53.33 25.043-23.209 59.097-26.622 70.36-20.99 17.798 7.652 23.2 31.37 8.27 46.3z" opacity="1"></path>
            <path fill="#ffe4cc" d="m495.059 266.518-171.62 178.13a143.93 143.93 0 0 1-76.6 34.68c-89.326 11.613-154.84-54.566-154.84-130.8 0-35.13-9.25-69.63-26.81-100.05-60.57-103.012-57.054-96.973-57.73-98.3a31.984 31.984 0 0 1 33.04-10.32c6.937 1.904 10.911 5.071 15.42 9.58 33.984 56.921 67.84 116.02 67.74 116.02 8.577 0 14.82-8.136 12.6-16.421C88.489 70.763 90.742 81.843 91.069 74.148c.275-11.258 6.855-23.247 17.59-29.51 4.504-2.645 9.5-4.026 9.91-4.03 12.36 3.01 22.73 12.51 26.26 25.66l47.17 176.06c0-225.792-.241-207.448.56-212.17.971-5.405 3.243-10.492 5.85-14.14 3.096-4.517 7.259-7.81 7.36-7.81 24.406-18.823 58.23-.974 58.23 28.32v212c58.389-203.668 55.258-192.954 55.8-194.36 8.526-24.295 41.074-32.801 60.43-12.01 1.231 1.393 5.522-17.036-60.23 232.21v42.53c0 12.236 13.656 24.05 29.43 17.91 10.597-4.128 16.536-12.665 24.66-22.07 36.553-42.309 32.184-37.333 34.723-40.003a86.293 86.293 0 0 1 40.437-21.977c6.702-1.534 17.297-2.891 23.78-1.9a28.249 28.249 0 0 1 20.17 13.8c1.137 1.904 1.812 3.76 1.86 3.86z" opacity="1"></path>
            <path fill="#f9cfac" d="M223.999 455.528a8 8 0 0 1-8-8c0-63.903 47.695-118.445 110.943-126.87 4.394-.576 8.404 2.494 8.986 6.873a7.999 7.999 0 0 1-6.873 8.986c-55.331 7.37-97.057 55.095-97.057 111.011a7.999 7.999 0 0 1-7.999 8z" opacity="1"></path>
        </g>
    </svg>
);


interface HeroProps {
    onViewWorkClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewWorkClick }) => {
  const jobTitle = "Graphics Designer & Video Editor";
  const [typedTitle, setTypedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Delay start slightly to let other entry animations begin
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setTypedTitle((currentText) => {
          if (currentText.length < jobTitle.length) {
            return jobTitle.slice(0, currentText.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTypingComplete(true);
            return currentText;
          }
        });
      }, 100); // typing speed in ms

      return () => clearInterval(typingInterval);
    }, 500); // delay before typing starts

    return () => clearTimeout(startDelay);
  }, []); // Empty dependency array ensures this runs only once on mount
  
  const imageUrl = `https://i.imgur.com/Lasn8cQ.png`;

  return (
    <section id="home" className="relative grid lg:grid-cols-2 items-center min-h-screen pt-32 pb-20 lg:pt-20 lg:pb-12 overflow-hidden">
      
      {/* Left Column: Text Content */}
      <div className="relative z-10 text-center lg:text-left px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="pop-in">
            <div className="inline-block relative">
                <div className="absolute -top-3 -right-10 transform scale-75 -rotate-12">
                     <HandWaveIcon className="w-12 h-auto animate-subtle-wave" />
                </div>
                <div className="bg-brand-dark-2 border-gray-700 border-2 border-brand-dark rounded-full px-5 py-2 text-md shadow-sm text-white font-medium">
                    Hello!
                </div>
            </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={150}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mt-6 relative">
                I'm <span className="text-brand-blue-500">Abdullah Hasan</span>,<br/>
                <span className="text-3xl sm:text-4xl md:text-5xl min-h-[1.2em] inline-block">
                    {typedTitle}
                    {!isTypingComplete && (
                        <span className="align-bottom inline-block w-[3px] h-[1em] bg-brand-blue-500 animate-blink ml-1"></span>
                    )}
                </span>
            </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={300}>
            <p className="mt-6 text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
              A creative professional with over 6 years of experience, crafting visually stunning designs and impactful video content that captivates audiences and drives results.
            </p>
        </AnimatedSection>
       
        <AnimatedSection delay={450} className="relative z-30 mt-8 flex justify-center lg:justify-start">
            <div className="flex items-center rounded-full p-2 glass-effect gap-2">
                <a href="https://www.behance.net/abdullahhasan1" target="_blank" rel="noopener noreferrer" className="bg-brand-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center hover:bg-brand-blue-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    Portfolio <BehanceIcon className="text-xl ml-2" />
                </a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); onViewWorkClick(); }} className="text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/20 transition-colors whitespace-nowrap">
                    View My Work
                </a>
            </div>
        </AnimatedSection>
      </div>

      {/* Right Column: Image and Stats */}
      <div className="relative h-[60vh] lg:h-full flex items-center justify-center">
          <AnimatedSection animation="fade-in-right" delay={200} className="w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Image */}
                <img 
                    src={imageUrl}
                    alt="Abdullah Hasan" 
                    className="absolute bottom-0 h-[90%] lg:h-full w-auto object-contain z-10" 
                    loading="eager"
                />

                {/* Stat Card */}
                <div className="absolute top-1/4 right-0 sm:right-10 lg:right-0 xl:right-10 z-20">
                    <AnimatedSection animation="pop-in" delay={400} className="bg-brand-dark/50 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20 animate-gentle-bounce">
                        <p className="text-4xl md:text-5xl font-extrabold text-white">6+</p>
                        <p className="text-sm md:text-base text-gray-400 leading-tight">Years<br/>Experience</p>
                    </AnimatedSection>
                </div>
            </div>
          </AnimatedSection>
      </div>

    </section>
  );
};

export default React.memo(Hero);