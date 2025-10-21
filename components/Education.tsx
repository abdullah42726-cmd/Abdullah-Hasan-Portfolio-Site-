import React from 'react';
import AnimatedSection from './AnimatedSection';

const Education: React.FC = () => {
  const educationHistory = [
    {
      degree: "Bachelor in Engineering-CSE",
      institution: "Northern University Bangladesh",
      session: "2023-2027",
      status: "7th Semester Ongoing",
    },
    {
      degree: "Diploma in Engineering-CMT",
      institution: "TMSS Textile Engineering Institute",
      session: "2016-2020",
      status: "CGPA: 3.46 out of 4",
    },
    {
      degree: "SSC (Science)",
      institution: "Kuptala Adarsha High School",
      session: "Passing Year: 2016",
      status: "GPA: 4.87 out of 5",
    },
    {
      degree: "JSC (General)",
      institution: "Kuptala Adarsha High School",
      session: "Passing Year: 2013",
      status: "GPA: 4.72 out of 5",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          Education
        </h2>
        <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
      </AnimatedSection>

      <AnimatedSection delay={100} className="flex-grow">
        <div className="p-8 rounded-lg bg-brand-dark-2 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          <div className="space-y-6">
            {educationHistory.map((edu, index) => (
              <div key={edu.degree}>
                <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                <p className="text-gray-400 mt-2">{edu.institution}</p>
                <p className="text-gray-500 text-sm mt-1">{edu.session}</p>
                <p className="text-brand-blue-500 font-semibold mt-2">{edu.status}</p>
                {index < educationHistory.length - 1 && (
                  <hr className="border-t border-gray-700 my-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Education;