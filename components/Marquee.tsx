import React from 'react';

const MarqueeItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex-shrink-0 flex items-center space-x-4 px-8">
        <span className="text-4xl font-bold text-white whitespace-nowrap">{children}</span>
        <span className="text-white text-3xl font-light">✦</span>
    </div>
);

const Marquee: React.FC = () => {
  const items = ['Graphic Design', 'Package Design', 'Video Editing', 'Motion Graphics', 'UI Design', 'UX design', 'User Research'];
  const duplicatedItems = [...items, ...items];

  return (
    <section className="bg-brand-blue-500 py-6 transform -rotate-2 my-20 relative">
      <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-brand-blue-500 to-transparent pointer-events-none"></div>
      <div className="flex flex-nowrap animate-marquee-scroll">
        {duplicatedItems.map((item, index) => <MarqueeItem key={index}>{item}</MarqueeItem>)}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-brand-blue-500 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Marquee;