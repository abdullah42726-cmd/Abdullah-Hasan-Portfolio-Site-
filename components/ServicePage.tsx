import React from 'react';
import { Service } from '../types';

interface ServicePageProps {
    service: Service;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
    return (
        <div className="bg-white dark:bg-brand-dark font-sans">
            <div 
                className="h-64 md:h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
            >
                <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center px-4">
                        {service.title}
                    </h1>
                </div>
            </div>

            <main className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <article>
                    <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
                        {/* In a real app, this content might be HTML. For now, we split by newline to create paragraphs. */}
                        {service.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ServicePage;