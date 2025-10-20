import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedSkillBar: React.FC<{ name: string; level: number, isVisible: boolean }> = ({ name, level, isVisible }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium text-brand-dark">{name}</span>
        <span className="text-sm font-medium text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-brand-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: isVisible ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
);


const Skills: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
    const skillsData = [
        { name: "Graphic Design", level: 95 },
        { name: "Video Editing", level: 95 },
        { name: "Motion Graphics", level: 60 },
        { name: "UI/UX Design", level: 80 },
        { name: "Web Design", level: 80 },
    ];

    return (
         <section id="skills" ref={ref} className="py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>
                     <h2 className="text-5xl font-bold mb-6">
                       <span className="text-brand-dark">My Professional</span> <span className="text-brand-blue-500">Skillset</span>
                     </h2>
                     <p className="text-gray-500 mt-6 max-w-md">
                        I specialize in a comprehensive suite of design and editing tools, enabling me to bring creative visions to life with precision and flair. My expertise spans across the entire design process, from initial concept to final polished product.
                     </p>
                </div>
                <div className={`scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{transitionDelay: '200ms'}}>
                    {skillsData.map((skill) => (
                        <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} isVisible={isVisible} />
                    ))}
                </div>
            </div>
         </section>
    );
};

export default Skills;