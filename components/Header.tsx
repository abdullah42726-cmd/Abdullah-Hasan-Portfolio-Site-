import React, { useState, useEffect, useRef, useCallback } from 'react';
import Logo from './icons/Logo';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
  specialStyle?: 'whatsapp' | 'resume';
}

interface HeaderProps {
    onNavigate: (page: 'home' | 'portfolio') => void;
    currentPage: 'home' | 'portfolio';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
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
    if (observer.current) {
        observer.current.disconnect();
    }

    if (currentPage === 'portfolio') {
        setActiveLink('#portfolio-page');
        return; 
    }

    // Get sections in DOM order to determine which is "last" on the page
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const sectionIdsInOrder = sections.map(s => `#${s.id}`);

    // Keep track of which sections are currently visible in the viewport
    const visibleSections = new Map<string, IntersectionObserverEntry>();
    
    observer.current = new IntersectionObserver((entries) => {
        // Update the map of visible sections based on intersection changes
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleSections.set(`#${entry.target.id}`, entry);
            } else {
                visibleSections.delete(`#${entry.target.id}`);
            }
        });
        
        // Determine the active link by finding the last section in the DOM
        // that is currently visible.
        let lastVisibleSectionId = '';
        // Iterate backwards through the ordered list of section IDs
        for (let i = sectionIdsInOrder.length - 1; i >= 0; i--) {
            if (visibleSections.has(sectionIdsInOrder[i])) {
                lastVisibleSectionId = sectionIdsInOrder[i];
                break; // Found the last visible section
            }
        }

        // Only update state if the active link has changed
        if (lastVisibleSectionId && activeLink !== lastVisibleSectionId) {
             setActiveLink(lastVisibleSectionId);
        } else if (visibleSections.size === 0 && window.scrollY < 200) {
            // Fallback for being at the top of the page
            setActiveLink('#home');
        }

    }, { 
        // Define an observation area in the top half of the viewport.
        // A section is "intersecting" if it enters this area.
        // -80px top margin accounts for the fixed header height.
        rootMargin: '-80px 0px -40% 0px',
        threshold: 0 // Trigger as soon as any part of the section enters the area
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
  }, [currentPage, activeLink]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Set active link immediately for instant feedback
    setActiveLink(link.href);

    if (link.href === '#home') {
      onNavigate('home');
      setTimeout(() => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }), 0);
      return;
    }

    if (link.href === '#portfolio-page') {
      onNavigate('portfolio');
      return;
    }
    
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    } else {
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage, onNavigate]);
  
  const mainNavLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Projects', href: '#projects' },
  ];

  const allMobileLinks: NavLink[] = [
    ...mainNavLinks,
    { name: 'Connect', href: '#contact' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing', external: true, specialStyle: 'resume' },
  ];

  const getDesktopLinkClassName = (href: string) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium transition-colors';
    if (activeLink === href) {
      return `bg-brand-blue-500 text-white rounded-full ${baseClasses}`;
    }
    return `text-white hover:bg-white/10 rounded-md ${baseClasses}`;
  };

  const getMobileLinkClassName = (link: NavLink) => {
    if (link.href === '#contact') return "text-white bg-[#25D366] px-6 py-2 rounded-full";
    if (link.specialStyle === 'resume') return "text-brand-blue-200 hover:text-brand-blue-500";
    if (activeLink === link.href) return "text-brand-blue-200";
    return "text-white hover:text-brand-blue-500";
  };
  
  const scrolledStyles = 'glass-effect';
  
  return (
    <>
      {/* --- Desktop Header (Logo Left, Capsule Menu Right) --- */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            {/* Left side: Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}>
                <Logo className="h-10 w-auto" pathClassName="fill-white" />
            </a>
            {/* Right side: Navigation Menu */}
            <nav className="glass-effect rounded-full p-2 flex items-center gap-1">
                {mainNavLinks.map(link => (
                    <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link)} className={getDesktopLinkClassName(link.href)}>
                        {link.name}
                    </a>
                ))}
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                <div className="flex items-center space-x-1">
                    <a 
                        href="https://wa.me/8801725796895"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:text-[#1DAE52] p-2 rounded-full transition-colors flex items-center"
                        aria-label="Chat on WhatsApp"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                    </a>
                    <a 
                        href='https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing'
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-brand-blue-500 p-2 rounded-full transition-colors flex items-center text-sm font-medium whitespace-nowrap"
                    >
                        Resume <ExternalLinkIcon className="w-4 h-4 ml-1.5" />
                    </a>
                </div>
            </nav>
        </div>
      </header>
      
      {/* --- Mobile Header (Full Width Bar) --- */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? scrolledStyles : ''}`}>
        <div className="flex items-center justify-between h-20 px-4">
          <a href="#home" onClick={(e) => handleNavClick(e, {name: 'Home', href: '#home'})}>
             <Logo className="h-9 w-auto" pathClassName={'fill-white'} />
          </a>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="z-50 relative p-2"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[2px]' : ''}`}></div>
            <div className={`w-6 h-0.5 mt-1.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-brand-dark bg-opacity-95 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
        <nav className="flex flex-col items-center h-full space-y-6 text-xl font-bold overflow-y-auto pt-24 pb-8">
          {allMobileLinks.map(link => (
            link.external ? (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={`flex items-center ${getMobileLinkClassName(link)}`}>
                {link.name} <ExternalLinkIcon className="w-5 h-5 ml-2"/>
              </a>
            ) : (
               <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link)} className={getMobileLinkClassName(link)}>
                {link.name}
              </a>
            )
          ))}
        </nav>
      </div>
    </>
  );
};

export default React.memo(Header);