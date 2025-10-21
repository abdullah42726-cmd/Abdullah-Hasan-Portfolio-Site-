import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import Services from './components/Services';
import Experience from './components/Experience';
import WhyHireMe from './components/WhyHireMe';
import Skills from './components/Skills';
import PortfolioPage from './components/PortfolioPage';
import Testimonials from './components/Testimonials';
import ProjectIdea from './components/ProjectIdea';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Education from './components/Education';
import Certifications from './components/Certifications';
import AwardsAndAchievements from './components/AwardsAndAchievements';
import VolunteerExperience from './components/VolunteerExperience';
import { PortfolioItem } from './types';
import { mockPortfolioData } from './mockData';
import { ThemeProvider } from './contexts/ThemeContext';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';

const PortfolioDetailModal: React.FC<{ item: PortfolioItem | null; onClose: () => void; }> = ({ item, onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (item) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4" style={{ animation: 'fade-in-up 0.3s ease-out forwards' }}>
      <div ref={modalContentRef} className="bg-white dark:bg-brand-dark-2 rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-bold text-brand-dark dark:text-white truncate pr-4">{item.title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <div className="flex-grow bg-gray-100 dark:bg-brand-dark">
          {item.liveUrl ? (
            <iframe src={item.liveUrl} title={item.title} className="w-full h-full border-0" />
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center h-full">
              <h4 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">No Live Preview Available</h4>
              <p>Here is the project image instead.</p>
              <img src={item.imageUrl} alt={item.title} className="mt-6 max-h-[60vh] object-contain rounded-lg shadow-md"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [portfolioItems] = useState<PortfolioItem[]>(mockPortfolioData);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [page, setPage] = useState<'home' | 'portfolio'>('home');

  const handleViewProject = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
  };

  const handleCloseModal = () => {
    setSelectedPortfolioItem(null);
  };

  const handleNavigateToPortfolio = useCallback(() => {
    setPage('portfolio');
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <ThemeProvider>
      <div className="font-sans">
          <Header onNavigate={setPage} currentPage={page} />
          
           {page === 'home' ? (
            <>
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <Hero onNavigateToPortfolio={handleNavigateToPortfolio} />
                <section id="about" className="scroll-mt-20">
                  <AboutMe />
                  <Experience />
                  <Skills />
                  <Education />
                  <Certifications />
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
          ) : (
             <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
               <PortfolioPage items={portfolioItems} onViewProject={handleViewProject} />
             </div>
          )}


          <Footer />
          <BackToTopButton />

          <PortfolioDetailModal item={selectedPortfolioItem} onClose={handleCloseModal} />
      </div>
    </ThemeProvider>
  );
};

export default App;