import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { User, Post, Comment, PortfolioItem, Service } from './types';
import { mockPostsData, mockUsers, mockPortfolioData, mockServicesData } from './mockData';

// Reverted from lazy-loading to direct imports
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
import PortfolioPage from './components/PortfolioPage';
import ServicePage from './components/ServicePage';

type View = 'site' | 'login' | 'signup' | 'dashboard' | 'pendingVerification' | 'portfolioPage';

const App: React.FC = () => {
  const [view, setView] = useState<View>('site');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPostsData);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(mockPortfolioData);
  const [services, setServices] = useState<Service[]>(mockServicesData);
  const [userToVerify, setUserToVerify] = useState<User | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

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
  
  useEffect(() => {
    if (scrollToSection) {
      const targetElement = document.querySelector(scrollToSection);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setScrollToSection(null); // Reset after scrolling
    }
  }, [scrollToSection]);

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
    setActiveService(null);
  };
  
  const showLoginPage = () => {
    setActivePost(null);
    setActiveService(null);
    if (currentUser?.role === 'admin') {
      setView('dashboard');
    } else {
      setView('login');
    }
  };
  
  const handlePostSelect = (postId: number) => {
      const post = posts.find(p => p.id === postId);
      if(post) {
        setActivePost(post);
        setActiveService(null);
      }
  };

  const handleServiceSelect = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if(service) {
      setActiveService(service);
      setActivePost(null);
    }
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
  
  const handleBackToHome = (targetId?: string) => {
      setActivePost(null);
      setActiveService(null);
      setView('site');
      if (targetId && targetId.startsWith('#')) {
        setScrollToSection(targetId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  const handleViewAllPortfolio = () => {
    setActivePost(null);
    setActiveService(null);
    setView('portfolioPage');
  };

  const handleSavePost = (postToSave: Post) => {
    if (postToSave.id) {
        setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
    } else {
        const newPost = { ...postToSave, id: Date.now() };
        setPosts([newPost, ...posts]);
    }
  };

  const handleDeletePost = (postId: number) => {
      setPosts(posts.filter(p => p.id !== postId));
  };

  const handleSavePortfolioItem = (itemToSave: PortfolioItem) => {
      if (itemToSave.id) {
          setPortfolioItems(portfolioItems.map(i => i.id === itemToSave.id ? itemToSave : i));
      } else {
          const newItem = { ...itemToSave, id: Date.now() };
          setPortfolioItems([newItem, ...portfolioItems]);
      }
  };

  const handleDeletePortfolioItem = (itemId: number) => {
      setPortfolioItems(portfolioItems.filter(i => i.id !== itemId));
  };
  
  const handleSaveService = (serviceToSave: Service) => {
    if (serviceToSave.id) {
        setServices(services.map(s => s.id === serviceToSave.id ? serviceToSave : s));
    } else {
        const newService = { ...serviceToSave, id: Date.now() };
        setServices([newService, ...services]);
    }
  };

  const handleDeleteService = (serviceId: number) => {
      setServices(services.filter(s => s.id !== serviceId));
  };


  const renderContent = () => {
    if (view === 'dashboard' && currentUser?.role === 'admin') {
      return <Dashboard
                onLogout={handleLogout}
                posts={posts}
                portfolioItems={portfolioItems}
                services={services}
                onSavePost={handleSavePost}
                onDeletePost={handleDeletePost}
                onSavePortfolioItem={handleSavePortfolioItem}
                onDeletePortfolioItem={handleDeletePortfolioItem}
                onSaveService={handleSaveService}
                onDeleteService={handleDeleteService}
            />;
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
        return <BlogPostPage post={activePost} currentUser={currentUser} onAddComment={handleAddComment} />;
    }
    
    if (activeService) {
        return <ServicePage service={activeService} />;
    }
    
    if (view === 'portfolioPage') {
        return <PortfolioPage items={portfolioItems} />;
    }

    // Default view: Site homepage
    return (
      <>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Experience />
          <WhyHireMe />
          <Skills />
          <Services services={services} onServiceSelect={handleServiceSelect} />
          <Portfolio items={portfolioItems} onSeeAll={handleViewAllPortfolio} />
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
      </>
    );
  };
  
  const isHomePage = view === 'site' && !activePost && !activeService;
  const showGlobalLayout = view === 'site' || view === 'portfolioPage' || !!activePost || !!activeService;

  return (
    <div className="bg-white dark:bg-brand-dark font-sans transition-colors duration-300">
      {showGlobalLayout && (
        <Header 
          onLogout={handleLogout} 
          currentUser={currentUser} 
          onNavigateHome={handleBackToHome}
          isHomePage={isHomePage}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {renderContent()}

      {showGlobalLayout && (
        <>
          <Footer 
            onDashboardClick={showLoginPage}
            onNavigateHome={handleBackToHome}
            isHomePage={isHomePage}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <BackToTopButton />
        </>
      )}
    </div>
  );
};

export default App;