import React, { useState, useEffect } from 'react';
import Logo from './icons/Logo';
import { mockUsers } from '../mockData';
import { User } from '../types';

interface SignUpProps {
  onUserRegistered: (user: User) => void;
  onExit: () => void;
  onNavigateToLogin: () => void;
}

type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
};

const SignUp: React.FC<SignUpProps> = ({ onUserRegistered, onExit, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, label: '', color: 'bg-gray-200' });

  const calculatePasswordStrength = (pass: string): PasswordStrength => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    
    const criteria = {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass),
    };
    
    const criteriaMetCount = Object.values(criteria).filter(v => v === true).length;
    
    if (pass.length < 8) {
      return { score: 1, label: 'Weak', color: 'bg-red-500' };
    } else if (criteriaMetCount < 4) {
      return { score: 2, label: 'Medium', color: 'bg-yellow-500' };
    } else if (pass.length < 12) {
      return { score: 3, label: 'Strong', color: 'bg-blue-500' };
    } else {
      return { score: 4, label: 'Very Strong', color: 'bg-green-500' };
    }
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (passwordStrength.score < 2) {
        setError('Password is too weak. Please choose a stronger password.');
        return;
    }

    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser: User = {
        id: Date.now(),
        name,
        email,
        password, // In a real app, this would be hashed
        role: 'user',
        verified: false, // Set verified to false on creation
    };

    mockUsers.push(newUser); // Add to our mock DB
    onUserRegistered(newUser); // Trigger verification flow
  };

  const PasswordStrengthIndicator: React.FC = () => {
    if (password.length === 0) return null;
    const barWidths: { [key: number]: string } = { 0: '0%', 1: '25%', 2: '50%', 3: '75%', 4: '100%'};
    const strengthColorClass = passwordStrength.color.replace('bg-', 'text-');

    return (
        <div className="mt-2 space-y-1">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: barWidths[passwordStrength.score] }}
                ></div>
            </div>
            {passwordStrength.label && (
                <p className={`text-xs font-medium text-right ${strengthColorClass}`}>
                    {passwordStrength.label}
                </p>
            )}
        </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-gray dark:bg-brand-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-brand-dark-2 rounded-lg shadow-lg">
        <div className="text-center">
            <Logo className="h-12 w-auto mx-auto" pathClassName="fill-brand-dark dark:fill-white" />
            <h2 className="mt-6 text-2xl font-bold text-center text-brand-dark dark:text-white">
                Create an Account
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-[-1px]">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name" name="name" type="text" autoComplete="name" required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm dark:bg-brand-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
             <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address" name="email" type="email" autoComplete="email" required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm dark:bg-brand-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">Password</label>
              <input
                id="password" name="password" type="password" autoComplete="new-password" required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm dark:bg-brand-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <PasswordStrengthIndicator />

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue-500 border border-transparent rounded-md group hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
             <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <button onClick={onNavigateToLogin} className="font-medium text-brand-blue-500 hover:text-brand-blue-600">
                    Sign In
                </button>
            </p>
            <button 
              onClick={onExit} 
              className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-blue-500"
            >
              &larr; Back to main site
            </button>
         </div>
      </div>
    </div>
  );
};

export default SignUp;