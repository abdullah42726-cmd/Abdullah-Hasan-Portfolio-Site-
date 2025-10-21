import React from 'react';

const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path d="M18 18.5c0 3.03-2.47 5.5-5.5 5.5h-7A5.51 5.51 0 0 1 0 18.5v-7C0 8.47 2.47 6 5.5 6 6.33 6 7 6.67 7 7.5S6.33 9 5.5 9A2.5 2.5 0 0 0 3 11.5v7A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5Zm5-13.45L18.58.46c-.58-.6-1.52-.62-2.12-.04-.6.58-.62 1.52-.04 2.12L19.75 6H13.5A5.51 5.51 0 0 0 8 11.5v5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5A2.5 2.5 0 0 1 13.5 9h6.25l-3.33 3.46a1.5 1.5 0 0 0 2.16 2.08l4.39-4.56c1.37-1.36 1.37-3.59.02-4.93Z"></path>
    </g>
  </svg>
);

export default ExternalLinkIcon;