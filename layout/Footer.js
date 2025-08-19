import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const categoryLinks = [
        { href: '/technology', label: 'Technology', description: 'Latest tech news and innovations' },
        { href: '/news', label: 'News', description: 'Breaking news and current events' },
        { href: '/business', label: 'Business', description: 'Business insights and market updates' },
        { href: '/entertainment', label: 'Entertainment', description: 'Movies, TV, and celebrity news' },
        { href: '/music', label: 'Music', icon: '🎵', description: 'Songs, albums, and artist news' },
        { href: '/gaming', label: 'Gaming', icon: '🎮', description: 'Video games, reviews, and esports' },
        { href: '/sports', label: 'Sports', description: 'Sports highlights and analysis' },
        { href: '/lifestyle', label: 'Lifestyle', description: 'Health, wellness, and lifestyle tips' },
        { href: '/funny', label: 'Funny', description: 'Humor and viral content' },
    ];

    const sourceLinks = [
        { href: '/gaming/youtube', label: 'YouTube Gaming', icon: '/icons/yt.png' },
        { href: '/technology/x', label: 'X Technology', icon: '/icons/x.png' },
        { href: '/news/reddit', label: 'Reddit News', icon: '/icons/Reddit.png' },
        { href: '/music/youtube', label: 'YouTube Music', icon: '/icons/yt.png' },

    ];

    const importantLinks = [
        { href: '/collections', label: 'Collections', description: 'Curated content collections' },
        { href: '/about', label: 'About Us', description: 'Learn about StrawberryFresh' },
        { href: '/contact', label: 'Contact', description: 'Get in touch with us' },
        { href: '/terms-of-service', label: 'Terms of Service', description: 'Our terms and conditions' },
        { href: '/privacy-policy', label: 'Privacy Policy', description: 'How we protect your data' },
    ];

    return (
        <footer className="bg-white/10 backdrop-blur-xl border-t border-white/20 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <h3 className="font-bold text-2xl text-zinc-800" style={{ fontFamily: 'More Sugar' }}>
                                StrawberryFresh
                            </h3>
                        </Link>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                            Your daily editorial of top-voted content from Reddit, X, and YouTube. Fresh, fun, and fruity content curated for you.
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🍓</span>
                            <span className="text-sm text-zinc-600">Fresh content daily</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-4">Categories</h4>
                        <ul className="space-y-2">
                            {categoryLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-sm text-zinc-600 hover:text-purple-600 transition-colors duration-200 block"
                                        title={link.description}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Sources */}
                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-4">Popular Sources</h4>
                        <ul className="space-y-2">
                            {sourceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-sm text-zinc-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <img 
                                            src={link.icon} 
                                            alt={link.label} 
                                            className="w-4 h-4 object-contain"
                                        />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-4">Important Links</h4>
                        <ul className="space-y-2">
                            {importantLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-sm text-zinc-600 hover:text-purple-600 transition-colors duration-200 block"
                                        title={link.description}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-zinc-600">
                            © {currentYear} StrawberryFresh. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <Link href="/sitemap.xml" className="text-zinc-600 hover:text-purple-600 transition-colors">
                                Sitemap
                            </Link>
                            <Link href="/collections" className="text-zinc-600 hover:text-purple-600 transition-colors">
                                Collections
                            </Link>
                            <Link href="/about" className="text-zinc-600 hover:text-purple-600 transition-colors">
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 