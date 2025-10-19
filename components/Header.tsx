import React from 'react';

const Header: React.FC = () => {
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

  const navLinks = [
    { name: 'About', href: '#experience' },
    { name: 'Service', href: '#services' },
    { name: 'Resume', href: '#experience' },
    { name: 'Project', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="py-4">
      <nav className="flex items-center justify-between bg-brand-dark text-white rounded-full px-4 py-2">
        <div className="flex items-center space-x-8">
          <a href="#home" onClick={handleNavClick} className="bg-brand-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium">Home</a>
          {navLinks.slice(0, 2).map(link => (
            <a key={link.name} href={link.href} onClick={handleNavClick} className="hover:text-brand-blue-500 transition-colors text-sm font-medium">{link.name}</a>
          ))}
        </div>
        <div className="flex items-center space-x-2 font-bold text-xl">
            <span className="bg-brand-blue-500 text-brand-dark w-8 h-8 flex items-center justify-center rounded-full">A</span>
        </div>
        <div className="flex items-center space-x-8">
          {navLinks.slice(2).map(link => (
            <a key={link.name} href={link.href} onClick={handleNavClick} className="hover:text-brand-blue-500 transition-colors text-sm font-medium">{link.name}</a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;