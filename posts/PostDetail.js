import Link from "next/link";
import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

function PostDetail(props) {
    const [showDescription, setShowDescription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [relatedPosts, setRelatedPosts] = useState([]);

    // Add loading animation
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Fetch related posts
    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const response = await fetch(`/api/search?category=${props.category}&source=${props.source}&limit=3`);
                const data = await response.json();

                // Check if data and posts exist
                if (data && data.posts && Array.isArray(data.posts)) {
                    // Filter out the current post
                    const filtered = data.posts.filter(post => post.id !== props.id);
                    setRelatedPosts(filtered.slice(0, 3));
                } else {
                    // If no posts found, set empty array
                    setRelatedPosts([]);
                }
            } catch (error) {
                console.error('Error fetching related posts:', error);
                setRelatedPosts([]);
            }
        };

        if (props.category && props.source) {
            fetchRelatedPosts();
        }
    }, [props.category, props.source, props.id]);

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Utility function to get YouTube embed URL
    function getYouTubeEmbedUrl(url) {
        const ytMatch = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
        );
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }
        return null;
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className={`min-h-screen py-8 px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-800 z-50">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto">
                {/* Back Navigation */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-700 font-semibold text-base shadow-lg hover:bg-white/40 hover:border-purple-400/50 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group"
                    >
                        <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        Back to Feed
                    </Link>
                </div>

                {/* Breadcrumb Navigation */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
                    <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                    <span>→</span>
                    <Link href={`/${props.category}`} className="hover:text-purple-600 transition-colors capitalize">
                        {props.category}
                    </Link>
                    <span>→</span>
                    <Link href={`/${props.category}/${props.source}`} className="hover:text-purple-600 transition-colors capitalize">
                        {props.source}
                    </Link>
                    <span>→</span>
                    <span className="text-zinc-800 font-medium truncate max-w-xs">{props.title}</span>
                </nav>

                {/* Main Content Card */}
                <div className={`bg-white/25 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden transition-all duration-1000 post-detail-main-card ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-purple-50/30 to-pink-50/30"></div>

                    <div className="relative z-10 p-8">
                        {/* Header Section */}
                        <div className="mb-8">
                            {/* Category and Source Badges */}
                            <div className="flex flex-wrap gap-3 mb-6 post-detail-meta">
                                <Link href={`/${props.category}`} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-300/30 text-purple-700 font-semibold text-sm hover:scale-105 transition-transform duration-300 cursor-pointer post-detail-badge">
                                    {props.category}
                                </Link>
                                <Link href={`/${props.category}/${props.source}`} className={`backdrop-blur-sm px-4 py-2 rounded-full border font-semibold text-sm hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center gap-2 post-detail-badge ${
                                    props.source === 'youtube'
                                        ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-300/30 text-red-700'
                                        : props.source === 'reddit'
                                            ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-300/30 text-orange-700'
                                            : props.source === 'x'
                                                ? 'bg-gradient-to-r from-gray-700/20 to-gray-800/20 border-gray-600/30 text-gray-800'
                                                : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/30 text-blue-700'
                                }`}>
                                    <img
                                        src={`/icons/${props.source === 'youtube' ? 'yt' : props.source === 'reddit' ? 'Reddit' : props.source === 'x' ? 'x' : 'x'}.png`}
                                        alt={props.source}
                                        className="w-4 h-4 object-contain"
                                    />
                                    {props.source}
                                </Link>
                                <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-300/30 text-green-700 font-semibold text-sm hover:scale-105 transition-transform duration-300 cursor-default post-detail-badge">
                                    {props.subreddit}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white leading-tight mb-4 post-detail-title">
                                {props.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-600">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-lg sm:text-2xl">⬆️</span>
                                    <span className="font-semibold text-purple-700">{props.upvotes} upvotes</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="text-base sm:text-lg">📅</span>
                                    <span>{formatDate(props.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="mb-8">
                            {props.image ? (
                                <div className="overflow-hidden rounded-2xl relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                                    <img
                                        loading="lazy"
                                        src={props.image}
                                        alt={props.title}
                                        className="w-full h-auto object-contain bg-transparent"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div
                                        className="w-full h-96 bg-gradient-to-br from-pink-50/50 to-purple-50/50 backdrop-blur-sm flex items-center justify-center text-zinc-500 rounded-2xl"
                                        style={{ display: 'none' }}
                                    >
                                        <span className="text-lg">🖼️ Image not available</span>
                                    </div>
                                </div>
                            ) : props.video ? (
                                (() => {
                                    const embedUrl = getYouTubeEmbedUrl(props.video);
                                    if (embedUrl) {
                                        return (
                                            <div className="relative overflow-hidden rounded-2xl group">
                                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                                                <div className="aspect-video">
                                                    <iframe
                                                        src={embedUrl}
                                                        title={props.title}
                                                        className="w-full h-full bg-transparent rounded-2xl"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="overflow-hidden rounded-2xl relative group">
                                                <video
                                                    autoPlay
                                                    muted
                                                    playsInline
                                                    loop
                                                    src={props.video}
                                                    controls
                                                    className="w-full h-auto object-contain bg-transparent"
                                                    poster={props.imageFallback || ""}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        );
                                    }
                                })()
                            ) : (
                                <div className="w-full h-96 bg-gradient-to-br from-pink-50/50 to-purple-50/50 backdrop-blur-sm flex items-center justify-center text-zinc-500 rounded-2xl">
                                    <span className="text-lg">🎬 Media not available</span>
                                </div>
                            )}
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-6">
                            {/* Top Comment */}
                            {props.comment && (
                                <div className="glass-card backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-2xl">💬</span>
                                        <h3 className="font-bold text-lg text-zinc-800 post-detail-h3">Top Comment</h3>
                                    </div>
                                    <p className="text-zinc-700 leading-relaxed text-base post-detail-p">{props.comment}</p>
                                </div>
                            )}

                            {/* Description Toggle */}
                            {props.description && (
                                <div className="glass-card backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">📝</span>
                                            <h3 className="font-bold text-lg text-zinc-800 post-detail-h3">Description</h3>
                                        </div>
                                        <button
                                            className="text-2xl p-2 rounded-full hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 hover:scale-110"
                                            aria-label={showDescription ? 'Hide description' : 'Show description'}
                                            onClick={() => setShowDescription(v => !v)}
                                            type="button"
                                        >
                                            {showDescription ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                    {showDescription && (
                                        <div className="animate-fade-in">
                                            <p className="text-zinc-700 leading-relaxed text-base post-detail-p post-detail-description">{props.description}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Original Post Link */}
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">🔗</span>
                                    <h3 className="font-bold text-lg text-zinc-800">Original Post</h3>
                                </div>
                                <a
                                    href={props.address}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 text-purple-700 font-semibold text-base shadow-lg hover:bg-white/60 hover:border-purple-400/50 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 group"
                                >
                                    <span>Visit Original</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <div className="mt-8">
                        <div className="bg-white/25 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-2xl">🔗</span>
                                <h2 className="font-bold text-xl text-zinc-800">Related Posts</h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/${post.category}/${post.source}/${post.slug}`}
                                        className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-white/30 hover:border-purple-400/50 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <img
                                                src={`/icons/${post.source === 'youtube' ? 'yt' : post.source === 'reddit' ? 'Reddit' : post.source === 'x' ? 'x' : 'x'}.png`}
                                                alt={post.source}
                                                className="w-4 h-4 object-contain"
                                            />
                                            <span className="text-xs text-zinc-600 capitalize">{post.source}</span>
                                        </div>
                                        <h3 className="font-semibold text-sm text-zinc-800 line-clamp-2 group-hover:text-purple-700 transition-colors">
                                            {post.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-600">
                                            <span>⬆️ {post.upvotes}</span>
                                            <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                <div className="mt-8">
                    <CommentSection postId={props.id} />
                </div>

                {/* Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <div className="flex flex-col gap-3">
                        {/* Share Button */}
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: props.title,
                                        text: props.description || `Check out this ${props.category} post from ${props.source}`,
                                        url: window.location.href,
                                    });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white text-xl"
                            aria-label="Share post"
                        >
                            📤
                        </button>

                        {/* Back to Top Button */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white text-xl"
                            aria-label="Back to top"
                        >
                            ⬆️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;