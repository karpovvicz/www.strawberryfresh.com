import { MongoClient } from 'mongodb';
import PostList from '../../../components/posts/PostList';
import { NextSeo } from 'next-seo';
import PageContainer from '../../../components/layout/PageContainer';
import { useRouter } from 'next/router';

export default function CategorySourcePage({ posts, category, source }) {
    const router = useRouter();

    // Capitalize first letter of category and source
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const capitalizedSource = source.charAt(0).toUpperCase() + source.slice(1);

    const seoConfig = {
        title: `${capitalizedCategory} - ${capitalizedSource}`,
        description: `Discover the best ${category} content from ${source}. Browse curated ${category} posts from ${source} on StrawberryFresh.`,
        canonical: `https://strawberryfresh.com/${category}/${source}`,
        openGraph: {
            title: `${capitalizedCategory} - ${capitalizedSource} | StrawberryFresh`,
            description: `Discover the best ${category} content from ${source}. Browse curated ${category} posts from ${source} on StrawberryFresh.`,
            url: `https://strawberryfresh.com/${category}/${source}`,
            type: 'website',
        },
        twitter: {
            cardType: 'summary',
            title: `${capitalizedCategory} - ${capitalizedSource} | StrawberryFresh`,
            description: `Discover the best ${category} content from ${source}.`,
        },
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        router.back();
    };

    return (
        <>
            <NextSeo {...seoConfig} />
            <PageContainer>
                <div className="flex items-center gap-3 px-5 py-3 text-lg font-semibold text-[#0c1507] no-underline rounded-xl border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-pink-200/50 hover:text-[#d83e3e] hover:scale-[1.05] hover:-translate-y-0.5 mb-8">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-900 transition-colors px-0 py-0 bg-transparent border-none outline-none cursor-pointer"
                        aria-label="Go back"
                        style={{ minWidth: '48px' }}
                    >
                        <span className="text-xl">←</span>
                        <span className="sr-only">Back</span>
                    </button>
                    <span className="capitalize">{capitalizedCategory} / {capitalizedSource}</span>
                </div>
                <PostList posts={posts} />
            </PageContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    const { category, source } = context.params;

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = db.collection('posts');
        const posts = await postsCollection.find({ category, source }).sort({ createdAt: -1 }).toArray();

        const mappedPosts = posts.map(each => ({
            id: each._id.toString(),
            title: each.title,
            image: each.image,
            video: each.video ?? null,
            address: each.address,
            description: each.description,
            slug: each.slug,
            createdAt: each.createdAt instanceof Date ? each.createdAt.toISOString() : each.createdAt,
            subreddit: each.subreddit,
            upvotes: each.upvotes,
            comment: each.comment,
            category: each.category ?? '',
            source: each.source ?? '',
        }));

        // Additional client-side sorting as fallback
        const sortedMappedPosts = mappedPosts.sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return {
            props: {
                posts: sortedMappedPosts,
                category,
                source,
            },
        };
    } catch (error) {
        console.error('Category source page error:', error);
        return {
            props: {
                posts: [],
                category,
                source,
            },
        };
    } finally {
        if (client) {
            client.close();
        }
    }
}