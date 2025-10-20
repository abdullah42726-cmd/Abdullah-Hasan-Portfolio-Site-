import React, { useState, useEffect, useRef } from 'react';

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
                // Fix: Removed 'triggerOnce' property as it's not a valid IntersectionObserverInit option.
                // The "trigger once" functionality is handled by `observer.unobserve()` above.
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
         <section id="skills" className="py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-5xl font-bold mb-6">
                       <span className="text-brand-dark">My Professional</span> <span className="text-brand-blue-500">Skillset</span>
                     </h2>
                     <p className="text-gray-500 mt-6 max-w-md">
                        I specialize in a comprehensive suite of design and editing tools, enabling me to bring creative visions to life with precision and flair. My expertise spans across the entire design process, from initial concept to final polished product.
                     </p>
                </div>
                <div ref={skillsRef}>
                    {skillsData.map((skill) => (
                        <AnimatedSkillBar key={skill.name} name={skill.name} level={skill.level} isVisible={isVisible} />
                    ))}
                </div>
            </div>
         </section>
    );
};

export default Skills;