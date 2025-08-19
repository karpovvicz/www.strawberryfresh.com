import classes from './MainNavigation.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavMenu from './NavMenu';
import ThemeToggle from '../ui/ThemeToggle';

function MainNavigation({ search, setSearch }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <header className={`${classes.header} ${isScrolled ? classes.scrolled : ''}`}>
                <div className={classes.container}>
                    {/* Logo Section */}
                    <div className={classes.logoSection}>
                        <Link 
                            href='/' 
                            className={classes.logo}
                            aria-label="Go to homepage" 
                            onClick={(e) => {
                                if (router.asPath === '/' || router.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className={classes.logoText}>strawberryfresh</span>
                            <div className={classes.logoAccent}></div>
                        </Link>
                    </div>

                    {/* Search Section - Desktop */}
                    {typeof search === 'string' && typeof setSearch === 'function' && (
                        <div className={classes.searchSection}>
                            <div className={classes.searchContainer}>
                                <div className={classes.searchIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.35-4.35"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search posts..."
                                    aria-label="Search posts"
                                    className={classes.searchInput}
                                />
                                {search && (
                                    <button 
                                        onClick={() => setSearch('')}
                                        className={classes.clearButton}
                                        aria-label="Clear search"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions Section */}
                    <div className={classes.actionsSection}>
                        <ThemeToggle />
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(true)}
                            aria-label="Open navigation menu"
                            className={classes.menuButton}
                            type="button"
                        >
                            <div className={classes.menuIcon}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Search bar - Mobile */}
                {typeof search === 'string' && typeof setSearch === 'function' && (
                    <div className={classes.mobileSearch}>
                        <div className={classes.searchContainer}>
                            <div className={classes.searchIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search posts..."
                                aria-label="Search posts"
                                className={classes.searchInput}
                            />
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    className={classes.clearButton}
                                    aria-label="Clear search"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Navigation Menu */}
            <NavMenu open={isOpen} onClose={() => setIsOpen(false)} />

            {/* Mobile blur overlay */}
            {isOpen && (
                <div className={classes.overlay} onClick={() => setIsOpen(false)}></div>
            )}
        </>
    );
}

export default MainNavigation;
