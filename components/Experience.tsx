import React from 'react';
import AnimatedSection from './AnimatedSection';

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
    <div className="about-glass-effect p-5 md:p-6 rounded-2xl h-full">
      <h3 className="text-xl md:text-2xl font-bold text-white">{company}</h3>
      <p className="text-sm md:text-base text-gray-400 mt-1 mb-2">{duration}</p>
      <h4 className="text-xl md:text-2xl font-bold text-white mt-4">{role}</h4>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );

  return (
      <div className="relative">
        {/* --- Mobile Layout --- */}
        <div className="md:hidden flex items-start pb-8">
          <AnimatedSection delay={100} className="flex-shrink-0">
            <div className="flex flex-col items-center mr-4 mt-1">
              <div className={`w-6 h-6 rounded-full ${isCurrent ? 'bg-white' : 'bg-brand-blue-500'} border-4 border-brand-dark ring-2 ring-gray-700 z-10`}></div>
              {!isLast && <div className="flex-grow w-px bg-gray-700 border-l-2 border-dashed border-gray-700"></div>}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>{contentBlock}</AnimatedSection>
        </div>

        {/* --- Desktop Layout --- */}
        <div className="hidden md:flex items-start pb-16 relative">
          {/* The Dot on the central timeline */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1 z-10">
             <AnimatedSection animation="pop-in" delay={100}>
                <div className={`w-6 h-6 rounded-full ${isCurrent ? 'bg-white' : 'bg-brand-blue-500'} border-4 border-brand-dark ring-2 ring-gray-700`}></div>
             </AnimatedSection>
          </div>

          {/* This container uses flex to create two columns around the central line */}
          <div className="flex w-full">
            {/* Left Column */}
            <AnimatedSection animation="fade-in-right" delay={200} className={`w-1/2 ${!isLeftOfTimeline ? 'pr-8 text-right' : ''}`}>
              {!isLeftOfTimeline && contentBlock}
            </AnimatedSection>

            {/* Right Column */}
            <AnimatedSection animation="fade-in-left" delay={200} className={`w-1/2 ${isLeftOfTimeline ? 'pl-8 text-left' : ''}`}>
              {isLeftOfTimeline && contentBlock}
            </AnimatedSection>
          </div>
        </div>
      </div>
  );
};

// Main Experience component
const Experience: React.FC = () => {
  const experiences = [
    {
      company: "Anthony Young Garments LTD, Gazipur",
      duration: "May 2020 - April 2021",
      role: "Junior Executive Graphic Designer",
      description: "Designed 20+ T-shirt graphics and mockups for product visualization. Performed precise clipping path work to enhance garment images for marketing. Examined 50+ design samples to ensure quality and consistency with production standards.",
    },
    {
      company: "FARA IT Fusion, Dhaka",
      duration: "May 2021 - Dec 2021",
      role: "Executive Creative Designer",
      description: "Created 20+ UI wireframes to streamline website development and user flow. Designed 50+ social media posts, ensuring impactful and engaging visuals. Enhanced low-quality client graphics into high-resolution assets, clipping path and vector conversions.",
    },
    {
      company: "Professional Bangladesh Community Manager, Bogura Sadar",
      duration: "Nov 2021 - Apr 2022",
      role: "Creative Designer (Remote: Part-time)",
      description: "Designed 100+ static posts, banners, and event covers to engage the community. Created 20+ video intros and motion graphics to enhance community visibility. Developed branded merchandise, including stickers, T-shirts, and mugs, for community events.",
    },
    {
      company: "Renssoft Solution Ltd, Dhaka",
      duration: "Jan 2022 - Present",
      role: "Executive Graphic Designer & video Editor",
      description: "Designed 2,000+ static social media posts and 500+ videos. Created 10+ UI/UX designs for in-house software, websites, and apps, enhancing user experience. Tailored engaging content for medical professionals, contributing to a 5% company growth. Edited and refined video productions, ensuring top-notch quality across all projects.",
      isCurrent: true,
    },
  ];

  return (
    <section className="py-20 text-center">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          <span className="text-white">My Work</span> <span className="text-brand-blue-500">Experience</span>
        </h2>
      </AnimatedSection>
      {/* Container for the timeline */}
      <div className="relative">
        {/* The central timeline bar for desktop, drawn behind the items */}
        <div className="hidden md:block absolute left-1/2 top-3 bottom-8 w-px -translate-x-1/2 bg-gray-700 border-l-2 border-dashed border-gray-700"></div>
        
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

export default React.memo(Experience);