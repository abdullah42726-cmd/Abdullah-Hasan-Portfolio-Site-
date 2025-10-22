import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import PortfolioPage from './pages/PortfolioPage';
import { Service } from './types';
import { services } from './data/servicesData';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    // This effect runs once on mount to handle the preloader timing.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Preloader will be visible for 2 seconds.

    return () => clearTimeout(timer);
  }, []);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setPage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    if (page !== 'home') {
      setPage('home');
      setSelectedService(null);
    }
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleGoToPortfolio = () => {
    setPage('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <div className="font-sans">
          <Preloader isLoading={isLoading} />
          
          <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} overflow-x-hidden`}>
            <Header onNavHomeClick={handleGoHome} onNavPortfolioClick={handleGoToPortfolio} isHomePage={page === 'home'} />
            <main>
              {page === 'home' && <HomePage services={services} onServiceClick={handleSelectService} onViewWorkClick={handleGoToPortfolio} />}
              {page === 'service' && <ServicePage service={selectedService} allServices={services} onBack={handleGoHome} onServiceSelect={handleSelectService} />}
              {page === 'portfolio' && <PortfolioPage onBack={handleGoHome} />}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
      </div>
  );
};

export default App;