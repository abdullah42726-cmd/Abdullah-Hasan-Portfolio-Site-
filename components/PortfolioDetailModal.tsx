import React, { useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({ item, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div 
        ref={modalRef} 
        className="glass-effect relative w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden text-white border border-white/20"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-400">{item.category}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close project details">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          <p className="mb-6 text-gray-300">{item.description}</p>
          {item.liveUrl && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={item.liveUrl}
                title={item.title}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailModal;
