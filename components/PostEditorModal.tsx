import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../types';

interface PostEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Post) => void;
    postData: Post | null;
}

const PostEditorModal: React.FC<PostEditorModalProps> = ({ isOpen, onClose, onSave, postData }) => {
    // FIX: Removed `id: null` to conform to the `Post` type from `types.ts` where `id` is optional (number | undefined).
    const initialPostState: Post = {
        title: '',
        author: 'Abdullah Hasan',
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
        content: '',
        imageUrl: ''
    };

    const [post, setPost] = useState<Post>(initialPostState);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (postData) {
            setPost(postData);
            if(postData.imageUrl) setImagePreview(postData.imageUrl);
        } else {
            setPost(initialPostState);
            setImagePreview(null);
        }
    }, [postData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                // In a real app, you would upload this file and get back a URL.
                // For this mock, we'll just store the base64 preview.
                setPost(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(post);
    };

    // Handle closing modal on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div ref={modalRef} className="bg-slate-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white">
                <form onSubmit={handleSubmit}>
                     <div className="sticky top-0 bg-slate-800 z-10 px-6 py-4 border-b border-slate-700">
                        <h2 className="text-2xl font-bold">{postData ? 'Edit Post' : 'Create New Post'}</h2>
                     </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                            <input type="text" name="title" id="title" value={post.title} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">Content</label>
                            <textarea name="content" id="content" value={post.content} onChange={handleChange} rows={10} className="w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 bg-slate-700 text-white" />
                        </div>
                        
                        <div className="mb-4">
                             <label htmlFor="coverImage" className="block text-sm font-medium text-slate-300 mb-1">Cover Image</label>
                             <div className="mt-1 flex items-center space-x-4">
                                <div className="w-32 h-20 bg-slate-700 rounded-md flex items-center justify-center overflow-hidden">
                                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-xs text-slate-400">Preview</span>}
                                </div>
                                <input type="file" name="coverImage" id="coverImage" onChange={handleImageChange} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-500/20 file:text-brand-blue-200 hover:file:bg-brand-blue-500/30" />
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1">Author</label>
                                <input type="text" name="author" id="author" value={post.author} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                                <input type="text" name="category" id="category" value={post.category} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white" />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1">Status</label>
                                <select name="status" id="status" value={post.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-white">
                                    <option>Draft</option>
                                    <option>Published</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 px-6 py-3 flex justify-end space-x-3 sticky bottom-0 border-t border-slate-700">
                        <button type="button" onClick={onClose} className="bg-slate-600 py-2 px-4 border border-slate-500 rounded-md shadow-sm text-sm font-medium text-white hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="bg-brand-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-brand-blue-600">{postData ? 'Update Post' : 'Save Post'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditorModal;
