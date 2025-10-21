// Fix: Create a functional Footer component to resolve module import errors.
// The original file contained placeholder text and was not a valid React module.
// This new component provides a complete footer with styling consistent with the
// rest of the application, including navigation, contact information, and social media links.
import React from 'react';
import Logo from './icons/Logo';
import AnimatedSection from './AnimatedSection';

const SocialIcon: React.FC<{ children: React.ReactNode, href: string, label: string }> = ({ children, href, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={label}>
    {children}
  </a>
);

const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);

const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.7h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const BehanceIcon = () => (
    <i className="fi fi-brands-behance text-2xl" aria-hidden="true"></i>
);

const Footer: React.FC = () => {
    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Service', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

  return (
    <footer className="bg-brand-dark text-white">
      <AnimatedSection>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Logo and description */}
          <div className="space-y-4">
            <a href="#home" onClick={handleNavClick} aria-label="Back to home">
              <Logo className="h-12 w-auto" pathClassName="fill-white" />
            </a>
            <p className="text-gray-400 text-sm max-w-xs">
              Creative Graphics Designer & Video Editor crafting visually stunning and impactful digital experiences.
            </p>
          </div>
          
          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a href={link.href} onClick={handleNavClick} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
             <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
             <p className="text-gray-400 text-sm mb-4">Have a project in mind? Let's talk!</p>
             <div className="flex space-x-6 mt-6">
                <SocialIcon href="https://www.facebook.com/ahasand" label="Facebook"><FacebookIcon /></SocialIcon>
                <SocialIcon href="https://www.instagram.com/abdullah_hasan_d/" label="Instagram"><InstagramIcon /></SocialIcon>
                <SocialIcon href="https://www.linkedin.com/in/abdullahhasan42726/" label="LinkedIn"><LinkedInIcon /></SocialIcon>
                <SocialIcon href="https://www.behance.net/abdullahhasan1" label="Behance"><BehanceIcon /></SocialIcon>
              </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Abdullah Hasan. All Rights Reserved.
          </p>
        </div>
      </div>
      </AnimatedSection>
    </footer>
  );
};

export default Footer;