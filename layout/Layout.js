import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

function Layout(props) {
    return (
        <>
            <MainNavigation />
            {/* Search bar below navigation, only if enabled */}
            {typeof props.search === 'string' && typeof props.setSearch === 'function' && (
                <div className="w-full flex justify-center items-center py-4 bg-transparent">
                    <div className="relative w-full max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xl pointer-events-none" aria-hidden="true">🔍</span>
                        <input
                            type="text"
                            value={props.search}
                            onChange={e => props.setSearch(e.target.value)}
                            placeholder="Search..."
                            aria-label="Search posts"
                            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-400 transition-all duration-200"
                            style={{ fontSize: '1.1rem' }}
                        />
                    </div>
                </div>
            )}
            <main className={classes.main}>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;
