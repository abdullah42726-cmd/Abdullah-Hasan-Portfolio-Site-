import React from 'react';
import AnimatedSection from './AnimatedSection';

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 flex-shrink-0 mr-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3,2.24C10.74,1.8,10,1.06,10,1.06s-.74.74-1.3,1.18c-1.2,1-3.6,2.2-3.6,5.26,0,2.3,1.3,3.8,1.3,3.8s-3.7,1.8-3.7,4.7c0,2.3,2,3,2,3h10s2-.7,2-3c0-2.9-3.7-4.7-3.7-4.7s1.3-1.5,1.3-3.8c0-3.06-2.4-4.26-3.6-5.26Z" clipRule="evenodd" />
    </svg>
);

const AwardsAndAchievements: React.FC = () => {
  return (
    <section className="py-20 text-left">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white text-center">
          Awards and Achievements
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-brand-gray dark:bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300">
        <AnimatedSection>
            <div className="flex items-start">
                <TrophyIcon/>
                <div>
                    <h3 className="text-2xl font-bold text-brand-dark dark:text-white">Employee of the month for 3 months</h3>
                    <p className="text-gray-600 dark:text-gray-400">Renssoft Solution Ltd.</p>
                    <ul className="list-disc list-inside mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                        <li>For March (2022), July (2023), February (2024)</li>
                    </ul>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AwardsAndAchievements;