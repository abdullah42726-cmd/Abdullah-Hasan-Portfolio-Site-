import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutMe: React.FC = () => {
  return (
    <section className="py-20">
      <div className="grid lg:grid-cols-1 gap-16 items-center">
        <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white text-center lg:text-left">
              About Me
            </h2>
            <div className="w-24 h-1 bg-brand-blue-500 mx-auto lg:mx-0 mt-4 mb-8"></div>
            <p className="max-w-3xl mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-400 text-left leading-relaxed">
              Creative professional with <strong>5+ years</strong> of experience in <strong>graphic design, video editing,</strong> and <strong>UI/UX design</strong>. Skilled in <strong>Adobe Creative Cloud, Figma,</strong> and <strong>DaVinci Resolve</strong>, I create visually impactful content that enhances user engagement and drives business growth through innovative design solutions and high-quality visuals.
            </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default React.memo(AboutMe);