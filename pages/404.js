import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function Custom404() {
    const [clickCount, setClickCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [floatingStrawberries, setFloatingStrawberries] = useState([]);

    // Easter egg: Click the 404 text multiple times
    const handleEasterEgg = () => {
        setClickCount(prev => {
            const newCount = prev + 1;
            if (newCount === 5) {
                setShowEasterEgg(true);
                // Add floating strawberries
                const strawberries = Array.from({ length: 10 }, (_, i) => ({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    delay: i * 0.2
                }));
                setFloatingStrawberries(strawberries);
            }
            return newCount;
        });
    };

    // Reset easter egg after 10 seconds
    useEffect(() => {
        if (showEasterEgg) {
            const timer = setTimeout(() => {
                setShowEasterEgg(false);
                setFloatingStrawberries([]);
                setClickCount(0);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [showEasterEgg]);

    const seoConfig = {
        title: "404 - Page Not Found",
        description: "Oops! Page not found",
        canonical: "https://strawberryfresh.com/404",
        noindex: true,
        nofollow: true,
    };

    return (
        <>
            <NextSeo {...seoConfig} />
            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-red-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Easter Egg Floating Strawberries */}
            {floatingStrawberries.map(strawberry => (
                <div
                    key={strawberry.id}
                    className="fixed pointer-events-none text-4xl animate-bounce"
                    style={{
                        left: strawberry.x,
                        top: strawberry.y,
                        animationDelay: `${strawberry.delay}s`,
                        animationDuration: '2s'
                    }}
                >
                    🍓
                </div>
            ))}

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-12 max-w-2xl w-full text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                    <div className="relative z-10">
                        {/* Main 404 Display */}
                        <div className="mb-8">
                            <h1
                                className="text-8xl md:text-9xl font-bold text-zinc-900 mb-4 cursor-pointer transition-all duration-300 hover:scale-105 select-none"
                                onClick={handleEasterEgg}
                                style={{
                                    textShadow: clickCount > 0 ? '0 0 20px rgba(220, 71, 38, 0.5)' : 'none',
                                    transform: clickCount > 0 ? `rotate(${clickCount * 2}deg)` : 'none'
                                }}
                            >
                                404
                            </h1>

                            {/* Click Counter Easter Egg */}
                            {clickCount > 0 && clickCount < 5 && (
                                <div className="text-sm text-zinc-600 mb-4 animate-fade-in">
                                    {5 - clickCount} more clicks... 🍓
                                </div>
                            )}
                        </div>

                        {/* Easter Egg Content */}
                        {showEasterEgg ? (
                            <div className="animate-fade-in-scale">
                                <div className="text-6xl mb-4 animate-bounce">🍓</div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                                    You found the strawberry! 🎉
                                </h2>
                                <p className="text-lg text-zinc-700/80 mb-6">
                                    Congratulations! You've discovered the secret strawberry garden.
                                    The strawberries are floating around you now!
                                </p>
                                <div className="text-sm text-zinc-600">
                                    This easter egg will disappear in 10 seconds...
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                                    Oops! Page Not Found
                                </h2>
                                <p className="text-lg text-zinc-700/80 mb-8 leading-relaxed">
                                    The page you're looking for seems to have wandered off into the strawberry fields.
                                    Maybe it's picking some fresh content for you?
                                </p>

                                {/* Hidden Hint */}
                                <div className="text-xs text-zinc-500/60 mb-6">
                                    💡 Hint: Try clicking the 404 number...
                                </div>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white font-semibold text-base shadow-lg backdrop-blur-xl border border-white/20 hover:from-blue-700/90 hover:to-blue-800/90 transition-all duration-200">
                                    🏠 Go Back Home
                                </button>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="px-8 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-700 font-semibold text-base shadow-lg hover:bg-white/40 transition-colors duration-200"
                            >
                                ⬅️ Go Back
                            </button>
                        </div>

                        {/* Fun Stats */}
                        <div className="mt-8 text-sm text-zinc-600/80">
                            <p>🍓 StrawberryFresh.com - Fresh content, fresh fun!</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.6s ease-out;
                }
            `}</style>
        </>
    );
}