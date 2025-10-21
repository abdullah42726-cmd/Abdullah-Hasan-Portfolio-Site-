import React from 'react';
import AnimatedSection from './AnimatedSection';

const VolunteerIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 64 64" 
        className="h-6 w-6 text-red-500 flex-shrink-0 mr-4 mt-1"
        fill="currentColor"
    >
        <g>
            <path d="M18.73 27.68c.73-1.31 2.11-2.2 3.71-2.2.83 0 1.61.25 2.27.67v-1.36c0-1.68.98-3.12 2.38-3.82V11.9c0-1.26-1.02-2.29-2.28-2.29s-2.27 1.03-2.27 2.29v10.13c0 .55-.45 1-1 1s-1-.45-1-1V6.93c0-1.27-1.02-2.3-2.27-2.3s-2.28 1.03-2.28 2.3v15.1c0 .55-.45 1-1 1s-1-.45-1-1V9.53c0-1.26-1.02-2.29-2.27-2.29S9.44 8.27 9.44 9.53v13.79c.31.67.58 1.15.76 1.44 1.52.02 5.67.33 8.53 2.92zM61.45 16.76c-.4-.43-.97-.69-1.54-.66-.9.02-1.7.63-1.93 1.49-.49 1.81-1.03 3.22-1.5 4.26l-.01.01c-.74 1.65-1.33 2.4-1.37 2.45-.2.25-.51.4-.83.37-.37-.01-9.03-.35-9.8 6.82-.05.55-.54.95-1.1.89a1 1 0 0 1-.88-1.1c.73-6.87 7.35-8.62 11.26-8.62h.05c.18-.29.45-.77.76-1.43V7.45c0-1.26-1.02-2.29-2.28-2.29s-2.27 1.03-2.27 2.29v12.5c0 .55-.45 1-1 1s-1-.45-1-1V4.85c0-1.27-1.02-2.3-2.28-2.3s-2.27 1.03-2.27 2.3v15.1c0 .55-.45 1-1 1s-1-.45-1-1V9.82c0-1.26-1.02-2.29-2.27-2.29s-2.28 1.03-2.28 2.29v13.54c1.68.58 2.9 2.16 2.9 4.04v8.5c.71-1.1 1.95-1.83 3.32-1.85 1.12.01 2.26.46 3.04 1.31.79.85 1.18 2.01 1.06 3.17l-.06.64c-.28 2.92-.7 7.34-3.31 10.94-.3.41-.59.81-.87 1.19-1.84 2.46-3.05 4.09-3.08 7.32v2.83h14.75V38.67c.03-3.9 1.55-5.94 3.47-8.52.28-.37.57-.76.86-1.16 2.29-3.16 2.66-7.09 2.94-9.95l.06-.66c.06-.6-.13-1.17-.54-1.62z" opacity="1"></path>
            <path d="M42.24 48.93c2.29-3.15 2.66-7.08 2.94-9.95l.06-.65c.06-.6-.13-1.18-.54-1.62-.4-.43-.93-.68-1.54-.66-.9.02-1.69.63-1.93 1.49-.49 1.81-1.03 3.21-1.5 4.26 0 0 0 .01-.01.01-.74 1.64-1.33 2.4-1.37 2.45-.2.25-.51.4-.83.37-.37-.01-9.03-.35-9.8 6.82-.05.55-.54.94-1.1.89-.54-.06-.94-.56-.88-1.1.73-6.87 7.35-8.62 11.26-8.62h.05c.18-.3.45-.77.76-1.43V27.4c0-1.26-1.02-2.29-2.28-2.29s-2.27 1.03-2.27 2.29v12.49c0 .56-.45 1-1 1s-1-.44-1-1v-15.1c0-1.26-1.02-2.29-2.28-2.29s-2.27 1.03-2.27 2.29v15.1c0 .56-.45 1-1 1s-1-.44-1-1V29.77c0-1.26-1.02-2.29-2.27-2.29s-2.28 1.03-2.28 2.29v14.54c0 3.21.74 6.43 2.12 9.32.06.14.1.29.1.44v7.38h15.53v-2.83c.03-3.9 1.55-5.94 3.47-8.52.28-.37.57-.76.86-1.17zM18.16 29.99v-.02c-2.68-3.44-8.36-3.21-8.42-3.21a.987.987 0 0 1-.83-.37c-.04-.05-.63-.8-1.37-2.44l-.01-.02c-.47-1.04-1.01-2.45-1.5-4.26C5.8 18.81 5 18.2 4.1 18.18c-.57-.02-1.14.23-1.54.66-.41.45-.6 1.02-.54 1.62l.06.66c.28 2.86.65 6.79 2.94 9.95.29.4.58.79.86 1.16 1.92 2.58 3.44 4.62 3.47 8.51v20.71h11.04v-7.16a23.71 23.71 0 0 1-2.22-9.98V29.99z" opacity="1"></path>
        </g>
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
    <div className="text-left">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white text-center">
          Volunteer Experience
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <div className="max-w-4xl mx-auto p-8 rounded-lg bg-brand-gray dark:bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300">
        <AnimatedSection>
            <div className="flex items-start">
                <VolunteerIcon />
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
    </div>
  );
};

export default VolunteerExperience;