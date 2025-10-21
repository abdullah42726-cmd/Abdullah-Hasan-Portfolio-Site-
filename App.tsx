
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Hero from './components/Hero';
import { User, Post, Comment, PortfolioItem, Service, Message } from './types';

// Component Imports
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

// Helper function to map Supabase data to our component types
const mapFromSupabase = (data: any[]) => data.map(item => ({
    ...item,
    coverImage: item.cover_image,
    imageUrl: item.image_url,
    galleryImages: item.gallery_images,
}));

const App: React.FC = () => {
  const [view, setView] = useState<View>('site');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userToVerify, setUserToVerify] = useState<{email: string; name: string} | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.remove('bg-white', 'bg-brand-dark');
    document.body.classList.add(theme === 'dark' ? 'bg-brand-dark' : 'bg-white');
  }, [theme]);

  // --- Data Fetching ---
  const fetchAllData = async () => {
    try {
        const [postsRes, portfolioRes, servicesRes, messagesRes] = await Promise.all([
            supabase.from('posts').select('*').order('date', { ascending: false }),
            supabase.from('portfolio_items').select('*').order('created_at', { ascending: false }),
            supabase.from('services').select('*').order('created_at', { ascending: false }),
            currentUser?.role === 'admin' ? supabase.from('messages').select('*').order('created_at', { ascending: false }) : Promise.resolve({ data: [], error: null }),
        ]);

        if (postsRes.error) throw postsRes.error;
        if (portfolioRes.error) throw portfolioRes.error;
        if (servicesRes.error) throw servicesRes.error;
        if (messagesRes.error) throw messagesRes.error;

        setPosts(mapFromSupabase(postsRes.data || []));
        setPortfolioItems(mapFromSupabase(portfolioRes.data || []));
        setServices(mapFromSupabase(servicesRes.data || []));
        setMessages((messagesRes.data || []).map(m => ({ ...m, date: m.created_at })));

    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentUser]); // Refetch data when user logs in/out, especially for messages
  
  // --- Authentication ---
  useEffect(() => {
    // FIX: Corrected Supabase auth listener call. The method is on supabase.auth.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user;
        if (user) {
            const userRole = user.email === 'admin@example.com' ? 'admin' : 'user';
            const appUser: User = {
                id: user.id,
                name: user.user_metadata.name || user.email!.split('@')[0],
                email: user.email!,
                role: userRole,
                verified: !!user.email_confirmed_at
            };
            setCurrentUser(appUser);
            // Don't auto-navigate to dashboard on refresh if they were on the site
            if (_event === 'SIGNED_IN' && userRole === 'admin') {
                setView('dashboard');
            }
        } else {
            setCurrentUser(null);
            setView('site'); // Go to site on logout
        }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollToSection) {
      const targetElement = document.querySelector(scrollToSection);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setScrollToSection(null);
    }
  }, [scrollToSection]);

  const handleUserRegistered = (email: string, name: string) => {
    setUserToVerify({ email, name });
    setView('pendingVerification');
  };

  const handleLogout = async () => {
    // FIX: Corrected Supabase signOut call.
    await supabase.auth.signOut();
    setCurrentUser(null);
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
      if(post) setActivePost(post);
  };

  const handleServiceSelect = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if(service) setActiveService(service);
  };
  
  const handleAddComment = async (postId: number, commentText: string) => {
    if (!currentUser) return;
    const { data, error } = await supabase.from('comments').insert({
        post_id: postId,
        author: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        text: commentText,
    }).select();

    if (error) console.error("Error adding comment:", error);
    if (data && activePost) {
      const newComment = data[0];
      setActivePost(prev => prev ? { ...prev, comments: [newComment, ...(prev.comments || [])] } : null);
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

  const handleViewAllPortfolio = () => setView('portfolioPage');

  // --- Dashboard Handlers ---
  const handleSavePost = async (postToSave: Post) => {
    const { id, imageUrl, ...rest } = postToSave;
    const dbPost = { ...rest, image_url: imageUrl };

    const { error } = id
      ? await supabase.from('posts').update(dbPost).eq('id', id)
      : await supabase.from('posts').insert(dbPost);

    if (error) console.error("Error saving post:", error);
    else await fetchAllData();
  };

  const handleDeletePost = async (postId: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) console.error("Error deleting post:", error);
    else setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleSavePortfolioItem = async (itemToSave: PortfolioItem) => {
    const { id, coverImage, galleryImages, ...rest } = itemToSave;
    const dbItem = { ...rest, cover_image: coverImage, gallery_images: galleryImages };
    
    const { error } = id
      ? await supabase.from('portfolio_items').update(dbItem).eq('id', id)
      : await supabase.from('portfolio_items').insert(dbItem);
        
    if (error) console.error("Error saving portfolio item:", error);
    else await fetchAllData();
  };

  const handleDeletePortfolioItem = async (itemId: number) => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', itemId);
    if (error) console.error("Error deleting portfolio item:", error);
    else setPortfolioItems(prev => prev.filter(i => i.id !== itemId));
  };
  
  const handleSaveService = async (serviceToSave: Service) => {
    const { id, imageUrl, ...rest } = serviceToSave;
    const dbService = { ...rest, image_url: imageUrl };
    
    const { error } = id
      ? await supabase.from('services').update(dbService).eq('id', id)
      : await supabase.from('services').insert(dbService);
      
    if (error) console.error("Error saving service:", error);
    else await fetchAllData();
  };

  const handleDeleteService = async (serviceId: number) => {
    const { error } = await supabase.from('services').delete().eq('id', serviceId);
    if (error) console.error("Error deleting service:", error);
    else setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const handleSendMessage = async (name: string, email: string, message: string): Promise<boolean> => {
    const { error } = await supabase.from('messages').insert({ name, email, message, status: 'unread' });
    if (error) {
        console.error("Error sending message:", error);
        return false;
    }
    await fetchAllData(); // Refresh messages for admin if they're logged in
    return true;
  };

  const handleUpdateMessageStatus = async (messageId: number, status: 'read' | 'unread') => {
    const { error } = await supabase.from('messages').update({ status }).eq('id', messageId);
    if (error) console.error("Error updating message status:", error);
    else setMessages(prev => prev.map(msg => (msg.id === messageId ? { ...msg, status } : msg)));
  };

  const handleDeleteMessage = async (messageId: number) => {
    const { error } = await supabase.from('messages').delete().eq('id', messageId);
    if (error) console.error("Error deleting message:", error);
    else setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const renderContent = () => {
    if (view === 'dashboard' && currentUser?.role === 'admin') {
      return <Dashboard onLogout={handleLogout} posts={posts} portfolioItems={portfolioItems} services={services} messages={messages} onSavePost={handleSavePost} onDeletePost={handleDeletePost} onSavePortfolioItem={handleSavePortfolioItem} onDeletePortfolioItem={handleDeletePortfolioItem} onSaveService={handleSaveService} onDeleteService={handleDeleteService} onUpdateMessageStatus={handleUpdateMessageStatus} onDeleteMessage={handleDeleteMessage} />;
    }
    if (view === 'login') return <Login onExit={handleBackToHome} onNavigateToSignUp={() => setView('signup')} />;
    if (view === 'signup') return <SignUp onUserRegistered={handleUserRegistered} onExit={handleBackToHome} onNavigateToLogin={() => setView('login')} />;
    if (view === 'pendingVerification' && userToVerify) return <VerificationPage user={userToVerify} onExit={handleBackToHome} onNavigateToLogin={() => setView('login')} />;
    if (activePost) return <BlogPostPage post={activePost} currentUser={currentUser} onAddComment={handleAddComment} onLoginClick={showLoginPage} />;
    if (activeService) return <ServicePage service={activeService} />;
    if (view === 'portfolioPage') return <PortfolioPage items={portfolioItems} />;

    return (
      <>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Experience />
          <WhyHireMe />
          <Skills />
          <Services services={services} onServiceSelect={handleServiceSelect} />
          <Portfolio items={portfolioItems} onSeeAll={handleViewAllPortfolio} />
          <LogoCloud />
        </div>
        <Testimonials />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectIdea />
        </div>
        <div className="overflow-hidden"><Marquee /></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Blog posts={posts} onPostSelect={handlePostSelect} />
        </div>
      </>
    );
  };
  
  const isHomePage = view === 'site' && !activePost && !activeService;
  const showGlobalLayout = view === 'site' || view === 'portfolioPage' || !!activePost || !!activeService;

  return (
    <div className="font-sans">
      {showGlobalLayout && <Header onLogout={handleLogout} currentUser={currentUser} onNavigateHome={handleBackToHome} isHomePage={isHomePage} theme={theme} onToggleTheme={toggleTheme} />}
      {renderContent()}
      {showGlobalLayout && (
        <>
          <Footer onDashboardClick={showLoginPage} onNavigateHome={handleBackToHome} isHomePage={isHomePage} theme={theme} onToggleTheme={toggleTheme} onSendMessage={handleSendMessage} />
          <BackToTopButton />
        </>
      )}
    </div>
  );
};

export default App;
