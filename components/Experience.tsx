import React from 'react';

// Sub-component for a single experience entry
interface ExperienceItemProps {
  company: string;
  duration: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  isLast?: boolean;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, duration, role, description, isCurrent = false, isLast = false, index }) => {
  // Determine if the content should be on the left or right of the timeline for desktop
  const isLeftOfTimeline = index % 2 === 0;

  const contentBlock = (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-brand-dark">{company}</h3>
      <p className="text-sm md:text-base text-gray-500 mt-1 mb-2">{duration}</p>
      <h4 className="text-xl md:text-2xl font-bold text-brand-dark mt-4">{role}</h4>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );

  return (
    <div className="relative">
      {/* --- Mobile Layout --- */}
      <div className="md:hidden flex items-start pb-8">
        <div className="flex flex-col items-center mr-4 mt-1 flex-shrink-0">
          <div className={`w-6 h-6 rounded-full ${isCurrent ? 'bg-brand-dark' : 'bg-brand-blue-500'} border-4 border-white ring-2 ring-gray-200 z-10`}></div>
          {!isLast && <div className="flex-grow w-px bg-gray-300 border-l-2 border-dashed border-gray-300"></div>}
        </div>
        <div>{contentBlock}</div>
      </div>

      {/* --- Desktop Layout --- */}
      <div className="hidden md:flex items-start pb-16 relative">
        {/* The Dot on the central timeline */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1 z-10">
          <div className={`w-6 h-6 rounded-full ${isCurrent ? 'bg-brand-dark' : 'bg-brand-blue-500'} border-4 border-white ring-2 ring-gray-200`}></div>
        </div>

        {/* This container uses flex to create two columns around the central line */}
        <div className="flex w-full">
          {/* Left Column */}
          <div className={`w-1/2 ${!isLeftOfTimeline ? 'pr-8 text-right' : ''}`}>
            {!isLeftOfTimeline && contentBlock}
          </div>

          {/* Right Column */}
          <div className={`w-1/2 ${isLeftOfTimeline ? 'pl-8 text-left' : ''}`}>
            {isLeftOfTimeline && contentBlock}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Experience component
const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Cognizant, Mumbai",
      duration: "Sep 2016 - July 2020",
      role: "Experience Designer",
      description: "Crafted intuitive user experiences and visually compelling interfaces for diverse corporate clients, translating complex requirements into elegant and effective design solutions.",
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
    },
  ];

  return (
    <section id="experience" className="py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="text-brand-dark">My Work</span> <span className="text-brand-blue-500">Experience</span>
      </h2>
      {/* Container for the timeline */}
      <div className="relative">
        {/* The central timeline bar for desktop, drawn behind the items */}
        <div className="hidden md:block absolute left-1/2 top-3 bottom-8 w-px -translate-x-1/2 bg-gray-300 border-l-2 border-dashed border-gray-300"></div>
        
        <div>
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.company}
              {...exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;