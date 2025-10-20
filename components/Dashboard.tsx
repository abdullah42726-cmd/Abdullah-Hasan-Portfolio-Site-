import React, { useState } from 'react';
import Logo from './icons/Logo';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import PostEditorModal from './PostEditorModal';
import { Post } from '../types';
import { mockPostsData } from '../mockData';


interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [posts, setPosts] = useState<Post[]>(mockPostsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleAddNew = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (postId: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== postId));
        }
    };
    
    const handleSave = (postToSave: Post) => {
        if (postToSave.id) {
            // Update existing post
            setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
        } else {
            // Create new post
            const newPost = { ...postToSave, id: Date.now() }; // Simple ID generation
            setPosts([newPost, ...posts]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="bg-brand-gray min-h-screen font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                       <Logo className="h-8 w-auto" pathClassName="fill-brand-dark" />
                       <span className="text-xl font-semibold text-gray-500">Blog Dashboard</span>
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-brand-dark">Manage Posts</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-brand-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue-600 transition-colors flex items-center space-x-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Create New Post</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.map(post => (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 max-w-xs truncate">{post.title}</div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{post.author}</div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{post.category}</div></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{post.date}</div></td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center space-x-4">
                                                <button onClick={() => handleEdit(post)} className="text-brand-blue-500 hover:text-brand-blue-600"><PencilIcon className="w-5 h-5"/></button>
                                                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            
            <PostEditorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                postData={editingPost}
            />
        </div>
    );
};

export default Dashboard;