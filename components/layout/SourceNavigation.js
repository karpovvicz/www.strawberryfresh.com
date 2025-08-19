import Link from 'next/link';

export default function SourceNavigation({ category, sources }) {
    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {sources.map((source) => (
                <Link
                    key={source.href}
                    href={source.href}
                    className="flex items-center gap-3 px-5 py-3 text-lg font-semibold text-[#0c1507] no-underline rounded-xl border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 w-full mt-4 hover:bg-pink-200/50 hover:text-[#d83e3e] hover:scale-[1.05] hover:-translate-y-0.5"
                >
                    {source.icon}
                    <span>{source.name}</span>
                </Link>
            ))}
        </div>
    );
}