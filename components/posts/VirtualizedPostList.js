import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import PostItem from './PostItem';
import { useCallback, useMemo } from 'react';

const VirtualizedPostList = ({ posts, onLoadMore, hasNextPage, isLoading }) => {
  // Ensure we're on the client side
  if (typeof window === 'undefined') {
    return null;
  }

  // Estimate item height - adjust based on your PostItem component
  const ITEM_HEIGHT = 450; // Slightly increased for better spacing
  const WINDOW_SIZE = 20; // Number of posts to keep in memory

  // Memoize the row renderer to prevent unnecessary re-renders
  const Row = useCallback(({ index, style }) => {
    const post = posts[index];
    
    // Show loading indicator at the end
    if (index === posts.length && hasNextPage) {
      return (
        <div style={style} className="flex items-center justify-center py-8">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-zinc-700"></div>
              <span className="text-zinc-700 font-medium">Loading more posts...</span>
            </div>
          </div>
        </div>
      );
    }
    
    // Show "no more posts" indicator
    if (index === posts.length && !hasNextPage) {
      return (
        <div style={style} className="flex items-center justify-center py-8">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full max-w-2xl mx-auto">
            <div className="text-center">
              <span className="text-zinc-700 font-medium">🎉 You've reached the end! No more posts to load.</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (!post) {
      return (
        <div style={style} className="flex items-center justify-center">
          <div className="animate-pulse bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full max-w-2xl mx-auto">
            <div className="h-6 bg-white/30 rounded mb-4"></div>
            <div className="h-48 bg-white/30 rounded mb-4"></div>
            <div className="h-4 bg-white/30 rounded"></div>
          </div>
        </div>
      );
    }

    return (
      <div style={style} className="px-4">
        <PostItem
          key={post.id}
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
    );
  }, [posts]);

  // Determine if a row is loaded
  const isItemLoaded = useCallback((index) => {
    return !hasNextPage || index < posts.length;
  }, [hasNextPage, posts.length]);

  // Load more items when needed
  const loadMoreItems = useCallback((startIndex, stopIndex) => {
    if (!isLoading && hasNextPage) {
      onLoadMore();
    }
  }, [isLoading, hasNextPage, onLoadMore]);

  // Calculate the total number of items
  const itemCount = hasNextPage ? posts.length + 1 : posts.length;



  return (
    <div className="w-full" style={{ height: 'calc(100vh - 300px)' }}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            threshold={5} // Start loading 5 items before reaching the end
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={ref}
                height={height}
                itemCount={itemCount}
                itemSize={ITEM_HEIGHT}
                onItemsRendered={onItemsRendered}
                width={width}
                overscanCount={5} // Render 5 items outside the visible area
                className="scrollbar-hide" // Hide scrollbar for cleaner look
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedPostList; 