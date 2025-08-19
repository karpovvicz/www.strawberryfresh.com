import { MongoClient } from "mongodb";
import { NextSeo } from "next-seo";
import {Fragment} from "react";
import PostList from "../components/posts/PostList";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useScrollRestoration } from '../hooks/useScrollRestoration';


function HomePage(props) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [visiblePosts, setVisiblePosts] = useState([]);
    const [windowStart, setWindowStart] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
    const [isScrollRestored, setIsScrollRestored] = useState(false);
    const loadMoreRef = useRef(null);
    const loadPreviousRef = useRef(null);
    const lastLoadTimeRef = useRef(0);
    const WINDOW_SIZE = 20; // Number of posts to keep in memory
    const LOAD_COOLDOWN = 1000; // 1 second cooldown between loads

    // Calculate which posts should be visible based on scroll position
    const calculateWindowFromScroll = useCallback((scrollY) => {
        const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
        
        // Estimate which post index the scroll position corresponds to
        // Assuming each post is approximately 600px tall including margins
        const estimatedPostIndex = Math.floor(scrollY / 600);
        const clampedIndex = Math.max(0, Math.min(estimatedPostIndex, postsToShow.length - 1));
        
        // Calculate window start to center the estimated post in the window
        const windowStart = Math.max(0, Math.min(clampedIndex - Math.floor(WINDOW_SIZE / 2), postsToShow.length - WINDOW_SIZE));
        
        return {
            windowStart,
            posts: postsToShow.slice(windowStart, windowStart + WINDOW_SIZE)
        };
    }, [props.posts, search, searchResults]);

    // Initialize visible posts with first window
    useEffect(() => {
        if (!isScrollRestored) {
            const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
            setVisiblePosts(postsToShow.slice(0, WINDOW_SIZE));
            setWindowStart(0);
        }
    }, [props.posts, search, searchResults, isScrollRestored]);

    // Enhanced scroll restoration logic for sliding window
    useEffect(() => {
        const key = `scrollPos:${router.asPath}`;
        const stored = sessionStorage.getItem(key);
        
        if (stored && !isScrollRestored) {
            const scrollData = JSON.parse(stored);
            
            if (scrollData.y > 0) {
                // If we have specific post context, use it
                if (scrollData.postIndex !== undefined && scrollData.windowStart !== undefined) {
                    const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
                    
                    // Ensure the window start is valid
                    const validWindowStart = Math.max(0, Math.min(scrollData.windowStart, postsToShow.length - WINDOW_SIZE));
                    const windowEnd = Math.min(validWindowStart + WINDOW_SIZE, postsToShow.length);
                    
                    setVisiblePosts(postsToShow.slice(validWindowStart, windowEnd));
                    setWindowStart(validWindowStart);
                    setIsScrollRestored(true);
                    
                    // Restore scroll position after ensuring DOM is ready
                    setTimeout(() => {
                        window.scrollTo(0, scrollData.y);
                    }, 150);
                } else {
                    // Fallback to calculation method
                    const { windowStart: calculatedStart, posts: calculatedPosts } = calculateWindowFromScroll(scrollData.y);
                    
                    setVisiblePosts(calculatedPosts);
                    setWindowStart(calculatedStart);
                    setIsScrollRestored(true);
                    
                    setTimeout(() => {
                        window.scrollTo(0, scrollData.y);
                    }, 150);
                }
            } else {
                setIsScrollRestored(true);
            }
        } else if (!stored) {
            setIsScrollRestored(true);
        }
    }, [router.asPath, props.posts, search, searchResults, calculateWindowFromScroll, isScrollRestored]);

    // Reset scroll restoration state when search changes
    useEffect(() => {
        setIsScrollRestored(false);
    }, [search, searchResults]);

    // Debounced search
    useEffect(() => {
        if (!search.trim()) {
            setSearchResults(null);
            setLoading(false);
            setError(null);
            return;
        }
        const controller = new AbortController();
        setLoading(true);
        setError(null);
        const timeout = setTimeout(() => {
            // Send search as both title and description for best match
            const params = new URLSearchParams({
                title: search,
                description: search
            });
            fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
                .then(res => {
                    if (!res.ok) throw new Error('Search failed');
                    return res.json();
                })
                .then(data => {
                    setSearchResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.name !== 'AbortError') {
                        setError('Search failed.');
                        setLoading(false);
                    }
                });
        }, 400);
        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [search]);

    const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;

    // Reset posts when search changes
    useEffect(() => {
        const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
        setVisiblePosts(postsToShow.slice(0, WINDOW_SIZE));
        setWindowStart(0);
    }, [searchResults]);

    // Function to load more posts (slide window forward)
    const loadMorePosts = useCallback(() => {
        const now = Date.now();
        if (isLoadingMore || isLoadingPrevious || (now - lastLoadTimeRef.current) < LOAD_COOLDOWN) return;
        
        lastLoadTimeRef.current = now;
        setIsLoadingMore(true);
        
        setTimeout(() => {
            const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
            
            const newWindowStart = Math.min(windowStart + WINDOW_SIZE, postsToShow.length - WINDOW_SIZE);
            const newWindowEnd = Math.min(newWindowStart + WINDOW_SIZE, postsToShow.length);
            
            setVisiblePosts(postsToShow.slice(newWindowStart, newWindowEnd));
            setWindowStart(newWindowStart);
            setIsLoadingMore(false);
        }, 300);
    }, [windowStart, isLoadingMore, isLoadingPrevious, props.posts, search, searchResults]);

    // Function to load previous posts (slide window backward)
    const loadPreviousPosts = useCallback(() => {
        const now = Date.now();
        if (isLoadingPrevious || isLoadingMore || (now - lastLoadTimeRef.current) < LOAD_COOLDOWN) return;
        
        lastLoadTimeRef.current = now;
        setIsLoadingPrevious(true);
        
        setTimeout(() => {
            const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
            
            const newWindowStart = Math.max(0, windowStart - WINDOW_SIZE);
            const newWindowEnd = newWindowStart + WINDOW_SIZE;
            
            setVisiblePosts(postsToShow.slice(newWindowStart, newWindowEnd));
            setWindowStart(newWindowStart);
            setIsLoadingPrevious(false);
        }, 300);
    }, [windowStart, isLoadingPrevious, isLoadingMore, props.posts, search, searchResults]);

    // Check if there are more posts to load
    const hasNextPage = useMemo(() => {
        const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
        return windowStart + WINDOW_SIZE < postsToShow.length;
    }, [windowStart, props.posts, search, searchResults]);

    // Check if there are previous posts to load
    const hasPreviousPage = useMemo(() => {
        const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const postsToShow = search.trim() ? (searchResults || []) : sortedPosts;
        return windowStart > 0;
    }, [windowStart, props.posts, search, searchResults]);

    // Intersection Observer to automatically load more posts
    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isLoadingMore || isLoadingPrevious) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage && !isLoadingMore && !isLoadingPrevious) {
                    loadMorePosts();
                }
            },
            {
                root: null,
                rootMargin: '200px', // Increased margin to be less aggressive
                threshold: 0.5 // Higher threshold - must be 50% visible
            }
        );
        
        observer.observe(loadMoreRef.current);
        
        return () => observer.disconnect();
    }, [hasNextPage, isLoadingMore, isLoadingPrevious, loadMorePosts]);

    // Intersection Observer to automatically load previous posts
    useEffect(() => {
        if (!loadPreviousRef.current || !hasPreviousPage || isLoadingPrevious || isLoadingMore) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasPreviousPage && !isLoadingPrevious && !isLoadingMore) {
                    loadPreviousPosts();
                }
            },
            {
                root: null,
                rootMargin: '200px', // Increased margin to be less aggressive
                threshold: 0.5 // Higher threshold - must be 50% visible
            }
        );
        
        observer.observe(loadPreviousRef.current);
        
        return () => observer.disconnect();
    }, [hasPreviousPage, isLoadingPrevious, isLoadingMore, loadPreviousPosts]);

    // Function to set scroll context when navigating to a post
    const setScrollContext = useCallback((postIndex) => {
        if (typeof window !== 'undefined') {
            window.__SCROLL_CONTEXT__ = {
                postIndex: postIndex,
                windowStart: windowStart,
                timestamp: Date.now()
            };
        }
    }, [windowStart]);

    // Custom scroll restoration hook - only restore when posts are ready
    const isReadyForScrollRestoration = useMemo(() => {
        return isScrollRestored && visiblePosts.length > 0;
    }, [isScrollRestored, visiblePosts.length]);

    useScrollRestoration(() => isReadyForScrollRestoration);

    // Dynamic SEO based on latest posts
    const latestPost = sortedPosts[0];
    const seoConfig = {
        title: "The Best Content Out There",
        description: "Your daily editorial of top-voted content from a variety of sources. Fresh, fun, and fruity. Enjoy the best of the web, curated for you.",
        canonical: "https://strawberryfresh.com",
        openGraph: {
            title: "StrawberryFresh - The Best Content Out There",
            description: "Your daily editorial of top-voted content from a variety of sources. Fresh, fun, and fruity. Enjoy the best of the web, curated for you.",
            url: "https://strawberryfresh.com",
            type: "website",
            images: latestPost?.image ? [
                {
                    url: latestPost.image,
                    width: 1200,
                    height: 630,
                    alt: latestPost.title,
                }
            ] : [],
        },
        twitter: {
            cardType: "summary_large_image",
            title: "StrawberryFresh - The Best Content Out There",
            description: "Your daily editorial of top-voted content from a variety of sources.",
            images: latestPost?.image ? [latestPost.image] : [],
        },
        additionalMetaTags: [
            {
                name: "keywords",
                content: "curated content, reddit, twitter, youtube, viral posts, trending, entertainment, technology, news, business, sports, lifestyle, funny"
            }
        ]
    };

    return (
        <Fragment>
            <NextSeo {...seoConfig} />
            {/* Enhanced Search Bar */}
            <div className="w-full flex justify-center items-center py-6 bg-transparent">
                <div className="relative w-full max-w-md bg-white/25 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 px-6 py-4 hover:bg-white/30 transition-all duration-300 group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xl pointer-events-none group-hover:scale-110 transition-transform duration-300" aria-hidden="true">🔍</span>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search for amazing content..."
                        aria-label="Search posts"
                        className="w-full pl-10 pr-4 py-3 rounded-3xl bg-transparent focus:bg-white/40 border-none focus:ring-2 focus:ring-purple-300 text-zinc-900 placeholder-zinc-500 transition-all duration-300 shadow-none text-lg"
                    />
                </div>
            </div>
            <section className="flex flex-col items-center justify-center py-8 max-w-2xl mx-auto px-2">
                <div
                    className="bg-white/25 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 px-8 py-8 flex flex-col items-center mb-8 animate-float w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 via-purple-50/30 to-pink-50/30 rounded-3xl"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-800 dark:text-white mb-4 leading-tight break-words whitespace-pre-line max-w-full w-full">
                            Welcome to
                            <span style={{fontFamily: 'More Sugar'}}
                                  className="block text-4xl sm:text-5xl md:text-6xl break-words w-full main-hero-strawberry">StrawberryFresh.com</span>
                        </h1>
                        <div className="w-full px-4 md:px-8">
                            <p className="text-lg md:text-xl text-zinc-700/80 mb-4 text-center max-w-xl leading-relaxed">Your
                                daily
                                editorial of top-voted content from a variety of sources. Fresh, fun, and fruity. Enjoy
                                the
                                best of the web, curated for you. Daily!</p>
                        </div>
                        {/* Decorative elements */}
                        <div className="flex justify-center gap-4 mt-6">
                            <span className="text-2xl animate-bounce">🍓</span>
                            <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
                            <span className="text-2xl animate-bounce" style={{animationDelay: '0.4s'}}>🎯</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-y-8">
                {loading && (
                    <div className="text-center py-12">
                        <div
                            className="inline-flex items-center gap-3 px-6 py-4 bg-white/25 backdrop-blur-xl rounded-2xl border border-white/30">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                            <span className="text-zinc-700 font-medium">🔍 Searching for amazing content...</span>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-center py-12">
                        <div
                            className="inline-flex items-center gap-3 px-6 py-4 bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-300/30">
                            <span className="text-2xl">⚠️</span>
                            <span className="text-red-700 font-medium">{error}</span>
                        </div>
                    </div>
                )}
                {!loading && !error && (
                    <>
                        {/* Intersection Observer sentinel for loading previous posts */}
                        {hasPreviousPage && (
                            <div
                                ref={loadPreviousRef}
                                className="h-12 w-full flex items-center justify-center"
                            >
                                {isLoadingPrevious && (
                                    <div className="flex items-center gap-3 px-6 py-3 bg-white/25 backdrop-blur-xl rounded-2xl border border-white/30">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                        <span className="text-zinc-700 font-medium">⬆️ Loading previous posts...</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <PostList 
                            posts={visiblePosts} 
                            onPostClick={setScrollContext}
                        />
                        
                        {/* Intersection Observer sentinel for loading more posts */}
                        {hasNextPage && (
                            <div 
                                ref={loadMoreRef}
                                className="h-12 w-full flex items-center justify-center"
                            >
                                {isLoadingMore && (
                                    <div className="flex items-center gap-3 px-6 py-3 bg-white/25 backdrop-blur-xl rounded-2xl border border-white/30">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                        <span className="text-zinc-700 font-medium">⬇️ Loading more posts...</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </Fragment>
    )
}



export async function getStaticProps() {
    //fetch data from api/database/filesystem
    //you always need to return an object with it
    //it always has to be named props

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = await db.collection('posts');
        const posts = await postsCollection.find().toArray();

        return {
            props: {
                posts: posts.map(each => ({
                    id: each._id.toString(),
                    title: each.title,
                    image: each.image,
                    video: each.video ?? null,
                    address: each.address,
                    description: each.description,
                    slug: each.slug,
                    category: each.category,
                    source: each.source,
                    createdAt: each.createdAt instanceof Date ? each.createdAt.toISOString() : each.createdAt,
                })),
            },
            revalidate: 300,
        };
    } catch (error) {
        console.error('Home page error:', error);
        return {
            props: {
                posts: [],
            },
            revalidate: 300,
        };
    } finally {
        if (client) {
            client.close();
        }
    }
}

export default HomePage;