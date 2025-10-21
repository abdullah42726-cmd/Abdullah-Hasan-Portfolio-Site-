import React from 'react';
import AnimatedSection from './AnimatedSection';

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0 mr-4 mt-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);


const VolunteerExperience: React.FC = () => {
    const experiences = [
        {
            title: "Flood Relief Support",
            description: "Assisted in organizing and distributing relief materials to flood-affected areas, providing emergency aid and resources to affected families."
        },
        {
            title: "Street Child Education",
            description: "Contributed to the education and welfare of street children by facilitating learning programs and helping provide basic educational resources."
        },
        {
            title: "Employment Support for Underprivileged",
            description: "Worked to connect unemployed individuals from low-income communities with job opportunities, offering guidance and resources for job placement."
        },
        {
            title: "Blood Donation & Collection",
            description: "Coordinated blood donation drives and assisted in blood collection efforts, contributing to local blood banks and supporting healthcare initiatives."
        }
    ]
  return (
    <section className="py-20 text-left">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white text-center">
          Volunteer Experience
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-brand-gray dark:bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300">
        <AnimatedSection>
            <div className="flex items-start">
                <HeartIcon />
                <div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <h3 className="text-2xl font-bold text-brand-dark dark:text-white">Senior Volenteer At Aims Foundation, Bogura</h3>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-1 sm:mt-0 flex-shrink-0 sm:ml-4">May 2017 – Present</p>
                    </div>
                    
                    <ul className="mt-6 space-y-4">
                        {experiences.map((exp, index) => (
                           <li key={index} className="pl-4 border-l-2 border-brand-blue-500/30">
                               <p className="font-semibold text-brand-dark dark:text-gray-200">{exp.title}: <span className="font-normal text-gray-600 dark:text-gray-400">{exp.description}</span></p>
                           </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VolunteerExperience;