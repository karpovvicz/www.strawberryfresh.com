import styles from './NavMenu.module.css';
import Link from 'next/link';

const categoryLinks = [
    { href: '/technology', label: 'Technology', icon: '💻', description: 'Latest tech news and innovations' },
    { href: '/news', label: 'News', icon: '📰', description: 'Breaking news and current events' },
    { href: '/business', label: 'Business', icon: '💼', description: 'Business insights and market updates' },
    { href: '/entertainment', label: 'Entertainment', icon: '🎬', description: 'Movies, TV, and celebrity news' },
    { href: '/music', label: 'Music', icon: '🎵', description: 'Songs, albums, and artist news' },
    { href: '/gaming', label: 'Gaming', icon: '🎮', description: 'Video games, reviews, and esports' },
    { href: '/sports', label: 'Sports', icon: '🏅', description: 'Sports highlights and analysis' },
    { href: '/lifestyle', label: 'Lifestyle', icon: '🌱', description: 'Health, wellness, and lifestyle tips' },
    { href: '/funny', label: 'Funny', icon: '😂', description: 'Humor and viral content' },
];

//gaming//music//movies//

const popularSourceLinks = [
    { href: '/news/reddit', label: 'Reddit News', icon: '/icons/Reddit.png', source: 'reddit' },
    { href: '/gaming/youtube', label: 'YouTube Gaming', icon: '/icons/yt.png', source: 'youtube' },
    { href: '/technology/x', label: 'X Technology', icon: '/icons/x.png', source: 'x' },
    { href: '/funny/reddit', label: 'Reddit Funny', icon: '/icons/Reddit.png', source: 'reddit' },
    { href: '/music/youtube', label: 'YouTube Music', icon: '/icons/yt.png', source: 'youtube' },

];

const importantLinks = [
    { href: '/collections', label: 'Collections', icon: '📚', description: 'Curated content collections' },
    { href: '/about', label: 'About Us', icon: 'ℹ️', description: 'Learn about StrawberryFresh' },
    { href: '/contact', label: 'Contact', icon: '✉️', description: 'Get in touch with us' },
    { href: '/terms-of-service', label: 'Terms of Service', icon: '📋', description: 'Our terms and conditions' },
    { href: '/privacy-policy', label: 'Privacy Policy', icon: '🔒', description: 'How we protect your data' },
];

export default function NavMenu({ open, onClose }) {
    if (!open) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose}></div>
            <aside className={styles.drawer}>
                {/* Header */}
                <div className={styles.header}>
                    <Link href="/" className={styles.logo} onClick={onClose}>
                        StrawberryFresh
                    </Link>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                {/* Navigation Content */}
                <div className={styles.navContent}>
                    {/* Categories Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Categories</h3>
                        <div className={styles.linkGrid}>
                            {categoryLinks.map(({ href, label, icon, description }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={styles.navLink}
                                    onClick={onClose}
                                    title={description}
                                >
                                    <span className={styles.linkIcon}>{icon}</span>
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkLabel}>{label}</span>
                                        <span className={styles.linkDescription}>{description}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Popular Sources Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Popular Sources</h3>
                        <div className={styles.linkGrid}>
                            {popularSourceLinks.map(({ href, label, icon, source }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={styles.navLink}
                                    onClick={onClose}
                                >
                                    <img 
                                        src={icon} 
                                        alt={source} 
                                        className={styles.sourceIcon}
                                    />
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkLabel}>{label}</span>
                                        <span className={styles.linkDescription}>Latest from {source}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Important Links Section */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Important Links</h3>
                        <div className={styles.linkGrid}>
                            {importantLinks.map(({ href, label, icon, description }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={styles.navLink}
                                    onClick={onClose}
                                    title={description}
                                >
                                    <span className={styles.linkIcon}>{icon}</span>
                                    <div className={styles.linkContent}>
                                        <span className={styles.linkLabel}>{label}</span>
                                        <span className={styles.linkDescription}>{description}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                        <Link href="/collections" className={styles.quickActionButton} onClick={onClose}>
                            <span className={styles.quickActionIcon}>📚</span>
                            <span>Browse Collections</span>
                        </Link>
                        <Link href="/about" className={styles.quickActionButton} onClick={onClose}>
                            <span className={styles.quickActionIcon}>ℹ️</span>
                            <span>About Us</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <div className={styles.footerContent}>
                        <span className={styles.footerText}>🍓 Fresh content daily</span>
                        <div className={styles.footerLinks}>
                            <Link href="/sitemap.xml" className={styles.footerLink} onClick={onClose}>
                                Sitemap
                            </Link>
                            <Link href="/collections" className={styles.footerLink} onClick={onClose}>
                                Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
