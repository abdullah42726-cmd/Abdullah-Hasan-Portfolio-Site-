import React, { useState } from 'react';
import Logo from './icons/Logo';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import SortIcon from './icons/SortIcon';
import PostEditorModal from './PostEditorModal';
import PortfolioEditorModal from './PortfolioEditorModal';
import ServiceEditorModal from './ServiceEditorModal';
import PaginationControls from './PaginationControls';
import { useTableManager } from '../hooks/useTableManager';
import { Post, PortfolioItem, Service } from '../types';

interface DashboardProps {
  onLogout: () => void;
  posts: Post[];
  portfolioItems: PortfolioItem[];
  services: Service[];
  onSavePost: (post: Post) => void;
  onDeletePost: (postId: number) => void;
  onSavePortfolioItem: (item: PortfolioItem) => void;
  onDeletePortfolioItem: (itemId: number) => void;
  onSaveService: (service: Service) => void;
  onDeleteService: (serviceId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
    onLogout, 
    posts, 
    portfolioItems,
    services,
    onSavePost, 
    onDeletePost, 
    onSavePortfolioItem, 
    onDeletePortfolioItem,
    onSaveService,
    onDeleteService
}) => {
    const [activeTab, setActiveTab] = useState<'posts' | 'portfolio' | 'services'>('posts');
    
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    
    const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
    const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const { 
        currentItems: currentPosts, 
        requestSort: requestPostSort, 
        sortConfig: postSortConfig,
        currentPage: currentPostPage,
        setCurrentPage: setCurrentPostPage,
        pageCount: postPageCount
    } = useTableManager<Post>(posts, 5);

    const { 
        currentItems: currentPortfolioItems, 
        requestSort: requestPortfolioSort, 
        sortConfig: portfolioSortConfig,
        currentPage: currentPortfolioPage,
        setCurrentPage: setCurrentPortfolioPage,
        pageCount: portfolioPageCount
    } = useTableManager<PortfolioItem>(portfolioItems, 5);

    const { 
        currentItems: currentServices, 
        requestSort: requestServiceSort, 
        sortConfig: serviceSortConfig,
        currentPage: currentServicePage,
        setCurrentPage: setCurrentServicePage,
        pageCount: servicePageCount
    } = useTableManager<Service>(services, 5);

    const handleAddNewPost = () => {
        setEditingPost(null);
        setIsPostModalOpen(true);
    };

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setIsPostModalOpen(true);
    };

    const handleSavePostWithClose = (post: Post) => {
        onSavePost(post);
        setIsPostModalOpen(false);
    }
    
    const handleAddNewPortfolioItem = () => {
        setEditingPortfolioItem(null);
        setIsPortfolioModalOpen(true);
    };

    const handleEditPortfolioItem = (item: PortfolioItem) => {
        setEditingPortfolioItem(item);
        setIsPortfolioModalOpen(true);
    };
    
    const handleSavePortfolioItemWithClose = (item: PortfolioItem) => {
        onSavePortfolioItem(item);
        setIsPortfolioModalOpen(false);
    }

    const handleAddNewService = () => {
        setEditingService(null);
        setIsServiceModalOpen(true);
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setIsServiceModalOpen(true);
    };
    
    const handleSaveServiceWithClose = (service: Service) => {
        onSaveService(service);
        setIsServiceModalOpen(false);
    }

    const TabButton: React.FC<{tabName: 'posts' | 'portfolio' | 'services', label: string}> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabName ? 'bg-brand-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );

    const TableHeaderButton = <T,>({ sortKey, label, requestSort, sortConfig }: { sortKey: keyof T; label: string; requestSort: (key: keyof T) => void; sortConfig: {key: keyof T; direction: 'ascending' | 'descending'} | null }) => {
        const direction = (sortConfig && sortConfig.key === sortKey) ? sortConfig.direction : null;
        return (
            <button onClick={() => requestSort(sortKey)} className="group flex items-center space-x-1">
                <span>{label}</span>
                <SortIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" direction={direction} />
            </button>
        );
    };
    
    const getPortfolioCoverImage = (item: PortfolioItem) => {
        return item.coverImage || `https://via.placeholder.com/96x64.png?text=No+Image`;
    };

    return (
        <div className="bg-brand-gray min-h-screen font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                       <Logo className="h-8 w-auto" pathClassName="fill-brand-dark" />
                       <span className="text-xl font-semibold text-gray-500">Dashboard</span>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="text-sm font-medium text-gray-600 hover:text-brand-blue-500 transition-colors"
                    >
                      Logout
                    </button>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 pb-4">
                    <TabButton tabName="posts" label="Manage Posts" />
                    <TabButton tabName="portfolio" label="Manage Portfolio" />
                    <TabButton tabName="services" label="Manage Services" />
                </div>
                
                {activeTab === 'posts' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-brand-dark">Manage Posts</h1>
                            <button onClick={handleAddNewPost} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Post</span>
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <TableHeaderButton<Post> sortKey="title" label="Title" requestSort={requestPostSort} sortConfig={postSortConfig} />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <TableHeaderButton<Post> sortKey="category" label="Category" requestSort={requestPostSort} sortConfig={postSortConfig} />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <TableHeaderButton<Post> sortKey="date" label="Date" requestSort={requestPostSort} sortConfig={postSortConfig} />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentPosts.map(post => (
                                            <tr key={post.id}>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 max-w-xs truncate">{post.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{post.category}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{post.date}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{post.status}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditPost(post)} className="text-brand-blue-500 hover:text-brand-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeletePost(post.id)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                             <div className="p-4 border-t border-gray-200">
                                <PaginationControls currentPage={currentPostPage} pageCount={postPageCount} onPageChange={setCurrentPostPage} />
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-brand-dark">Manage Portfolio</h1>
                            <button onClick={handleAddNewPortfolioItem} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Item</span>
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover Image</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                 <TableHeaderButton<PortfolioItem> sortKey="title" label="Title" requestSort={requestPortfolioSort} sortConfig={portfolioSortConfig} />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                 <TableHeaderButton<PortfolioItem> sortKey="category" label="Category" requestSort={requestPortfolioSort} sortConfig={portfolioSortConfig} />
                                            </th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentPortfolioItems.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={getPortfolioCoverImage(item)} alt={item.title} className="w-24 h-16 object-cover rounded-md bg-gray-100"/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 max-w-xs truncate">{item.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{item.category}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditPortfolioItem(item)} className="text-brand-blue-500 hover:text-brand-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeletePortfolioItem(item.id!)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <PaginationControls currentPage={currentPortfolioPage} pageCount={portfolioPageCount} onPageChange={setCurrentPortfolioPage} />
                            </div>
                        </div>
                    </div>
                )}
                
                {activeTab === 'services' && (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-brand-dark">Manage Services</h1>
                            <button onClick={handleAddNewService} className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Create New Service</span>
                            </button>
                        </div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                 <TableHeaderButton<Service> sortKey="title" label="Title" requestSort={requestServiceSort} sortConfig={serviceSortConfig} />
                                            </th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentServices.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover rounded-md"/>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 max-w-xs truncate">{item.title}</div></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-4">
                                                        <button onClick={() => handleEditService(item)} className="text-brand-blue-500 hover:text-brand-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                                        <button onClick={() => onDeleteService(item.id!)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <PaginationControls currentPage={currentServicePage} pageCount={servicePageCount} onPageChange={setCurrentServicePage} />
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            <PostEditorModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                onSave={handleSavePostWithClose}
                postData={editingPost}
            />
            
            <PortfolioEditorModal
                isOpen={isPortfolioModalOpen}
                onClose={() => setIsPortfolioModalOpen(false)}
                onSave={handleSavePortfolioItemWithClose}
                itemData={editingPortfolioItem}
            />

            <ServiceEditorModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                onSave={handleSaveServiceWithClose}
                serviceData={editingService}
            />
        </div>
    );
};

export default Dashboard;