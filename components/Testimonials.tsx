import React from 'react';
import StarIcon from './icons/StarIcon';

const TestimonialCard: React.FC<{ name: string; role: string; text: string; avatarUrl: string }> = ({ name, role, text, avatarUrl }) => (
    <div className="bg-brand-dark-2 rounded-3xl p-8 relative">
        <span className="text-8xl text-gray-700 font-serif absolute top-4 left-4 opacity-50">“</span>
        <div className="relative z-10">
            <div className="flex items-center mb-4">
                <img src={avatarUrl} alt={name} className="w-14 h-14 rounded-full mr-4 border-2 border-brand-blue-500 object-cover"/>
                <div>
                    <h4 className="font-bold text-lg">{name}</h4>
                    <p className="text-sm text-gray-400">{role}</p>
                </div>
            </div>
            <div className="flex text-yellow-400 mb-4">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                <span className="text-white ml-2">5.0</span>
            </div>
            <p className="text-gray-400">
                {text}
            </p>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-brand-dark text-white rounded-t-3xl p-12 my-20">
        <div className="max-w-screen-xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-5xl font-bold">Testimonials That <br/> Speak to My Results</h2>
                <p className="text-gray-400 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum egestas lobortis.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <TestimonialCard 
                    name="James Rodriguez"
                    role="CEO, Lirante"
                    avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum."
                />
                <TestimonialCard 
                    name="Maria Garcia"
                    role="Project Manager, Sugee"
                    avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum."
                />
                <TestimonialCard 
                    name="David Smith"
                    role="Lead Developer, Cinetstox"
                    avatarUrl="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum."
                />
            </div>
        </div>
    </section>
  );
};

export default Testimonials;