import React from 'react';
import AnimatedSection from './AnimatedSection';

const Education: React.FC = () => {
  return (
    <section className="py-20 text-left">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white text-center">
          Education
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <AnimatedSection delay={100}>
          <div className="p-8 rounded-lg bg-brand-gray dark:bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
            <h3 className="text-2xl font-bold text-brand-dark dark:text-white">Bachelor in Engineering-CSE</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Northern University Bangladesh</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">2023-2027</p>
            <p className="text-brand-blue-500 font-semibold mt-2">7th Semester Ongoing</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="p-8 rounded-lg bg-brand-gray dark:bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
            <h3 className="text-2xl font-bold text-brand-dark dark:text-white">Diploma in Engineering-CMT</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">TMSS Textile Engineering Institute</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">2016-2020</p>
            <p className="text-brand-blue-500 font-semibold mt-2">CGPA: 3.46 out of 4</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education;