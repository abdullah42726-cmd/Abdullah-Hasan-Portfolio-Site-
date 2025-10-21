import React, { useState, useEffect, useRef } from 'react';
import Logo from './icons/Logo';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
  specialStyle?: 'whatsapp' | 'resume';
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    if (observer.current) {
        observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setActiveLink(`#${entry.target.id}`);
            }
        });
    }, { 
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0.5
    });

    sections.forEach(section => {
        if (observer.current && section.id) {
            observer.current.observe(section);
        }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
    { name: 'Project', href: '#portfolio' },
    { name: 'Connect', href: '#contact', specialStyle: 'whatsapp' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing', external: true, specialStyle: 'resume' },
  ];

  const getLinkClassName = (href: string) => {
    if (activeLink === href) {
      return 'bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors';
    }
    return 'hover:text-brand-blue-500 transition-colors text-sm font-medium';
  };
  
  const getMobileLinkClassName = (link: NavLink) => {
    if (link.specialStyle === 'whatsapp') return "text-[#25D366] hover:text-[#1DAE52]";
    if (link.specialStyle === 'resume') return "text-brand-blue-200 hover:text-brand-blue-500";
    if (activeLink === link.href) return "text-brand-blue-200";
    
    return "text-white hover:text-brand-blue-500";
  };
  
  const showScrolledState = isScrolled && !isMenuOpen;
  
  const navBarClassName = `rounded-full px-4 py-2 transition-all duration-300 flex items-center`;
  const navBarScrolledStyles = 'text-brand-dark dark:text-white glass-effect';
  const navBarTopStyles = 'bg-brand-dark text-white';
  
  const renderDesktopLink = (link: NavLink) => {
    const baseClasses = 'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:-translate-y-0.5';

    if (link.specialStyle === 'whatsapp') {
      return (
        <a 
          key={`${link.name}-desktop`} 
          href={link.href} 
          onClick={handleNavClick}
          className={`${baseClasses} bg-[#25D366] hover:bg-[#1DAE52] text-white`}>
          <WhatsAppIcon className="w-5 h-5" />
          {link.name}
        </a>
      );
    }
    
    if (link.specialStyle === 'resume') {
       return (
        <a 
          key={`${link.name}-desktop`} 
          href={link.href} 
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} bg-brand-blue-500 hover:bg-brand-blue-600 text-white`}>
          {link.name}
          <ExternalLinkIcon className="w-5 h-5" />
        </a>
      );
    }

    return (
       <a 
        key={`${link.name}-desktop`} 
        href={link.href} 
        onClick={handleNavClick}
        className={getLinkClassName(link.href)}>
        {link.name}
      </a>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 py-4 animate-fade-in-down">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Desktop Navigation --- */}
        <nav className={`hidden md:flex justify-between items-center ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
          <a href="#home" onClick={handleNavClick} aria-label="Go to homepage">
              <Logo className="h-8 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark dark:fill-white' : 'fill-white'} />
          </a>
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
                {navLinks.map(renderDesktopLink)}
            </div>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <div className="md:hidden">
            <nav className={`relative z-50 justify-between ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
                <a href="#home" onClick={handleNavClick} className="flex items-center space-x-2 font-bold text-lg">
                    <Logo className="h-8 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark dark:fill-white' : 'fill-white'}/>
                </a>
                <div className="flex items-center">
                  <ThemeToggle />
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
                      {isMenuOpen ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                      )}
                  </button>
                </div>
            </nav>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <div 
        className={`md:hidden fixed inset-0 bg-brand-dark z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={link.external ? () => setIsMenuOpen(false) : handleNavClick} 
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`text-3xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${getMobileLinkClassName(link)}`}
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMenuOpen ? `${index * 70}ms` : '0ms'
              }}
            >
              {link.specialStyle === 'whatsapp' && <WhatsAppIcon className="w-7 h-7" />}
              {link.name}
              {link.specialStyle === 'resume' && <ExternalLinkIcon className="w-7 h-7" />}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;