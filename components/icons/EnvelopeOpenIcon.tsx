import React from 'react';

const EnvelopeOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7.45-4.66a2 2 0 012.32 0l7.45 4.66A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M12 12.58l-4.5 3M12 12.58l4.5 3" />
  </svg>
);

export default EnvelopeOpenIcon;
