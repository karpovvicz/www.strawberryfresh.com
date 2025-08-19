import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

// Accepts an optional callback that should return `true` once the page is ready for scroll restoration (e.g. enough items rendered).
// If omitted, the hook will restore immediately (previous behaviour).
export function useScrollRestoration(isReady = () => true) {
    const router = useRouter();
    const currentUrl = useRef(router.asPath); // store current url

    useEffect(() => {
        if (!('scrollRestoration' in window.history)) return;

        window.history.scrollRestoration = 'manual';

        const saveScrollPos = (url) => {
            // Get current scroll position
            const scrollData = { x: window.scrollX, y: window.scrollY };
            
            // Try to get additional context from the page if available
            if (typeof window !== 'undefined' && window.__SCROLL_CONTEXT__) {
                scrollData.postIndex = window.__SCROLL_CONTEXT__.postIndex;
                scrollData.windowStart = window.__SCROLL_CONTEXT__.windowStart;
                scrollData.timestamp = Date.now();
            }
            
            sessionStorage.setItem(
                `scrollPos:${url}`,
                JSON.stringify(scrollData)
            );
        };

        // Restores the scroll position for a given url. Will wait until `isReady()` returns true before attempting to scroll.
        const restoreScrollPos = (url) => {
            const stored = sessionStorage.getItem(`scrollPos:${url}`);
            if (stored) {
                const { x, y } = JSON.parse(stored);
                let attempts = 0;
                const maxAttempts = 30;
                const tryScroll = () => {
                    // Wait until consumer signals readiness (e.g., visibleCount loaded)
                    if (typeof isReady === 'function' && !isReady()) {
                        if (attempts < maxAttempts) {
                            attempts++;
                            setTimeout(tryScroll, 300);
                        }
                        return;
                    }
                    window.scrollTo(x, y);
                    if (window.scrollY !== y && attempts < maxAttempts) {
                        attempts++;
                        setTimeout(tryScroll, 300);
                    }
                };
                tryScroll();

                // Also restore once all content is loaded (images, etc.)
                const onLoad = () => {
                    window.scrollTo(x, y);
                    window.removeEventListener('load', onLoad);
                };
                window.addEventListener('load', onLoad);
            }
        };

        const handleRouteChangeStart = (url) => {
            // Save scroll for the current URL (before navigation)
            saveScrollPos(currentUrl.current);
        };

        const handleRouteChangeComplete = (url) => {
            // Update currentUrl to the new URL and restore scroll for it
            currentUrl.current = url;
            restoreScrollPos(url);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);

        // Clear scroll position cache on full page unload so next fresh visit starts at top
        const handleBeforeUnload = () => {
            sessionStorage.removeItem(`scrollPos:${currentUrl.current}`);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        // Restore scroll on initial load
        restoreScrollPos(router.asPath);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [router]);
}
