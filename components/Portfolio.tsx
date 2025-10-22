import React from 'react';
import AnimatedSection from './AnimatedSection';

const PlayIcon = () => (
    <svg className="w-5 h-5 text-brand-blue-500 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
);

interface ProjectItemProps {
  title: string;
  description: React.ReactNode;
  tools: string;
  delay: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, description, tools, delay }) => (
    <AnimatedSection delay={delay}>
        <div className="bg-brand-dark-2 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="flex items-center text-2xl font-bold text-white mb-4">
                <PlayIcon />
                {title}
            </h3>
            <div className="list-disc list-inside space-y-2 text-gray-400 mb-4 pl-8">
                {description}
            </div>
            <p className="text-gray-300 pl-8">
                <strong className="font-semibold">Tools used:</strong> {tools}
            </p>
        </div>
    </AnimatedSection>
);

const Portfolio: React.FC = () => {
    const projects = [
        {
            title: "Velour Valencie Website Design and Development (Ongoing Project)",
            description: (
                <ul>
                    <li>
                        Designed and developed the e-commerce website for <a href="https://velourvalencie.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue-500 hover:underline">velourvalencie.com</a>, a premium leather goods brand, focusing on a luxury user experience and showcasing high-quality products.
                    </li>
                </ul>
            ),
            tools: "WordPress, Elementor, Figma"
        },
        {
            title: "Xpert Phone Repair Website Design (Ongoing Project)",
            description: (
                <ul>
                    <li>
                        Designed and developed <a href="https://xpertphonerepair.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue-500 hover:underline">xpertphonerepair.com</a> on WordPress, creating a responsive, user-friendly site that showcases phone repair services and products.
                    </li>
                </ul>
            ),
            tools: "WordPress, Elementor, Figma"
        },
        {
            title: "Medical Content Design",
            description: (
                <ul>
                    <li>
                        Developed 1000+ social media posts and 400+ videos for medical professionals, improving engagement and brand visibility.
                    </li>
                </ul>
            ),
            tools: "Adobe Photoshop, Illustrator, After Effects, Premiere Pro, Davinci Resolve, Capcut PC"
        },
        {
            title: "UI/UX Design for Web Application",
            description: (
                <ul>
                    <li>
                        Work with UI/UX designer for in-house software, optimizing user flow and enhancing usability, resulting in a 5% reduction in user drop-off. (As per company data)
                    </li>
                </ul>
            ),
            tools: "Figma, Adobe XD."
        },
        {
            title: "E-Commerce Website Design (FARA IT Fusion)",
            description: (
                <ul>
                    <li>
                        Designed UI/UX for an e-commerce platform, improving conversion rates by 10% with user-friendly interface and responsive design.
                    </li>
                </ul>
            ),
            tools: "Figma"
        }
    ];

    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Projects</h2>
                <div className="w-24 h-1 bg-brand-blue-500 mx-auto mt-4 mb-12"></div>
            </AnimatedSection>
            <div className="max-w-4xl mx-auto space-y-12">
                {projects.map((project, index) => (
                    <ProjectItem 
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        tools={project.tools}
                        delay={index * 150}
                    />
                ))}
            </div>
        </section>
    );
};

export default Portfolio;