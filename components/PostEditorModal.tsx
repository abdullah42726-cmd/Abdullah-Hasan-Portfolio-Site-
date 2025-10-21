import React, { useState, useEffect, useRef } from 'react';

interface Post {
    id: number | null;
    title: string;
    author: string;
    category: string;
    date: string;
    status: 'Published' | 'Draft';
    content?: string;
    imageUrl?: string;
}

interface PostEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Post) => void;
    postData: Post | null;
}

const PostEditorModal: React.FC<PostEditorModalProps> = ({ isOpen, onClose, onSave, postData }) => {
    const initialPostState: Post = {
        id: null,
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">{postData ? 'Edit Post' : 'Create New Post'}</h2>
                        
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" name="title" id="title" value={post.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea name="content" id="content" value={post.content} onChange={handleChange} rows={10} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500" />
                        </div>
                        
                        <div className="mb-4">
                             <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                             <div className="mt-1 flex items-center space-x-4">
                                <div className="w-32 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">Preview</span>}
                                </div>
                                <input type="file" name="coverImage" id="coverImage" onChange={handleImageChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-50 file:text-brand-blue-600 hover:file:bg-brand-blue-100" />
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input type="text" name="author" id="author" value={post.author} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input type="text" name="category" id="category" value={post.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" id="status" value={post.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option>Draft</option>
                                    <option>Published</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="bg-brand-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-brand-blue-600">{postData ? 'Update Post' : 'Save Post'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostEditorModal;
