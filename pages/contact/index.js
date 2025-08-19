import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function ContactPage() {
    const [isHovered, setIsHovered] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const email = 'itstrawberryfresh@gmail.com';

    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`;
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const handleContactSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const seoConfig = {
        title: "Contact Us",
        description: "Get in touch with StrawberryFresh - We love hearing from our community!",
        canonical: "https://strawberryfresh.com/contact",
        openGraph: {
            title: "Contact Us | StrawberryFresh",
            description: "Get in touch with StrawberryFresh - We love hearing from our community!",
            url: "https://strawberryfresh.com/contact",
            type: "website",
        },
        twitter: {
            cardType: "summary",
            title: "Contact Us | StrawberryFresh",
            description: "Get in touch with StrawberryFresh - We love hearing from our community!",
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-red-400/5 to-pink-500/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl w-full">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-6xl mb-4 animate-bounce">🍓</div>
                                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                                    Get in Touch
                                </h1>
                                <p className="text-xl text-zinc-700/80 max-w-2xl mx-auto leading-relaxed">
                                    We love hearing from our strawberry community! Whether you have feedback,
                                    suggestions, or just want to say hello, we're here to listen.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Email Contact Card */}
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">📧</div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-4">Email Us</h3>
                                <p className="text-zinc-700/80 mb-6">
                                    Send us an email and we'll get back to you as soon as possible!
                                </p>

                                <div className="space-y-4">
                                    <div
                                        className="bg-white/30 backdrop-blur-xl rounded-xl p-4 border border-white/40 cursor-pointer transition-all duration-300 hover:bg-white/40 hover:border-blue-400/50 hover:shadow-blue-500/20 group"
                                        onClick={handleEmailClick}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-900 font-medium break-all">
                                                {email}
                                            </span>
                                            <div className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                                                ➡️
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCopyEmail}
                                        className="w-full px-6 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-700 font-semibold text-base shadow-lg hover:bg-white/40 hover:border-blue-400/50 hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span>{isCopied ? '✅' : '📋'}</span>
                                        {isCopied ? 'Copied!' : 'Copy Email'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Card */}
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-4">Quick Contact</h3>
                                <p className="text-zinc-700/80 mb-6">
                                    Prefer to send us a message directly? Click below to open your email client.
                                </p>

                                <button
                                    onClick={handleContactSuccess}
                                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white font-semibold text-base shadow-lg backdrop-blur-xl border border-white/20 hover:from-blue-700/90 hover:to-blue-800/90 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <span>✉️</span>
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Response Time Info */}
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-3xl mb-4">⏰</div>
                            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Response Time</h3>
                            <p className="text-zinc-700/80 mb-4">
                                We typically respond within 24 hours during business days.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-600">
                                <span className="bg-white/30 backdrop-blur-xl rounded-lg px-3 py-1">Monday - Friday</span>
                                <span className="bg-white/30 backdrop-blur-xl rounded-lg px-3 py-1">9 AM - 6 PM</span>
                                <span className="bg-white/30 backdrop-blur-xl rounded-lg px-3 py-1">24h Response</span>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-8">
                        <Link href="/">
                            <button className="px-8 py-3 rounded-xl bg-white/30 backdrop-blur-xl border border-white/40 text-zinc-700 font-semibold text-base shadow-lg hover:bg-white/40 hover:border-blue-400/50 hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2 mx-auto">
                                <span>🏠</span>
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span>Email client opened successfully!</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px) translateX(-50%); }
                    to { opacity: 1; transform: translateY(0) translateX(-50%); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}