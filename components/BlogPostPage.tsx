import React, { useState } from 'react';
import { Post, User, Comment } from '../types';

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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-blue-500 focus:border-brand-blue-500"
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
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Comments ({post.comments?.length || 0})</h2>
            
            {currentUser ? (
                <CommentForm onSubmit={(text) => onAddComment(post.id, text)} />
            ) : (
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-600">You need to be logged in to post a comment.</p>
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
                                <h4 className="font-bold text-brand-dark">{comment.author}</h4>
                                <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700 mt-1">{comment.text}</p>
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
    onAddComment: (postId: number, commentText: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, currentUser, onAddComment }) => {
    return (
        <div className="bg-white font-sans">
            <main className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article>
                    <header className="mb-8">
                        <p className="text-brand-blue-500 font-semibold">{post.category}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mt-2">{post.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
                            <span>By {post.author}</span>
                            <span>&bull;</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </header>
                    
                    <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl mb-8" />

                    <div className="prose prose-lg max-w-none text-gray-800">
                        {/* In a real scenario, this would render HTML from a rich text editor */}
                        <p>{post.content}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>
                        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. </p>
                    </div>
                </article>

                <CommentsSection post={post} currentUser={currentUser} onAddComment={onAddComment} onLoginClick={() => { /* This should probably navigate to login view */ }} />
            </main>
        </div>
    );
};

export default BlogPostPage;
