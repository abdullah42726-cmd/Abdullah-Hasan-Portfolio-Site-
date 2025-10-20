import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { Post } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BlogCardProps {
    post: Post;
    onPostSelect: (id: number) => void;
    isVisible: boolean;
    delay: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onPostSelect, isVisible, delay }) => (
    <div className={`cursor-pointer group scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`} style={{ transitionDelay: delay }} onClick={() => onPostSelect(post.id)}>
        <div className="relative mb-4 overflow-hidden rounded-3xl">
            <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-4 right-4 bg-brand-dark group-hover:bg-brand-blue-500 transition-colors w-16 h-16 rounded-full flex items-center justify-center">
                <ArrowRightIcon className="w-8 h-8 text-white" />
            </div>
        </div>
        <div className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full inline-block text-sm font-medium mb-3">{post.category}</div>
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
            <span>● {post.author}</span>
            <span>● {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-blue-500 transition-colors">{post.title}</h3>
    </div>
);

interface BlogProps {
    posts: Post[];
    onPostSelect: (id: number) => void;
}

const Blog: React.FC<BlogProps> = ({ posts, onPostSelect }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20">
      <div className={`flex flex-col items-start gap-y-4 sm:flex-row sm:justify-between sm:items-center mb-10 scroll-animate ${isVisible ? 'scroll-animate-visible' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold">
          From my <br/> <span className="text-brand-blue-500">blog post</span>
        </h2>
        <button className="bg-brand-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-opacity flex-shrink-0">
          See All
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.filter(p => p.status === 'Published').map((post, index) => (
            <BlogCard 
                key={post.id}
                post={post}
                onPostSelect={onPostSelect}
                isVisible={isVisible}
                delay={`${150 + index * 150}ms`}
            />
        ))}
      </div>
    </section>
  );
};

export default Blog;