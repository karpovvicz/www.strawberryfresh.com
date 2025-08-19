// Icon mapping based on NavMenu
const getCategoryIcon = (title) => {
    const iconMap = {
        'technology': '💻',
        'news': '📰',
        'business': '💼',
        'entertainment': '🎬',
        'music': '🎵',
        'gaming': '🎮',
        'sports': '🏅',
        'lifestyle': '🌱',
        'funny': '😂',
        'collections': '📚',
        'about': 'ℹ️',
        'terms': '📋',
        'privacy-policy': '🔒',
        'contact': '✉️'
    };
    return iconMap[title.toLowerCase()] || '📄'; // Default icon if category not found
};

export default function CategoryHeader({ icon, title, className = "" }) {
    // Use provided icon or get from title mapping
    const displayIcon = icon || getCategoryIcon(title);

    return (
        <h1 className={`flex items-center gap-3 px-5 py-3 text-lg font-semibold text-[#0c1507] no-underline rounded-xl border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-pink-200/50 hover:text-[#d83e3e] hover:scale-[1.05] hover:-translate-y-0.5 ${className}`}>
            {displayIcon} {title}
        </h1>
    );
}