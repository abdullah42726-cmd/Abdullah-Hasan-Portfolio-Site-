import React, { useState, useEffect } from 'react';
import Logo from './icons/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  // Effect to detect scroll and apply styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to disable body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      setActiveLink(targetId);
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  const leftNavLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
  ];

  const rightNavLinks = [
    { name: 'Resume', href: '#experience' },
    { name: 'Project', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const allNavLinksForMobile = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
    { name: 'Resume', href: '#experience' },
    { name: 'Project', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const getLinkClassName = (href: string) => {
    if (activeLink === href) {
      return 'bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors';
    }
    return 'hover:text-brand-blue-500 transition-colors text-sm font-medium';
  };

  return (
    <header className={`sticky top-0 z-50 py-4 transition-all duration-300 ${isScrolled ? 'bg-white/30 backdrop-blur-lg' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Desktop Navigation --- */}
        <nav className={`hidden md:flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300 ${isScrolled ? 'bg-transparent text-brand-dark shadow-lg border border-white/20' : 'bg-brand-dark text-white'}`}>
          <div className="flex items-center space-x-8">
            {leftNavLinks.map(link => (
              <a key={`${link.name}-${link.href}-left`} href={link.href} onClick={handleNavClick} className={getLinkClassName(link.href)}>
                {link.name}
              </a>
            ))}
          </div>
          <a href="#home" onClick={handleNavClick} aria-label="Go to homepage">
              <Logo className="h-8 w-auto" pathClassName={isScrolled ? 'fill-brand-dark' : 'fill-white'} />
          </a>
          <div className="flex items-center space-x-8">
            {rightNavLinks.map(link => (
              <a key={`${link.name}-${link.href}-right`} href={link.href} onClick={handleNavClick} className={getLinkClassName(link.href)}>
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <nav className={`md:hidden flex items-center justify-between rounded-full px-4 py-2 relative z-50 transition-all duration-300 ${isScrolled ? 'bg-transparent text-brand-dark shadow-lg border border-white/20' : 'bg-brand-dark text-white'}`}>
          <a href="#home" onClick={handleNavClick} className="flex items-center space-x-2 font-bold text-lg">
            <Logo className="h-8 w-auto" pathClassName={isScrolled ? 'fill-brand-dark' : 'fill-white'}/>
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
          </button>
        </nav>
      </div>
      {/* --- Mobile Menu Overlay --- */}
      <div 
        className={`md:hidden fixed inset-0 bg-brand-dark z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {allNavLinksForMobile.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={handleNavClick} 
              className="text-2xl font-semibold py-4 text-white hover:text-brand-blue-500 transition-all duration-300"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;