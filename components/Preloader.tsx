import React from 'react';
import Logo from './icons/Logo';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <div 
      className={`fixed inset-0 bg-brand-dark z-[200] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
    >
      <div className="animate-logo-pulse">
        <Logo className="h-20 w-auto" pathClassName="fill-white" />
      </div>
    </div>
  );
};

export default Preloader;
