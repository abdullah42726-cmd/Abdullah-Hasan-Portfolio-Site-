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

    const sections = document.querySelectorAll('section[id]');
    
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
  }, [currentPage]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsMenuOpen(false);

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
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Portfolio', href: '#portfolio-page' },
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

  const DesktopNav: React.FC = () => (
    <nav className="hidden lg:flex items-center space-x-2">
      <div className={`${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
        {navLinks.filter(l => !l.specialStyle).map(link => (
          <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link)} className={getLinkClassName(link.href)}>
            {link.name}
          </a>
        ))}
      </div>
      <div className={`${navBarClassName} ${showScrolledState ? navBarScrolledStyles : navBarTopStyles}`}>
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
          className="hover:text-brand-blue-500 p-2 rounded-full transition-colors flex items-center text-sm font-medium"
        >
          Resume <ExternalLinkIcon className="w-4 h-4 ml-1.5" />
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );

  const MobileNav: React.FC = () => (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="z-50 relative"
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
      >
        <div className={`w-6 h-0.5 ${isScrolled || isMenuOpen ? 'bg-brand-dark dark:bg-white' : 'bg-white'} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[2px]' : ''}`}></div>
        <div className={`w-6 h-0.5 ${isScrolled || isMenuOpen ? 'bg-brand-dark dark:bg-white' : 'bg-white'} mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></div>
      </button>

      {/* Fullscreen Overlay */}
      <div className={`fixed inset-0 bg-brand-dark bg-opacity-95 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold">
          {navLinks.map(link => (
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
           <div className="absolute bottom-10">
                <ThemeToggle />
            </div>
        </nav>
      </div>
    </div>
  );

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between w-full">
         <a href="#home" onClick={(e) => handleNavClick(e, {name: 'Home', href: '#home'})} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${showScrolledState ? '' : 'lg:-translate-x-[calc(100%+20px)]'}`}>
             <Logo className="h-10 w-auto" pathClassName={showScrolledState ? 'fill-brand-dark dark:fill-white' : 'fill-white'} />
        </a>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;