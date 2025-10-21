import React, { useState, useEffect } from 'react';
import { Post, User, Comment } from '../types';
import { supabase } from '../supabaseClient';

interface CommentFormProps {
    onSubmit: (commentText: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmit(comment.trim());
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-blue-500 focus:border-brand-blue-500 dark:bg-brand-dark-2 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                rows={4}
                required
            />
            <div className="text-right mt-2">
                <button type="submit" className="bg-brand-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-blue-600 transition-colors">
                    Post Comment
                </button>
            </div>
        </form>
    );
};

const CommentsSection: React.FC<{ post: Post; currentUser: User | null; onAddComment: (postId: number, commentText: string) => void; onLoginClick: () => void; }> = ({ post, currentUser, onAddComment, onLoginClick }) => {
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-6">Comments ({post.comments?.length || 0})</h2>
            
            {currentUser ? (
                post.id && <CommentForm onSubmit={(text) => onAddComment(post.id!, text)} />
            ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">You need to be logged in to post a comment.</p>
                    <button onClick={onLoginClick} className="mt-2 text-brand-blue-500 font-semibold hover:underline">Login or Sign Up</button>
                </div>
            )}
            
            <div className="mt-8 space-y-6">
                {post.comments && post.comments.map(comment => (
                    <div key={comment.id} className="flex space-x-4">
                        <div className="w-12 h-12 bg-brand-blue-200 rounded-full flex items-center justify-center text-brand-blue-600 font-bold flex-shrink-0">
                            {comment.author.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-baseline space-x-2">
                                <h4 className="font-bold text-brand-dark dark:text-white">{comment.author}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


interface BlogPostPageProps {
    post: Post;
    currentUser: User | null;
    onAddComment: (postId: number, commentText: string) => Promise<void>;
    onLoginClick: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, currentUser, onAddComment, onLoginClick }) => {
    const [postWithComments, setPostWithComments] = useState<Post>(post);

    useEffect(() => {
        const fetchComments = async () => {
            if (!post.id) return;
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', post.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching comments:", error);
            } else {
                setPostWithComments(prevPost => ({ ...prevPost, comments: data || [] }));
            }
        };

        fetchComments();
    }, [post.id]);

    const handleAddCommentWrapper = async (postId: number, commentText: string) => {
        await onAddComment(postId, commentText);
        // Refetch comments after adding a new one
         const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', post.id)
            .order('created_at', { ascending: false });
        if (!error && data) {
            setPostWithComments(prevPost => ({ ...prevPost, comments: data }));
        }
    };


    return (
        <div className="bg-white dark:bg-brand-dark font-sans">
            <main className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article>
                    <header className="mb-8">
                        <p className="text-brand-blue-500 font-semibold">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white mt-2">{post.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                            <span>By {post.author}</span>
                            <span>&bull;</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </header>
                    
                    <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl mb-8" />

                    <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
                        {post.content?.split('\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>  
                        ))}
                    </div>
                </article>

                <CommentsSection post={postWithComments} currentUser={currentUser} onAddComment={handleAddCommentWrapper} onLoginClick={onLoginClick} />
            </main>
        </div>
    );
};

export default BlogPostPage;