import { MongoClient } from 'mongodb';
import PostList from '../../components/posts/PostList';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import PageContainer from '../../components/layout/PageContainer';
import CategoryHeader from '../../components/layout/CategoryHeader';
import SourceNavigation from '../../components/layout/SourceNavigation';

export default function CategoryPage({ posts, category }) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const seoConfig = {
        title: `${capitalizedCategory} Posts`,
        description: `Discover the best ${category} content from Reddit, X, and YouTube. Browse curated ${category} posts on StrawberryFresh.`,
        canonical: `https://strawberryfresh.com/${category}`,
        openGraph: {
            title: `${capitalizedCategory} Posts | StrawberryFresh`,
            description: `Discover the best ${category} content from Reddit, X, and YouTube. Browse curated ${category} posts on StrawberryFresh.`,
            url: `https://strawberryfresh.com/${category}`,
            type: 'website',
        },
        twitter: {
            cardType: 'summary',
            title: `${capitalizedCategory} Posts | StrawberryFresh`,
            description: `Discover the best ${category} content from Reddit, X, and YouTube.`,
        },
    };

    const sources = [
        { name: 'Reddit', href: `/${category}/reddit`, icon: <img src="/icons/Reddit.png" alt="Reddit icon" className="h-5 w-5 object-contain" /> },
        { name: 'X (Twitter)', href: `/${category}/x`, icon: <img src="/icons/x.png" alt="X icon" className="h-5 w-5 object-contain" /> },
        { name: 'YouTube', href: `/${category}/youtube`, icon: <img src="/icons/yt.png" alt="Youtube icon" className="h-5 w-5 object-contain" /> },
    ];

    return (
        <>
            <NextSeo {...seoConfig} />
            <PageContainer>
                <CategoryHeader title={category} />
                <SourceNavigation category={category} sources={sources} />
                <PostList posts={posts} />
            </PageContainer>
        </>
    );
}

export async function getStaticPaths() {
    // Define the categories you want to support
    const categories = ['technology', 'news', 'business', 'entertainment', 'music', 'gaming', 'sports', 'lifestyle', 'funny'];

    const paths = categories.map((category) => ({
        params: { category },
    }));

    return {
        paths,
        fallback: false, // Return 404 for any category not in the list
    };
}

export async function getStaticProps(context) {
    const { category } = context.params;

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = db.collection('posts');

        // Get all posts for this category, sorted by newest first
        const posts = await postsCollection.find({ category }).sort({ createdAt: -1 }).toArray();

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
            },
            revalidate: 300, // Revalidate the page every 60 seconds
        };
    } catch (error) {
        console.error('Category page error:', error);
        return {
            props: {
                posts: [],
                category,
            },
        };
    } finally {
        if (client) {
            client.close();
        }
    }
}