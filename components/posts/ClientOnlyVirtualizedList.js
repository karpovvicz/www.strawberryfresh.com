import { useState, useEffect } from 'react';
import PostItem from './PostItem';

// Import the virtualized component directly
import VirtualizedPostList from './VirtualizedPostList';

const ClientOnlyVirtualizedList = ({ posts, onLoadMore, hasNextPage, isLoading }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only set client to true if window is available
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // Show a simple list while client-side rendering is not ready
  if (!isClient) {
    return (
      <div className="w-full space-y-8">
        {posts.slice(0, 10).map((post) => (
          <div key={post.id} className="px-4">
            <PostItem
              id={post.id}
              image={post.image}
              video={post.video}
              title={post.title}
              description={post.description}
              subreddit={post.subreddit}
              upvotes={post.upvotes}
              address={post.address}
              slug={post.slug}
              category={post.category}
              source={post.source}
              createdAt={post.createdAt}
            />
          </div>
        ))}
        {posts.length > 10 && (
          <div className="text-center text-zinc-500 py-8">
            Loading more posts...
          </div>
        )}
      </div>
    );
  }

  return (
    <VirtualizedPostList
      posts={posts}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
    />
  );
};

export default ClientOnlyVirtualizedList; 