import React, { useState } from 'react';
import Logo from './icons/Logo';
import { User } from '../types';

interface VerificationPageProps {
  user: User;
  onVerify: () => void;
  onExit: () => void;
  onNavigateToLogin: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ user, onVerify, onExit, onNavigateToLogin }) => {
    const [isVerified, setIsVerified] = useState(false);

    const handleVerifyClick = () => {
        onVerify();
        setIsVerified(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gray dark:bg-brand-dark">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-brand-dark-2 rounded-lg shadow-lg text-center">
                <Logo className="h-12 w-auto mx-auto" pathClassName="fill-brand-dark dark:fill-white" />
                
                {!isVerified ? (
                    <>
                        <h2 className="mt-6 text-2xl font-bold text-brand-dark dark:text-white">
                            Almost there, {user.name}!
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            We've sent a verification link to <span className="font-semibold text-brand-dark dark:text-white">{user.email}</span>. Please check your inbox and follow the instructions.
                        </p>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            (For this demo, just click the button below to simulate verifying your email.)
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={handleVerifyClick}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue-500 border border-transparent rounded-md hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                            >
                                Verify My Account
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="mt-6 text-2xl font-bold text-green-600">
                            Success!
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Your account has been successfully verified.
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={onNavigateToLogin}
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue-500 border border-transparent rounded-md hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
                            >
                                Proceed to Login
                            </button>
                        </div>
                    </>
                )}

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