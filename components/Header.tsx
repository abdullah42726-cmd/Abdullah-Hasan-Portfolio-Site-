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
    onNavHomeClick: () => void;
    onNavPortfolioClick: () => void;
    isHomePage: boolean;
}

const mainNavLinks: NavLink[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Projects', href: '#projects' },
];

const Header: React.FC<HeaderProps> = ({ onNavHomeClick, onNavPortfolioClick, isHomePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const observer = useRef<IntersectionObserver | null>(null);
  const activeLinkRef = useRef(activeLink);

  // Fix: Corrected the type of `navRef` from `useRef<HTMLElement>` to `useRef<HTMLDivElement>` to match the `div` element it is attached to, resolving the TypeScript type mismatch error.
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<React.RefObject<HTMLAnchorElement>[]>(
    mainNavLinks.map(() => React.createRef())
  );
  const [capsuleStyle, setCapsuleStyle] = useState({});

  useEffect(() => {
    activeLinkRef.current = activeLink;
  }, [activeLink]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const calculateCapsuleStyle = useCallback(() => {
    if (!isHomePage) {
        setCapsuleStyle({ opacity: 0, transform: 'scale(0.5)' });
        return;
    }
    const activeLinkIndex = mainNavLinks.findIndex(link => link.href === activeLink);
    const activeLinkDomElement = linkRefs.current[activeLinkIndex]?.current;

    if (activeLinkDomElement) {
        setCapsuleStyle({
            left: `${activeLinkDomElement.offsetLeft}px`,
            width: `${activeLinkDomElement.offsetWidth}px`,
            opacity: 1,
            transform: 'scale(1)',
        });
    } else {
        setCapsuleStyle({ opacity: 0, transform: 'scale(0.5)' });
    }
  }, [activeLink, isHomePage]);

  useEffect(() => {
    calculateCapsuleStyle();
    window.addEventListener('resize', calculateCapsuleStyle);
    return () => window.removeEventListener('resize', calculateCapsuleStyle);
  }, [calculateCapsuleStyle]);


  useEffect(() => {
    if (observer.current) {
        observer.current.disconnect();
    }
    
    if (!isHomePage) return;

    const sections = Array.from(document.querySelectorAll('section[id]'));
    const sectionIdsInOrder = sections.map(s => `#${s.id}`);
    const visibleSections = new Map<string, IntersectionObserverEntry>();
    
    observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleSections.set(`#${entry.target.id}`, entry);
            } else {
                visibleSections.delete(`#${entry.target.id}`);
            }
        });
        
        let lastVisibleSectionId = '';
        for (let i = sectionIdsInOrder.length - 1; i >= 0; i--) {
            if (visibleSections.has(sectionIdsInOrder[i])) {
                lastVisibleSectionId = sectionIdsInOrder[i];
                break;
            }
        }

        if (lastVisibleSectionId && activeLinkRef.current !== lastVisibleSectionId) {
             setActiveLink(lastVisibleSectionId);
        } else if (visibleSections.size === 0 && window.scrollY < 200) {
            if(activeLinkRef.current !== '#home'){
                setActiveLink('#home');
            }
        }

    }, { 
        rootMargin: '-80px 0px -40% 0px',
        threshold: 0
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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (link.href === '#projects') {
        onNavPortfolioClick();
        return;
    }

    if (!isHomePage) {
        onNavHomeClick();
    }
    
    setTimeout(() => {
        const targetElement = document.querySelector(link.href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        } else if (link.href === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setActiveLink(link.href);
    }, isHomePage ? 0 : 150);

  }, [isHomePage, onNavHomeClick, onNavPortfolioClick]);
  
  const allMobileLinks: NavLink[] = [
    ...mainNavLinks,
    { name: 'Connect', href: '#contact' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1HqozSuhNjKC7O-Bxl0RkTX_ReeNV39Oh/view?usp=sharing', external: true, specialStyle: 'resume' },
  ];

  const getDesktopLinkClassName = () => {
    return 'relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-full text-white hover:bg-white/10';
  };

  const getMobileLinkClassName = (link: NavLink) => {
    if (link.href === '#contact') return "text-white bg-[#25D366] px-6 py-2 rounded-full";
    if (link.specialStyle === 'resume') return "text-brand-blue-200 hover:text-brand-blue-500";
    if (activeLink === link.href && isHomePage) return "text-brand-blue-200";
    return "text-white hover:text-brand-blue-500";
  };
  
  const scrolledStyles = 'glass-effect';
  
  return (
    <>
      {/* --- Desktop Header --- */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
            <a href="#home" onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}>
                <Logo className="h-10 w-auto" pathClassName="fill-white" />
            </a>
            <nav className="glass-effect rounded-full p-2 flex items-center gap-1">
                <div ref={navRef} className="relative flex items-center gap-1">
                    <span
                      className="absolute top-0 h-full bg-brand-blue-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      style={capsuleStyle}
                      aria-hidden="true"
                    />
                    {mainNavLinks.map((link, index) => (
                        <a 
                            key={link.name}
                            ref={linkRefs.current[index]}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className={`${getDesktopLinkClassName()} ${activeLink === link.href && isHomePage ? 'text-white' : 'text-white'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
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
      
      {/* --- Mobile Header --- */}
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