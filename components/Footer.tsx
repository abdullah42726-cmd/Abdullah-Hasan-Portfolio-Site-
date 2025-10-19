// Fix: Create a functional Footer component to resolve module import errors.
// The original file contained placeholder text and was not a valid React module.
// This new component provides a complete footer with styling consistent with the
// rest of the application, including navigation, contact information, and social media links.
import React from 'react';
import Logo from './icons/Logo';

const SocialIcon: React.FC<{ children: React.ReactNode, href: string, label: string }> = ({ children, href, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={label}>
    {children}
  </a>
);

const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.083.606 1.889 2.364 3.268 4.456 3.306-1.784 1.398-4.041 2.23-6.49 2.23-.42 0-.834-.025-1.24-.073 2.304 1.479 5.047 2.344 7.994 2.344 9.59 0 14.84-7.942 14.48-14.843.996-.718 1.86-1.62 2.55-2.65z"/></svg>
);

const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.7c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.7h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const Footer: React.FC = () => {
    const navLinks = [
        { name: 'About', href: '#experience' },
        { name: 'Service', href: '#services' },
        { name: 'Project', href: '#portfolio' },
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
             <a href="#contact" onClick={handleNavClick} className="inline-block bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-brand-blue-600 transition-colors">
                Contact Me
             </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Abdullah Hasan. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <SocialIcon href="https://facebook.com" label="Facebook"><FacebookIcon /></SocialIcon>
            <SocialIcon href="https://twitter.com" label="Twitter"><TwitterIcon /></SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn"><LinkedInIcon /></SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;