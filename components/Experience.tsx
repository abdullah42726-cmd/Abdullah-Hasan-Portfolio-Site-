import React from 'react';

interface ExperienceItemProps {
  company: string;
  duration: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  isLast?: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, duration, role, description, isCurrent = false, isLast = false }) => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-x-8 items-start">
    <div className="text-right">
      <h3 className="text-2xl font-bold text-brand-dark">{company}</h3>
      <p className="text-gray-500">{duration}</p>
    </div>
    <div className="flex flex-col items-center h-full">
      <div className={`w-6 h-6 rounded-full ${isCurrent ? 'bg-brand-dark' : 'bg-brand-blue-500'} border-4 border-white ring-2 ring-gray-200`}></div>
      {!isLast && <div className="flex-grow w-px bg-gray-300 border-l-2 border-dashed border-gray-300"></div>}
    </div>
    <div className="text-left">
      <h4 className="text-2xl font-bold text-brand-dark">{role}</h4>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  </div>
);

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Cognizant, Mumbai",
      duration: "Sep 2016 - July 2020",
      role: "Experience Designer",
      description: "Crafted intuitive user experiences and visually compelling interfaces for diverse corporate clients, translating complex requirements into elegant and effective design solutions.",
      isCurrent: false,
    },
    {
      company: "Sugee Pvt limited, Mumbai",
      duration: "Sep 2020 - July 2023",
      role: "UI/UX Designer",
      description: "Led the design of user-centric web and mobile applications, focusing on creating seamless workflows and engaging visual designs that elevated the brand's digital presence.",
      isCurrent: true,
    },
    {
      company: "Cinetstox, Mumbai",
      duration: "Sep 2023",
      role: "Lead UX Designer",
      description: "Directed user experience strategy and mentored a design team, driving the creation of innovative and user-friendly products from concept to final launch.",
      isCurrent: false,
    },
  ];

  return (
    <section id="experience" className="py-20 text-center">
      <h2 className="text-5xl font-bold mb-16">
        <span className="text-brand-dark">My Work</span> <span className="text-brand-blue-500">Experience</span>
      </h2>
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.company}
            {...exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;