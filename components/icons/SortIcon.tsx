import React from 'react';

interface SortIconProps {
  className?: string;
  direction?: 'ascending' | 'descending' | null;
}

const SortIcon: React.FC<SortIconProps> = ({ className, direction }) => {
  if (direction === 'ascending') {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (direction === 'descending') {
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  // Default/Unsorted icon
  return (
    <svg className={`${className} opacity-30 group-hover:opacity-100 transition-opacity`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
};

export default SortIcon;