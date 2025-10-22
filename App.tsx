import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import Services from './components/Services';
import Experience from './components/Experience';
import WhyHireMe from './components/WhyHireMe';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import ProjectIdea from './components/ProjectIdea';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Education from './components/Education';
import Certifications from './components/Certifications';
import AwardsAndAchievements from './components/AwardsAndAchievements';
import VolunteerExperience from './components/VolunteerExperience';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This effect runs once on mount to handle the preloader timing.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Preloader will be visible for 2 seconds.

    return () => clearTimeout(timer);
  }, []);
  
  return (
      <div className="font-sans">
          <Preloader isLoading={isLoading} />
          
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} overflow-x-hidden`}>
            <Header />
            
              <>
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Hero />
                  <section id="about" className="scroll-mt-20">
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
                    <WhyHireMe />
                  </section>
                  <Services />
                  <Projects />
                  <LogoCloud />
                </div>
                <Testimonials />
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ProjectIdea />
                </div>
                <Marquee />
              </>
            
            <Footer />
            <BackToTopButton />
        </div>
      </div>
  );
};

export default App;