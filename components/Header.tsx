import React, { useState, useEffect, useRef } from 'react';
import Logo from './icons/Logo';
import { User } from '../types';
import ResumeArrowIcon from './icons/ResumeArrowIcon';

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  onLogout: () => void;
  currentUser: User | null;
  onNavigateHome: (targetId?: string) => void;
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, currentUser, onNavigateHome, isHomePage }) => {
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
    // Only set up observer if on the homepage where sections exist
    if (!isHomePage) return;

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
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, external?: boolean) => {
    if (external) {
      if (isMenuOpen) setIsMenuOpen(false);
      return;
    }
    
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');

    if (isHomePage) {
      handleScrollToSection(e);
    } else {
      onNavigateHome(targetId || undefined);
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing', external: true },
  ];

  const getLinkClassName = (link: NavLink) => {
    const isResume = link.name === 'Resume';
    const isActive = isHomePage && activeLink === link.href;

    if (isResume) {
        return 'bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-x-2';
    }
    if (isActive) {
      return 'bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors';
    }
    return 'hover:text-brand-blue-500 transition-colors text-sm font-medium';
  };
  
  const getMobileLinkClassName = (link: NavLink) => {
    const isResume = link.name === 'Resume';
    const isActive = isHomePage && activeLink === link.href;

    if (isActive || isResume) {
        return "text-brand-blue-200";
    }
    return "text-white hover:text-brand-blue-500";
  };
  
  const showScrolledState = isScrolled && !isMenuOpen;
  
  const navBarClassName = `rounded-full px-4 py-2 transition-all duration-300 flex items-center`;
  const navBarScrolledStyles = 'text-brand-dark glass-effect';
  const navBarTopStyles = 'bg-brand-dark text-white';
  
  const authButtonBaseClasses = 'px-5 py-2 rounded-full text-sm font-medium transition-colors ml-4';
  const getAuthButtonClassName = () => {
    if (showScrolledState) {
        return `${authButtonBaseClasses} bg-brand-dark/5 hover:bg-brand-dark/10 text-brand-dark border border-brand-dark/20`;
    }
    return `${authButtonBaseClasses} bg-white/10 hover:bg-white/20 text-white`;
  };

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Desktop Navigation --- */}
        <nav className={`hidden md:flex justify-between items-center ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
          <a href="#home" onClick={(e) => handleLinkClick(e)} aria-label="Go to homepage">
              <Logo className="h-10 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark' : 'fill-white'} />
          </a>
          <div className="flex items-center">
            <div className="flex items-center space-x-8">
                {navLinks.map(link => (
                  <a 
                    key={`${link.name}-${link.href}-desktop`} 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.external)}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={getLinkClassName(link)}>
                    <span>{link.name}</span>
                    {link.name === 'Resume' && <ResumeArrowIcon className="w-4 h-4" />}
                  </a>
                ))}
            </div>
            {currentUser && (
              <div className="flex items-center ml-4">
                <span className={`text-sm font-medium mr-4 ${showScrolledState ? 'text-brand-dark' : 'text-white'}`}>Hi, {currentUser.name}</span>
                <button onClick={onLogout} className={getAuthButtonClassName()}>Logout</button>
              </div>
            )}
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <div className="md:hidden">
            <nav className={`relative z-50 justify-between ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
                <a href="#home" onClick={(e) => handleLinkClick(e)} className="flex items-center space-x-2 font-bold text-lg">
                    <Logo className="h-10 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark' : 'fill-white'}/>
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
              onClick={(e) => handleLinkClick(e, link.external)} 
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`text-3xl font-semibold transition-all duration-300 flex items-center gap-x-3 ${getMobileLinkClassName(link)}`}
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMenuOpen ? `${index * 70}ms` : '0ms'
              }}
            >
              <span>{link.name}</span>
              {link.name === 'Resume' && <ResumeArrowIcon className="w-7 h-7" />}
            </a>
          ))}
          {currentUser && (
              <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onLogout(); setIsMenuOpen(false); }}
                  className="text-3xl font-semibold text-white hover:text-brand-blue-500 transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: isMenuOpen ? `${navLinks.length * 70}ms` : '0ms'
                  }}
              >
                  Logout
              </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;