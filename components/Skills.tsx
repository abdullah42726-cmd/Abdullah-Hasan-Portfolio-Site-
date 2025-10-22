import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const AnimatedSkillBar: React.FC<{ name: string; level: number, isVisible: boolean }> = ({ name, level, isVisible }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-brand-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: isVisible ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
);


const Skills: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Check if the element is intersecting
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    // Disconnect the observer once the animation is triggered
                    observer.unobserve(entries[0].target);
                }
            },
            { 
                threshold: 0.2, // Trigger when 20% of the element is visible
            }
        );

        const currentRef = skillsRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const skillsData = [
        { name: "Graphic Design", level: 95 },
        { name: "Video Editing", level: 95 },
        { name: "Motion Graphics", level: 60 },
        { name: "UI/UX Design", level: 80 },
        { name: "Web Design", level: 80 },
    ];

    return (
         <section className="py-20">
            <div className="grid md:grid-cols-2 gap-20 items-center">
                <AnimatedSection animation="fade-in-left">
                     <div className="about-glass-effect p-8 rounded-2xl h-full">
                       <h2 className="text-5xl font-bold mb-6">
                         <span className="text-white">My Professional</span> <span className="text-brand-blue-500">Skillset</span>
                       </h2>
                       <p className="text-gray-400 mt-6 max-w-md">
                          I specialize in a comprehensive suite of design and editing tools, enabling me to bring creative visions to life with precision and flair. My expertise spans across the entire design process, from initial concept to final polished product.
                       </p>
                    </div>
                </AnimatedSection>
                <AnimatedSection animation="fade-in-right" delay={200}>
                    <div ref={skillsRef} className="about-glass-effect p-8 rounded-2xl h-full">
                        {skillsData.map((skill) => (
                            <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} isVisible={isVisible} />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
         </section>
    );
};

export default React.memo(Skills);