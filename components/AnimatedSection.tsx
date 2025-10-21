import React, { useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Fix: Added 'pop-in' to AnimationType to support its usage in Hero and Experience components.
type AnimationType = 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'pop-in';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number; // in ms
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', animation = 'fade-in-up', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1, triggerOnce: true });

  const animationClass = `animate-${animation}`;

  return (
    <div
      ref={ref}
      className={`${className} animate-on-scroll ${isVisible ? animationClass : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;