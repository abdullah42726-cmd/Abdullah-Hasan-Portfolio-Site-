import React, { useState, useEffect, useRef } from 'react';
import Logo from './icons/Logo';
import { mockUsers } from '../mockData'; // Import mock users
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onExit: () => void;
  onNavigateToSignUp: () => void;
}

type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
};

const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_SECONDS = 30;

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onExit, onNavigateToSignUp }) => {
  const [username, setUsername] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, label: '', color: 'bg-gray-200' });
  const timerRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (isLockedOut) {
      setLockoutTimeLeft(LOCKOUT_DURATION_SECONDS);
      timerRef.current = window.setInterval(() => {
        setLockoutTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current as number);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      const lockoutTimeout = setTimeout(() => {
        setIsLockedOut(false);
        setFailedAttempts(0);
        setError('');
      }, LOCKOUT_DURATION_SECONDS * 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        clearTimeout(lockoutTimeout);
      };
    }
  }, [isLockedOut]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    const user = mockUsers.find(
        u => (u.name.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === username.toLowerCase())
    );

    if (user && user.password === password) {
      if (!user.verified) {
        setError('Please verify your email before logging in.');
        return;
      }
      setError('');
      setFailedAttempts(0);
      onLoginSuccess(user);
    } else {
      const newAttemptCount = failedAttempts + 1;
      setFailedAttempts(newAttemptCount);
      if (newAttemptCount >= MAX_ATTEMPTS) {
        setError(`Too many failed attempts. Please try again in ${LOCKOUT_DURATION_SECONDS} seconds.`);
        setIsLockedOut(true);
      } else {
        setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttemptCount} attempts remaining.`);
      }
    }
  };

  const PasswordStrengthIndicator: React.FC = () => {
    if (password.length === 0) return null;
    const barWidths: { [key: number]: string } = { 0: '0%', 1: '25%', 2: '50%', 3: '75%', 4: '100%'};
    const strengthColorClass = passwordStrength.color.replace('bg-', 'text-');

    return (
        <div className="mt-2 space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
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
    <div className="flex items-center justify-center min-h-screen bg-brand-gray">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
            <Logo className="h-12 w-auto mx-auto" pathClassName="fill-brand-dark" />
            <h2 className="mt-6 text-2xl font-bold text-center text-brand-dark">
                Welcome Back
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">Username or Email</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm ${isLockedOut ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLockedOut}
              />
            </div>
            <div>
              <label htmlFor="password"className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm ${isLockedOut ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLockedOut}
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
              disabled={isLockedOut}
              className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 ${isLockedOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue-500 hover:bg-brand-blue-600'}`}
            >
              {isLockedOut ? `Try again in ${lockoutTimeLeft}s` : 'Sign in'}
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
            <p className="text-gray-600">
                Don't have an account?{' '}
                <button onClick={onNavigateToSignUp} className="font-medium text-brand-blue-500 hover:text-brand-blue-600">
                    Sign Up
                </button>
            </p>
            <button 
              onClick={onExit} 
              className="mt-4 text-sm font-medium text-gray-600 hover:text-brand-blue-500"
            >
              &larr; Back to main site
            </button>
         </div>
      </div>
    </div>
  );
};

export default Login;