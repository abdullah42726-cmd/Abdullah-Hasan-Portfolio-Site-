import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white">{children}</a>
);

const Footer: React.FC = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    return (
        <footer className="bg-brand-dark text-white rounded-t-3xl mt-20">
            <div className="max-w-screen-xl mx-auto px-8 py-16">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-5xl font-bold">Lets Connect there</h2>
                    <a href="#contact" onClick={handleNavClick} className="bg-brand-blue-500 text-white px-8 py-3 rounded-full font-semibold flex items-center hover:bg-brand-blue-600 transition-colors">
                        Let's Talk <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-t border-gray-800 pt-12">
                    <div>
                        <div className="flex items-center space-x-2 font-bold text-xl mb-4">
                            <span className="bg-brand-blue-500 text-brand-dark w-8 h-8 flex items-center justify-center rounded-full">A</span>
                            <span>Abdullah Hasan</span>
                        </div>
                        <p className="text-gray-400">Graphics Designer & Video Editor, ready to bring your ideas to life.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Navigation</h4>
                        <nav className="flex flex-col space-y-2">
                            <a href="#experience" onClick={handleNavClick} className="text-gray-400 hover:text-white">About</a>
                            <a href="#services" onClick={handleNavClick} className="text-gray-400 hover:text-white">Service</a>
                            <a href="#portfolio" onClick={handleNavClick} className="text-gray-400 hover:text-white">Portfolio</a>
                            <a href="#contact" onClick={handleNavClick} className="text-gray-400 hover:text-white">Contact</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <p className="text-gray-400">abdullah@example.com</p>
                        <p className="text-gray-400">+123 456 7890</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Follow Me</h4>
                        <div className="flex space-x-4">
                            <SocialIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </SocialIcon>
                             <SocialIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </SocialIcon>
                             <SocialIcon>
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </SocialIcon>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Abdullah Hasan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
