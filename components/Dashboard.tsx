import React, { useState } from 'react';
import Logo from './icons/Logo';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import SortIcon from './icons/SortIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import EnvelopeOpenIcon from './icons/EnvelopeOpenIcon';
import PostEditorModal from './PostEditorModal';
import PortfolioEditorModal from './PortfolioEditorModal';
import ServiceEditorModal from './ServiceEditorModal';
import MessageViewerModal from './MessageViewerModal';
import PaginationControls from './PaginationControls';
import { useTableManager } from '../hooks/useTableManager';
import { Post, PortfolioItem, Service, Message } from '../types';

// New Icons for Sidebar
import DocumentIcon from './icons/DocumentIcon';
import LayoutGridIcon from './icons/LayoutGridIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import LogoutIcon from './icons/LogoutIcon';


interface DashboardProps {
  onLogout: () => void;
  posts: Post[];
  portfolioItems: PortfolioItem[];
  services: Service[];
  messages: Message[];
  onSavePost: (post: Post) => void;
  onDeletePost: (postId: number) => void;
  onSavePortfolioItem: (item: PortfolioItem) => void;
  onDeletePortfolioItem: (itemId: number) => void;
  onSaveService: (service: Service) => void;
  onDeleteService: (serviceId: number) => void;
  onUpdateMessageStatus: (messageId: number, status: 'read' | 'unread') => void;
  onDeleteMessage: (messageId: number) => void;
}

type TabName = 'posts' | 'portfolio' | 'services' | 'messages';

const Dashboard: React.FC<DashboardProps> = ({ 
    onLogout, 
    posts, 
    portfolioItems,
    services,
    messages,
    onSavePost, 
    onDeletePost, 
    onSavePortfolioItem, 
    onDeletePortfolioItem,
    onSaveService,
    onDeleteService,
    onUpdateMessageStatus,
    onDeleteMessage
}) => {
    const [activeTab, setActiveTab] = useState<TabName>('posts');
    
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const { 
        currentItems: currentPosts, 
        requestSort: requestPostSort, 
        sortConfig: postSortConfig,
        currentPage: currentPostPage,
        setCurrentPage: setCurrentPostPage,
        pageCount: postPageCount
    } = useTableManager<Post>(posts, 10);

    const { 
        currentItems: currentPortfolioItems, 
        requestSort: requestPortfolioSort, 
        sortConfig: portfolioSortConfig,
        currentPage: currentPortfolioPage,
        setCurrentPage: setCurrentPortfolioPage,
        pageCount: portfolioPageCount
    } = useTableManager<PortfolioItem>(portfolioItems, 10);

    const { 
        currentItems: currentServices, 
        requestSort: requestServiceSort, 
        sortConfig: serviceSortConfig,
        currentPage: currentServicePage,
        setCurrentPage: setCurrentServicePage,
        pageCount: servicePageCount
    } = useTableManager<Service>(services, 10);

    const { 
        currentItems: currentMessages, 
        requestSort: requestMessageSort, 
        sortConfig: messageSortConfig,
        currentPage: currentMessagePage,
        setCurrentPage: setCurrentMessagePage,
        pageCount: messagePageCount
    } = useTableManager<Message>(messages, 10);

    const handleAddNewPost = () => { setEditingPost(null); setIsPostModalOpen(true); };
    const handleEditPost = (post: Post) => { setEditingPost(post); setIsPostModalOpen(true); };
    const handleSavePostWithClose = (post: Post) => { onSavePost(post); setIsPostModalOpen(false); }
    
    const handleAddNewPortfolioItem = () => { setEditingPortfolioItem(null); setIsPortfolioModalOpen(true); };
    const handleEditPortfolioItem = (item: PortfolioItem) => { setEditingPortfolioItem(item); setIsPortfolioModalOpen(true); };
    const handleSavePortfolioItemWithClose = (item: PortfolioItem) => { onSavePortfolioItem(item); setIsPortfolioModalOpen(false); }

    const handleAddNewService = () => { setEditingService(null); setIsServiceModalOpen(true); };
    const handleEditService = (service: Service) => { setEditingService(service); setIsServiceModalOpen(true); };
    const handleSaveServiceWithClose = (service: Service) => { onSaveService(service); setIsServiceModalOpen(false); }
    
    const handleViewMessage = (message: Message) => {
        setSelectedMessage(message);
        setIsMessageModalOpen(true);
        if (message.status === 'unread') {
            onUpdateMessageStatus(message.id, 'read');
        }
    };

    const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

    const navItems: { tabName: TabName; label: string; icon: React.ReactNode; badge?: number }[] = [
        { tabName: 'posts', label: 'Posts', icon: <DocumentIcon className="w-5 h-5" /> },
        { tabName: 'portfolio', label: 'Portfolio', icon: <LayoutGridIcon className="w-5 h-5" /> },
        { tabName: 'services', label: 'Services', icon: <BriefcaseIcon className="w-5 h-5" /> },
        { tabName: 'messages', label: 'Messages', icon: <EnvelopeIcon className="w-5 h-5" />, badge: unreadMessagesCount },
    ];

    const TableHeaderButton = <T,>({ sortKey, label, requestSort, sortConfig }: { sortKey: keyof T; label: string; requestSort: (key: keyof T) => void; sortConfig: {key: keyof T; direction: 'ascending' | 'descending'} | null }) => {
        const direction = (sortConfig && sortConfig.key === sortKey) ? sortConfig.direction : null;
        return (
            <button onClick={() => requestSort(sortKey)} className="group flex items-center space-x-1">
                <span>{label}</span>
                <SortIcon className="w-4 h-4 text-slate-400" direction={direction} />
            </button>
        );
    };
    
    const getPortfolioCoverImage = (item: PortfolioItem) => item.coverImage || `https://via.placeholder.com/96x64.png?text=No+Image`;

    const renderContent = () => {
        switch(activeTab) {
            case 'posts':
                return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-white">Manage Posts</h1>
                            <button onClick={handleAddNewPost} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2 text-sm">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Post</span>
                            </button>
                        </div>
                        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-700">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Post> sortKey="title" label="Title" requestSort={requestPostSort} sortConfig={postSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Post> sortKey="category" label="Category" requestSort={requestPostSort} sortConfig={postSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Post> sortKey="date" label="Date" requestSort={requestPostSort} sortConfig={postSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {currentPosts.map(post => (
                                            <tr key={post.id} className="hover:bg-slate-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-white max-w-xs truncate">{post.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-slate-300">{post.category}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-slate-300">{post.date}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'Published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{post.status}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditPost(post)} className="text-slate-400 hover:text-brand-blue-400"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeletePost(post.id)} className="text-slate-400 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                             <div className="p-4 border-t border-slate-700"><PaginationControls currentPage={currentPostPage} pageCount={postPageCount} onPageChange={setCurrentPostPage} /></div>
                        </div>
                    </>
                );
            case 'portfolio':
                 return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-white">Manage Portfolio</h1>
                            <button onClick={handleAddNewPortfolioItem} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2 text-sm">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Item</span>
                            </button>
                        </div>
                        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-slate-700">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cover Image</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<PortfolioItem> sortKey="title" label="Title" requestSort={requestPortfolioSort} sortConfig={portfolioSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<PortfolioItem> sortKey="category" label="Category" requestSort={requestPortfolioSort} sortConfig={portfolioSortConfig} /></th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {currentPortfolioItems.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap"><img src={getPortfolioCoverImage(item)} alt={item.title} className="w-24 h-16 object-cover rounded-md bg-slate-700"/></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-white max-w-xs truncate">{item.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-slate-300">{item.category}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditPortfolioItem(item)} className="text-slate-400 hover:text-brand-blue-400"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeletePortfolioItem(item.id!)} className="text-slate-400 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-700"><PaginationControls currentPage={currentPortfolioPage} pageCount={portfolioPageCount} onPageChange={setCurrentPortfolioPage} /></div>
                        </div>
                    </>
                );
            case 'services':
                 return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-white">Manage Services</h1>
                            <button onClick={handleAddNewService} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2 text-sm">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Service</span>
                            </button>
                        </div>
                        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-slate-700">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Image</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Service> sortKey="title" label="Title" requestSort={requestServiceSort} sortConfig={serviceSortConfig} /></th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {currentServices.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap"><img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover rounded-md bg-slate-700"/></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-white max-w-xs truncate">{item.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditService(item)} className="text-slate-400 hover:text-brand-blue-400"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeleteService(item.id!)} className="text-slate-400 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-700"><PaginationControls currentPage={currentServicePage} pageCount={servicePageCount} onPageChange={setCurrentServicePage} /></div>
                        </div>
                    </>
                );
             case 'messages':
                return (
                    <>
                        <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold text-white">Inbox</h1></div>
                        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-700">
                                    <thead className="bg-slate-900/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Message> sortKey="status" label="Status" requestSort={requestMessageSort} sortConfig={messageSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Message> sortKey="name" label="From" requestSort={requestMessageSort} sortConfig={messageSortConfig} /></th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Message</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider"><TableHeaderButton<Message> sortKey="date" label="Received" requestSort={requestMessageSort} sortConfig={messageSortConfig} /></th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {currentMessages.map(msg => (
                                            <tr 
                                                key={msg.id} 
                                                onClick={() => handleViewMessage(msg)}
                                                className={`cursor-pointer transition-colors ${msg.status === 'unread' ? 'font-semibold bg-brand-blue-500/10 hover:bg-brand-blue-500/20' : 'hover:bg-slate-700/50'}`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 rounded-full ${msg.status === 'read' ? 'bg-slate-600/50 text-slate-300' : 'bg-brand-blue-500/30 text-brand-blue-200'}`}>{msg.status}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-white">{msg.name}</div>
                                                    <div className="text-sm text-slate-400">{msg.email}</div>
                                                </td>
                                                <td className="px-6 py-4"><p className="text-sm text-slate-300 max-w-md truncate">{msg.message}</p></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-slate-400">{new Date(msg.date).toLocaleString()}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={(e) => { e.stopPropagation(); onUpdateMessageStatus(msg.id, msg.status === 'read' ? 'unread' : 'read'); }} className="text-slate-400 hover:text-brand-blue-400" title={msg.status === 'read' ? 'Mark as unread' : 'Mark as read'}>
                                                            {msg.status === 'read' ? <EnvelopeIcon className="w-5 h-5"/> : <EnvelopeOpenIcon className="w-5 h-5"/>}
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); onDeleteMessage(msg.id); }} className="text-slate-400 hover:text-red-500" title="Delete message"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-700"><PaginationControls currentPage={currentMessagePage} pageCount={messagePageCount} onPageChange={setCurrentMessagePage} /></div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className="bg-slate-900 min-h-screen font-sans flex text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 flex flex-col flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-slate-700">
                    <Logo className="h-8 w-auto" pathClassName="fill-white" />
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.tabName}
                            onClick={() => setActiveTab(item.tabName)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === item.tabName ? 'bg-brand-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}
                        >
                            {item.icon}
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && item.badge > 0 && (
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>
                 <div className="px-4 py-4 border-t border-slate-700">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <LogoutIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
              {renderContent()}
            </main>
            
            <PostEditorModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onSave={handleSavePostWithClose} postData={editingPost} />
            <PortfolioEditorModal isOpen={isPortfolioModalOpen} onClose={() => setIsPortfolioModalOpen(false)} onSave={handleSavePortfolioItemWithClose} itemData={editingPortfolioItem} />
            <ServiceEditorModal isOpen={isServiceModalOpen} onClose={() => setIsServiceModalOpen(false)} onSave={handleSaveServiceWithClose} serviceData={editingService} />
            <MessageViewerModal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} message={selectedMessage} />
        </div>
    );
};

export default Dashboard;