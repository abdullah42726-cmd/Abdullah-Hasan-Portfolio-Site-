import React from 'react';
import Logo from './icons/Logo';

interface VerificationPageProps {
  user: { email: string, name: string };
  onExit: () => void;
  onNavigateToLogin: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ user, onExit, onNavigateToLogin }) => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gray dark:bg-brand-dark">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-brand-dark-2 rounded-lg shadow-lg text-center">
                <Logo className="h-12 w-auto mx-auto" pathClassName="fill-brand-dark dark:fill-white" />
                
                <h2 className="mt-6 text-2xl font-bold text-brand-dark dark:text-white">
                    Almost there, {user.name}!
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    We've sent a verification link to <span className="font-semibold text-brand-dark dark:text-white">{user.email}</span>.
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Please check your inbox and click the link to activate your account. Once verified, you can log in.
                </p>
                <div className="mt-8">
                    <button
                        onClick={onNavigateToLogin}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue-500 border border-transparent rounded-md hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                    >
                        Go to Login Page
                    </button>
                </div>

                 <button 
                    onClick={onExit} 
                    className="mt-6 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-blue-500"
                    >
                    &larr; Back to main site
                </button>
            </div>
        </div>
    );
};

export default VerificationPage;