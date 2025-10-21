import React from 'react';
import AnimatedSection from './AnimatedSection';

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 flex-shrink-0 mr-4 mt-1" viewBox="0 0 512 512" fill="currentColor">
        <path d="M380.09 469.55a15.04 15.04 0 0 1-14.77 5.68l-38.72-7.37-18.22 35.93A15.003 15.003 0 0 1 295 512h-.05a14.997 14.997 0 0 1-13.37-8.3L256 452.45l-25.58 51.25c-2.53 5.07-7.7 8.28-13.37 8.3H217c-5.65 0-10.82-3.17-13.38-8.21l-18.22-35.93-38.72 7.37a15.001 15.001 0 0 1-14.75-5.67 15.002 15.002 0 0 1-1.5-15.73l34.32-67.69c16.21 34.12 51.02 57.77 91.25 57.77 39.95 0 74.55-23.32 90.91-57.05l34.64 66.93a15.03 15.03 0 0 1-1.46 15.76zM497 0H15C6.72 0 0 6.72 0 15v334c0 8.28 6.72 15 15 15h142.25a100.67 100.67 0 0 1-2.21-21.04C155.04 287.29 200.33 242 256 242s100.96 45.29 100.96 100.96c0 7.21-.76 14.25-2.21 21.04H497c8.28 0 15-6.72 15-15V15c0-8.28-6.72-15-15-15zM176.5 45.87l159 1c8.28 0 15 5.72 15 14 0 8.29-6.72 15-15 15h-159c-8.28 0-15-6.71-15-15 0-8.28 6.72-15 15-15zm159 150h-159c-8.28 0-15-6.71-15-15 0-8.28 6.72-15 15-15h159c8.28 0 15 6.72 15 15 0 8.29-6.72 15-15 15zm77.5-60H99c-8.28 0-15-6.71-15-15 0-8.28 6.72-15 15-15h314c8.28 0 15 6.72 15 15 0 8.29-6.72 15-15 15z"/>
    </svg>
);

const AwardsAndAchievements: React.FC = () => {
  const awards = [
    {
      title: "Employee of the Month - March 2022",
      company: "Renssoft Solution Ltd."
    },
    {
      title: "Employee of the Month - July 2023",
      company: "Renssoft Solution Ltd."
    },
    {
      title: "Employee of the Month - February 2024",
      company: "Renssoft Solution Ltd."
    },
  ];

  return (
    <div className="text-left h-full flex flex-col">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          Awards and Achievements
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <AnimatedSection delay={100} className="flex-grow">
        <div className="max-w-4xl mx-auto p-8 rounded-lg bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
          <ul className="space-y-6">
            {awards.map((award, index) => (
              <li key={index} className="flex items-start">
                <TrophyIcon />
                <div>
                  <h3 className="text-xl font-bold text-white">{award.title}</h3>
                  <p className="text-gray-400">{award.company}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AwardsAndAchievements;