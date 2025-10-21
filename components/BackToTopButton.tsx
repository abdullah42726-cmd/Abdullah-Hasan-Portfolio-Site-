import React, { useState, useEffect } from 'react';
import ArrowUpIcon from './icons/ArrowUpIcon';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 bg-brand-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Go to top"
      title="Go to top"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

export default BackToTopButton;
