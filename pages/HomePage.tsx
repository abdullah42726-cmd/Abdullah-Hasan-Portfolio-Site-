import React from 'react';
import Hero from '../components/Hero';
import LogoCloud from '../components/LogoCloud';
import Services from '../components/Services';
import Experience from '../components/Experience';
import WhyHireMe from '../components/WhyHireMe';
import Skills from '../components/Skills';
import ProjectIdea from '../components/ProjectIdea';
import Marquee from '../components/Marquee';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import AwardsAndAchievements from '../components/AwardsAndAchievements';
import VolunteerExperience from '../components/VolunteerExperience';
import AboutMe from '../components/AboutMe';
import Portfolio from '../components/Portfolio';
import { Service } from '../types';

interface HomePageProps {
    services: Service[];
    onServiceClick: (service: Service) => void;
    onViewWorkClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ services, onServiceClick, onViewWorkClick }) => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <Hero onViewWorkClick={onViewWorkClick} />
                <section id="about" className="scroll-mt-20 my-20">
                    <AboutMe />
                    <Experience />
                    <Skills />
                    <section className="py-20">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                        <Education />
                        <Certifications />
                        </div>
                    </section>
                    <section className="py-20">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                        <AwardsAndAchievements />
                        <VolunteerExperience />
                        </div>
                    </section>
                    <div className="why-hire-me-wrapper">
                        <WhyHireMe />
                    </div>
                </section>
                <Services services={services} onServiceClick={onServiceClick} />
                <Portfolio />
                <LogoCloud />
            </div>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProjectIdea />
            </div>
            <Marquee />
        </>
    );
};

export default HomePage;