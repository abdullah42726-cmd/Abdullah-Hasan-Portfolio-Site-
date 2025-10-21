import React, { useState } from 'react';
import Logo from './icons/Logo';
import { supabase } from '../supabaseClient';

interface SignUpProps {
  onUserRegistered: (email: string, name: string) => void;
  onExit: () => void;
  onNavigateToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onUserRegistered, onExit, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // FIX: Corrected Supabase signUp call.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    
    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
        // User created, but needs to verify email.
        onUserRegistered(data.user.email!, data.user.user_metadata.name);
    }
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
                placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue-500 border border-transparent rounded-md group hover:bg-brand-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 disabled:bg-brand-blue-500/50"
            >
              {loading ? 'Signing up...' : 'Sign up'}
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
