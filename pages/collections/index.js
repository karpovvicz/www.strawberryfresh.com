import { NextSeo } from 'next-seo';
import Link from 'next/link';
import styles from './collections.module.css';
import PageContainer from '../../components/layout/PageContainer';
import CategoryHeader from '../../components/layout/CategoryHeader';
import { MongoClient } from 'mongodb';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getMonthName(monthIndex) {
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ][monthIndex];
}

export default function CollectionsPage({ collections }) {
    const seoConfig = {
        title: "Collections",
        description: "Browse curated collections of posts from Reddit, X, and YouTube. Find the best content organized by category, source, and date.",
        canonical: "https://strawberryfresh.com/collections",
        openGraph: {
            title: "Collections | StrawberryFresh",
            description: "Browse curated collections of posts from Reddit, X, and YouTube. Find the best content organized by category, source, and date.",
            url: "https://strawberryfresh.com/collections",
            type: "website",
        },
        twitter: {
            cardType: "summary",
            title: "Collections | StrawberryFresh",
            description: "Browse curated collections of posts from Reddit, X, and YouTube.",
        },
    };

    return (
        <>
            <NextSeo {...seoConfig} />
            <PageContainer>
                <CategoryHeader title="Collections" />
                <div><br></br></div>
                <div className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#0c1507] rounded-xl border border-white/20 backdrop-blur-md shadow-md bg-white/20 transition-all duration-200 mb-6 sm:mb-8 text-center">
                    Discover curated collections of the best posts from Reddit, X, and YouTube. Browse by category, source, and date to find exactly what you're looking for.
                </div>
                <div className={styles.collectionsGrid}>
                    {collections.map(({ href, label, icon, description, source }) => (
                        <Link
                            key={href}
                            href={href}
                            className={styles.collectionCard}
                        >
                            <div className={styles.cardContent}>
                                <img src={icon} alt={`${source} icon`} className={styles.iconImg} />
                                <div className={styles.textContent}>
                                    <h3 className={styles.title}>{label}</h3>
                                    <p className={styles.description}>{description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </PageContainer>
        </>
    );
}

export async function getServerSideProps() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const postsCollection = db.collection('posts');
    const posts = await postsCollection.find({}, { projection: { source: 1, createdAt: 1 } }).toArray();
    client.close();

    // Build a set of unique (source, year, month) combinations
    const collectionSet = new Set();
    posts.forEach(post => {
        if (!post.source || !post.createdAt) return;
        const date = new Date(post.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        collectionSet.add(`${post.source}|${year}|${month}`);
    });

    // Map to array of collection objects
    const iconMap = {
        reddit: '/icons/Reddit.png',
        x: '/icons/x.png',
        youtube: '/icons/yt.png',
    };
    const collections = Array.from(collectionSet).map(key => {
        const [source, year, month] = key.split('|');
        const monthName = getMonthName(Number(month));
        const label = `Best of ${capitalize(source)} - ${monthName} ${year}`;
        const href = `/collections/best-of-${source}-${monthName.toLowerCase()}-${year}`;
        return {
            href,
            label,
            icon: iconMap[source] || '/icons/x.png',
            source,
            description: `Top posts from ${capitalize(source)} in ${monthName} ${year}`,
        };
    }).sort((a, b) => b.label.localeCompare(a.label)); // Sort newest first

    return {
        props: {
            collections,
        },
    };
}