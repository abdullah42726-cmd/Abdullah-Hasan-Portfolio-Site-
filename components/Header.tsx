import React, { useState, useEffect, useRef } from 'react';
import Logo from './icons/Logo';

// Fix: Add NavLink interface to ensure type safety for navigation links.
// This resolves TypeScript errors where the 'external' property was not recognized
// on all link objects, especially when combining different link arrays.
interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const observer = useRef<IntersectionObserver | null>(null);

  // Effect to detect scroll for header background changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect for active link highlighting on scroll (Scrollspy)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    if (observer.current) {
        observer.current.disconnect();
    }

    // This sets the active link when a section is centered in the viewport
    observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setActiveLink(`#${entry.target.id}`);
            }
        });
    }, { 
        // Sets the "viewport" for checking intersection to be a horizontal line in the middle of the screen
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

  // Effect to disable body scroll when the mobile menu is open
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

  const leftNavLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
  ];

  const rightNavLinks: NavLink[] = [
    { name: 'Resume', href: 'https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing', external: true },
    { name: 'Project', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const allNavLinksForMobile: NavLink[] = [...leftNavLinks, ...rightNavLinks];

  const getLinkClassName = (href: string) => {
    if (activeLink === href) {
      return 'bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors';
    }
    return 'hover:text-brand-blue-500 transition-colors text-sm font-medium';
  };
  
  const getMobileLinkClassName = (href: string) => {
    if (activeLink === href) {
        return "text-brand-blue-200";
    }
    return "text-white hover:text-brand-blue-500";
  };
  
  // Scrolled state should not apply when mobile menu is open for a cleaner look
  const showScrolledState = isScrolled && !isMenuOpen;
  
  const navBarClassName = `rounded-full px-4 py-2 transition-all duration-300 flex items-center`;
  const navBarScrolledStyles = 'bg-white/80 backdrop-blur-lg text-brand-dark shadow-lg border border-white/20';
  const navBarTopStyles = 'bg-brand-dark text-white';

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Desktop Navigation --- */}
        <nav className={`hidden md:flex justify-between ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
          <div className="flex items-center space-x-8">
            {leftNavLinks.map(link => (
              <a key={`${link.name}-${link.href}-left`} href={link.href} onClick={handleNavClick} className={getLinkClassName(link.href)}>
                {link.name}
              </a>
            ))}
          </div>
          <a href="#home" onClick={handleNavClick} aria-label="Go to homepage">
              <Logo className="h-8 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark' : 'fill-white'} />
          </a>
          <div className="flex items-center space-x-8">
            {rightNavLinks.map(link => (
              <a 
                key={`${link.name}-${link.href}-right`} 
                href={link.href} 
                onClick={link.external ? undefined : handleNavClick}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={getLinkClassName(link.href)}>
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <div className="md:hidden">
            <nav className={`relative z-50 justify-between ${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
                <a href="#home" onClick={handleNavClick} className="flex items-center space-x-2 font-bold text-lg">
                    <Logo className="h-8 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark' : 'fill-white'}/>
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
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {allNavLinksForMobile.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={link.external ? () => setIsMenuOpen(false) : handleNavClick} 
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`text-3xl font-semibold transition-all duration-300 ${getMobileLinkClassName(link.href)}`}
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isMenuOpen ? `${index * 70}ms` : '0ms'
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