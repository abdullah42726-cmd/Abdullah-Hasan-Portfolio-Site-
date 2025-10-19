import React from 'react';
import StarIcon from './icons/StarIcon';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-dark" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 00-2 0v6a1 1 0 102 0V7zm6 0a1 1 0 00-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
);


const ProjectIdea: React.FC = () => {
  return (
    <section id="contact" className="py-20 text-center">
      <h2 className="text-5xl font-bold">
        Have an Awsome Project <br/> Idea? <span className="text-brand-blue-500">Let's Discuss</span>
      </h2>
      
      <form className="mt-10 max-w-lg mx-auto flex items-center bg-white border border-gray-200 rounded-full p-2 shadow-md">
        <span className="text-brand-blue-500 pl-4 pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </span>
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          className="w-full bg-transparent focus:outline-none text-gray-700"
        />
        <button type="submit" className="bg-brand-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity">
          Send
        </button>
      </form>

      <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
            <StarIcon className="text-yellow-400 w-5 h-5"/>
            <span>4.9/5 Average Ratings</span>
        </div>
        <div className="flex items-center space-x-2">
            <AwardIcon />
            <span>25+ Winning Awards</span>
        </div>
        <div className="flex items-center space-x-2">
            <CheckIcon />
            <span>Certified Product Designer</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectIdea;