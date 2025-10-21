import React, { useState, useEffect, useRef } from 'react';
import Logo from './icons/Logo';
import { supabase } from '../supabaseClient';

interface LoginProps {
  onExit: () => void;
  onNavigateToSignUp: () => void;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 30;

const Login: React.FC<LoginProps> = ({ onExit, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  const timerRef = useRef<number | null>(null);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;
    
    setLoading(true);
    setError('');

    // FIX: Corrected Supabase signIn call.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message === 'Email not confirmed') {
        setError('Please verify your email before logging in.');
      } else if (error.message === 'Invalid login credentials') {
        const newAttemptCount = failedAttempts + 1;
        setFailedAttempts(newAttemptCount);
        if (newAttemptCount >= MAX_ATTEMPTS) {
          setError(`Too many failed attempts. Please try again in ${LOCKOUT_DURATION_SECONDS} seconds.`);
          setIsLockedOut(true);
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttemptCount} attempts remaining.`);
        }
      } else {
          setError(error.message);
      }
    } else {
      // Success is handled by the onAuthStateChange listener in App.tsx
      setFailedAttempts(0);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-gray dark:bg-brand-dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-brand-dark-2 rounded-lg shadow-lg">
        <div className="text-center">
            <Logo className="h-12 w-auto mx-auto" pathClassName="fill-brand-dark dark:fill-white" />
            <h2 className="mt-6 text-2xl font-bold text-center text-brand-dark dark:text-white">
                Welcome Back
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm dark:bg-brand-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${isLockedOut || loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLockedOut || loading}
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
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 focus:z-10 sm:text-sm dark:bg-brand-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${isLockedOut || loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLockedOut || loading}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLockedOut || loading}
              className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 ${isLockedOut || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue-500 hover:bg-brand-blue-600'}`}
            >
              {loading ? 'Signing in...' : (isLockedOut ? `Try again in ${lockoutTimeLeft}s` : 'Sign in')}
            </button>
          </div>
        </form>
         <div className="text-sm text-center">
            <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <button onClick={onNavigateToSignUp} className="font-medium text-brand-blue-500 hover:text-brand-blue-600">
                    Sign Up
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

export default Login;
