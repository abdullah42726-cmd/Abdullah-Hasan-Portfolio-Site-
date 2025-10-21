import React from 'react';
import AnimatedSection from './AnimatedSection';

const projectsData = [
    {
        title: "Medical Content Design",
        description: "Developed 1000+ social media posts and 400+ videos for medical professionals, improving engagement and brand visibility.",
        tools: "Adobe Photoshop, Illustrator, After Effects, Premiere Pro, Davinci Resolve, Capcut PC"
    },
    {
        title: "UI/UX Design for Web Application",
        description: "Work with UI/UX designer for in-house software, optimizing user flow and enhancing usability, resulting in a 5% reduction in user drop-off. (As per company data)",
        tools: "Figma, Adobe XD."
    },
    {
        title: "E-Commerce Website Design (FARA IT Fusion)",
        description: "Designed UI/UX for an e-commerce platform, improving conversion rates by 10% with user-friendly interface and responsive design.",
        tools: "Figma"
    },
    {
        title: "Xpert Phone Repair Website Design (Ongoing Project)",
        description: "Designed and developed <a href='https://xpertphonerepair.com' target='_blank' rel='noopener noreferrer' class='text-brand-blue-500 hover:underline'>xpertphonerepair.com</a> on WordPress, creating a responsive, user-friendly site that showcases phone repair services and products.",
        tools: "WordPress, Elementor, Figma"
    }
];

const PlayIcon = () => (
    <svg className="w-5 h-5 text-brand-blue-500 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
);

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-brand-dark dark:text-white">
                    Projects
                </h2>
                <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto space-y-12">
                {projectsData.map((project, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                        <div className="bg-brand-gray dark:bg-brand-dark-2 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="flex items-center text-2xl font-bold text-brand-dark dark:text-white mb-4">
                                <PlayIcon />
                                {project.title}
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4 pl-8">
                                <li dangerouslySetInnerHTML={{ __html: project.description }} />
                            </ul>
                            <p className="text-gray-700 dark:text-gray-300 pl-8">
                                <strong className="font-semibold">Tools used:</strong> {project.tools}
                            </p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </section>
    );
};

export default React.memo(Projects);