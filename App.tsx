import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import Services from './components/Services';
import Experience from './components/Experience';
import WhyHireMe from './components/WhyHireMe';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ProjectIdea from './components/ProjectIdea';
import Marquee from './components/Marquee';
import Blog from './components/Blog';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Experience />
        <WhyHireMe />
        <Services />
        <Portfolio />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <LogoCloud />
      </div>
      <Testimonials />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectIdea />
      </div>
      <div className="overflow-hidden">
        <Marquee />
      </div>
       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Blog />
      </div>
      <Footer />
    </div>
  );
};

export default App;