import { useState, useEffect } from 'react';
import PostList from './PostList';
import dynamic from 'next/dynamic';

// Dynamically import the virtualized component with no SSR
const VirtualizedPostList = dynamic(
  () => import('./VirtualizedPostList'),
  { 
    ssr: false,
    loading: () => <div className="text-center text-zinc-500 py-8">Loading virtualized list...</div>
  }
);

const HybridPostList = ({ posts, onLoadMore, hasNextPage, isLoading }) => {
  const [isClient, setIsClient] = useState(false);
  const [useVirtualized, setUseVirtualized] = useState(false);

  useEffect(() => {
    // Set client to true after hydration
    setIsClient(true);
    
    // Switch to virtualized after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      if (posts.length > 10) { // Only use virtualization for larger lists
        setUseVirtualized(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [posts.length]);

  // Show regular PostList during SSR and initial client render
  if (!isClient || !useVirtualized) {
    return (
      <>
        <PostList posts={posts} />
        {hasNextPage && (
          <div className="text-center py-8">
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-zinc-700 font-medium hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More Posts'}
            </button>
          </div>
        )}
      </>
    );
  }

  // Show virtualized list after client-side hydration
  return (
    <VirtualizedPostList
      posts={posts}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
    />
  );
};

export default HybridPostList; 