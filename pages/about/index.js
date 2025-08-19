// components/About.tsx

import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function AboutPage() {
    const [isHovered, setIsHovered] = useState(false);
    const [showCoffeeModal, setShowCoffeeModal] = useState(false);

    const handleCoffeeClick = () => {
        setShowCoffeeModal(true);
        setTimeout(() => {
            window.open('https://coff.ee/strawberryfresh', '_blank');
            setShowCoffeeModal(false);
        }, 500);
    };

    const seoConfig = {
        title: "About Us",
        description: "Learn about StrawberryFresh - Our mission to bring you the best curated content without the chaos.",
        canonical: "https://strawberryfresh.com/about",
        openGraph: {
            title: "About Us | StrawberryFresh",
            description: "Learn about StrawberryFresh - Our mission to bring you the best curated content without the chaos.",
            url: "https://strawberryfresh.com/about",
            type: "website",
        },
        twitter: {
            cardType: "summary",
            title: "About Us | StrawberryFresh",
            description: "Learn about StrawberryFresh - Our mission to bring you the best curated content without the chaos.",
        },
    };

    return (
        <>
            <NextSeo {...seoConfig} />
            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-red-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-red-400/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            <div className="min-h-screen px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-6xl mb-4 animate-bounce">🍓</div>
                                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                                    Why We Built This
                                </h1>
                                <p className="text-xl text-zinc-700/80 max-w-3xl mx-auto leading-relaxed">
                                    A platform born from the need for clarity in a world of chaos
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Mission Statement */}
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-6">🎯</div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-6">Our Mission</h2>
                                <div className="space-y-6 text-lg text-zinc-700/80 leading-relaxed">
                                    <p>
                                        We created this platform to reclaim our time from endless doomscrolling.
                                        While we didn't want to disconnect entirely from what's happening in the world,
                                        we were tired of wasting hours on low-quality, AI-generated content we never asked for.
                                    </p>
                                    <p>
                                        So we built a space that curates only the most upvoted, commented, and liked posts
                                        from various social media platforms all in one place. It's updated daily.
                                        Just scroll, get the essentials, and move on with your life.
                                    </p>
                                    <p>
                                        Our mission is to minimize screen time and maximize your attention for things that
                                        actually matter: <span className="font-semibold text-zinc-900">read a book, take a walk, listen to the birds.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Values Section */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Neutrality */}
                            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">⚖️</div>
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">Political Neutrality</h3>
                                    <p className="text-zinc-700/80 leading-relaxed">
                                        We're not here to inflame division or push an agenda. We aim to stay politically neutral,
                                        offering context when needed, not commentary.
                                    </p>
                                </div>
                            </div>

                            {/* Attribution */}
                            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">Creator Attribution</h3>
                                    <p className="text-zinc-700/80 leading-relaxed">
                                        We credit all original creators, and every post includes links to the source.
                                        Where possible, we add a brief note to help others understand why a post might matter.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Community Section */}
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">🤝</div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-6">Built for Our Community</h2>
                                <p className="text-xl text-zinc-700/80 mb-8 leading-relaxed">
                                    This is a ground-up initiative, made for people like us who just want clarity without chaos.
                                </p>

                                <div className="flex flex-wrap justify-center gap-4 text-sm">
                                    <span className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 text-zinc-800 font-medium border border-white/40">Curated Content</span>
                                    <span className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 text-zinc-800 font-medium border border-white/40">Daily Updates</span>
                                    <span className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 text-zinc-800 font-medium border border-white/40">Quality Over Quantity</span>
                                    <span className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 text-zinc-800 font-medium border border-white/40">Time-Saving</span>
                                </div>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">☕</div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-4">Support Our Mission</h2>
                                <p className="text-lg text-zinc-700/80 mb-8 leading-relaxed">
                                    If you find value in what we're building, consider supporting us with a coffee.
                                    Every contribution helps us keep this platform free and focused on quality.
                                </p>

                                <button
                                    onClick={handleCoffeeClick}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500/90 to-yellow-500/90 text-white font-semibold text-lg shadow-lg backdrop-blur-xl border border-white/20 hover:from-orange-600/90 hover:to-yellow-600/90 transition-all duration-200 flex items-center gap-3 mx-auto group"
                                >
                                    <span className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                                        ☕
                                    </span>
                                    <span>Buy Me a Coffee</span>
                                    <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                                        ➡️
                                    </span>
                                </button>

                                <p className="text-sm text-zinc-600 mt-4">
                                    Opens in a new tab • Secure payment via Buy Me a Coffee
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-12">
                        <Link href="/">
                            <button className="px-8 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-700 font-semibold text-base shadow-lg hover:bg-white/40 hover:border-blue-400/50 hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2 mx-auto">
                                <span>🏠</span>
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Coffee Modal Overlay */}
            {showCoffeeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/30 text-center">
                        <div className="text-4xl mb-4 animate-bounce">☕</div>
                        <h3 className="text-xl font-semibold text-zinc-900 mb-2">Opening Buy Me a Coffee...</h3>
                        <p className="text-zinc-600">Redirecting you to our support page</p>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
