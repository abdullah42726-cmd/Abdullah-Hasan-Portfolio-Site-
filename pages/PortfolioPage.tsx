import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import Projects from '../components/Projects';
import { mockPortfolioData } from '../mockData';

interface PortfolioPageProps {
    onBack: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
    return (
        <div className="bg-brand-dark min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32">
                <AnimatedSection animation="fade-in-down">
                    <button 
                      onClick={onBack} 
                      className="flex items-center text-gray-400 hover:text-white mb-8 group transition-colors duration-300"
                      aria-label="Go back to home"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </button>
                </AnimatedSection>
                <Projects items={mockPortfolioData} />
            </div>
        </div>
    );
};

export default PortfolioPage;
