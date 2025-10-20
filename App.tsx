import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import Services from './components/Services';
import Experience from './components/Experience';
import WhyHireMe from './components/WhyHireMe';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ProjectIdea from './components/ProjectIdea';
import Marquee from './components/Marquee';
import Blog from './components/Blog';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BlogPostPage from './components/BlogPostPage';
import VerificationPage from './components/VerificationPage';
import { User, Post, Comment } from './types';
import { mockPostsData, mockUsers } from './mockData';


type View = 'site' | 'login' | 'signup' | 'dashboard' | 'pendingVerification';

const App: React.FC = () => {
  const [view, setView] = useState<View>('site');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPostsData);
  const [userToVerify, setUserToVerify] = useState<User | null>(null);

  // Check for logged in user in localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (user.role === 'admin') {
      setView('dashboard');
    } else {
      setView('site');
    }
  };

  const handleUserRegistered = (user: User) => {
    setUserToVerify(user);
    setView('pendingVerification');
  };
  
  const handleVerificationSuccess = () => {
      if (userToVerify) {
        // In a real app, you'd get this from your backend.
        // Here we mutate the mock data directly.
        const userInDb = mockUsers.find(u => u.id === userToVerify.id);
        if (userInDb) {
            userInDb.verified = true;
        }
        setUserToVerify(null);
        setView('login');
        // You might want a success message on the login page
      }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setView('site');
    setActivePost(null);
  };
  
  const showLoginPage = () => {
    setActivePost(null);
    if (currentUser?.role === 'admin') {
      setView('dashboard');
    } else {
      setView('login');
    }
  };
  
  const handlePostSelect = (postId: number) => {
      const post = posts.find(p => p.id === postId);
      if(post) setActivePost(post);
  };
  
  const handleAddComment = (postId: number, commentText: string) => {
      if (!currentUser) return;
      
      const newComment: Comment = {
          id: Date.now(),
          author: currentUser.name,
          date: new Date().toISOString().split('T')[0],
          text: commentText,
      };
      
      const updatedPosts = posts.map(p => {
          if (p.id === postId) {
              return { ...p, comments: [newComment, ...(p.comments || [])] };
          }
          return p;
      });
      
      setPosts(updatedPosts);
      
      // Also update the active post state if it's the one being commented on
      if(activePost && activePost.id === postId) {
          setActivePost(prev => prev ? { ...prev, comments: [newComment, ...(prev.comments || [])]} : null);
      }
  };
  
  const handleBackToHome = () => {
      setActivePost(null);
      setView('site');
  }

  const renderContent = () => {
    if (view === 'dashboard' && currentUser?.role === 'admin') {
      return <Dashboard onLogout={handleLogout} />;
    }
    
    if (view === 'login') {
      return <Login onLoginSuccess={handleLoginSuccess} onExit={handleBackToHome} onNavigateToSignUp={() => setView('signup')} />;
    }

    if (view === 'signup') {
      return <SignUp onUserRegistered={handleUserRegistered} onExit={handleBackToHome} onNavigateToLogin={() => setView('login')} />;
    }
    
    if (view === 'pendingVerification' && userToVerify) {
        return <VerificationPage user={userToVerify} onVerify={handleVerificationSuccess} onExit={handleBackToHome} onNavigateToLogin={() => setView('login')} />;
    }

    if (activePost) {
        return <BlogPostPage post={activePost} currentUser={currentUser} onAddComment={handleAddComment} onBack={handleBackToHome} />;
    }

    return (
      <>
        <Header onLoginClick={showLoginPage} onLogout={handleLogout} currentUser={currentUser} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Experience />
          <WhyHireMe />
          <Skills />
          <Services />
          <Portfolio />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <LogoCloud />
        </div>
        <Testimonials />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectIdea />
        </div>
        <div className="overflow-hidden">
          <Marquee />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Blog posts={posts} onPostSelect={handlePostSelect} />
        </div>
        <Footer onDashboardClick={showLoginPage} />
        <BackToTopButton />
      </>
    );
  };

  return (
    <div className="bg-white font-sans">
      {renderContent()}
    </div>
  );
};

export default App;