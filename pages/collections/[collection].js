import { MongoClient } from 'mongodb';
import PostList from '../../components/posts/PostList';
import { NextSeo } from 'next-seo';
import PageContainer from '../../components/layout/PageContainer';
import { useRouter } from 'next/router';

function parseCollectionName(collection) {
    // Example: best-of-reddit-2025, funnies-reddit-posts-july, most-viral-content-july2025
    // Expand this logic as needed for your naming conventions
    const lower = collection.toLowerCase();
    let filters = {};

    // Source
    if (lower.includes('reddit')) filters.source = 'reddit';
    if (lower.includes('x')) filters.source = 'x';
    if (lower.includes('youtube')) filters.source = 'youtube';

    // Category - Using ACTUAL categories from your site
    if (lower.includes('technology')) filters.category = 'technology';
    if (lower.includes('news')) filters.category = 'news';
    if (lower.includes('sports')) filters.category = 'sports';
    if (lower.includes('entertainment')) filters.category = 'entertainment';
    if (lower.includes('music')) filters.category = 'music';
    if (lower.includes('gaming')) filters.category = 'gaming';
    if (lower.includes('funny')) filters.category = 'funny';

    if (lower.includes('lifestyle')) filters.category = 'lifestyle';
    if (lower.includes('business')) filters.category = 'business';
    // Note: 'funny' category exists in nav but not in actual category pages
    // Keeping 'trending' for potential future use
    if (lower.includes('trending') || lower.includes('viral')) filters.category = 'trending';

    // Date (month/year)
    const monthMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)/);
    const yearMatch = lower.match(/20\d{2}/);
    if (monthMatch || yearMatch) {
        filters.date = { month: monthMatch ? monthMatch[0] : null, year: yearMatch ? yearMatch[0] : null };
    }

    return filters;
}

export default function CollectionPage({ posts, collection, filters, pagination, error }) {
    const router = useRouter();
    // Capitalize first letter of collection name (with dashes replaced by spaces)
    const formattedCollection = collection.replace(/-/g, ' ');
    const capitalizedCollection = formattedCollection.charAt(0).toUpperCase() + formattedCollection.slice(1);

    const handleBackClick = (e) => {
        e.preventDefault();
        router.back();
    };

    // Generate unique metadata for each collection
    const seoConfig = {
        title: `${capitalizedCollection} Collection`,
        description: `Curated collection: ${capitalizedCollection}. Discover the best posts filtered by category, source, and date.`,
        canonical: `https://strawberryfresh.com/collections/${collection}`,
        openGraph: {
            title: `${capitalizedCollection} | StrawberryFresh Collections`,
            description: `Curated collection: ${capitalizedCollection}. Discover the best posts filtered by category, source, and date.`,
            url: `https://strawberryfresh.com/collections/${collection}`,
            type: 'website',
            images: posts.length > 0 && posts[0].image ? [
                {
                    url: posts[0].image,
                    width: 1200,
                    height: 630,
                    alt: posts[0].title,
                }
            ] : [],
        },
        twitter: {
            cardType: 'summary_large_image',
            title: `${capitalizedCollection} | StrawberryFresh Collections`,
            description: `Curated collection: ${capitalizedCollection}. Discover the best posts filtered by category, source, and date.`,
            images: posts.length > 0 && posts[0].image ? [posts[0].image] : [],
        },
    };

    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
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
                    <span className="capitalize">{capitalizedCollection}</span>
                </div>
                {error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500 mb-4">{error}</p>
                        <p className="text-zinc-600">Try a different collection or check back later.</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-zinc-600 mb-4">No posts found for this collection.</p>
                        <p className="text-zinc-500">The collection might be empty or the filters didn't match any content.</p>
                    </div>
                ) : (
                    <>
                        {/* Posts Count */}
                        <div className="text-center mb-6">
                            <p className="text-zinc-600">
                                Showing {posts.length} of {pagination.totalPosts} posts
                                {pagination.totalPages > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
                            </p>
                        </div>
                        <PostList posts={posts} />
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8 mb-12">
                                {pagination.hasPrevPage && (
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-zinc-700 font-medium hover:bg-white/30 hover:border-blue-400/50 transition-all duration-200"
                                    >
                                        ← Previous
                                    </button>
                                )}
                                <div className="flex gap-2">
                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (pagination.totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (pagination.currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                            pageNum = pagination.totalPages - 4 + i;
                                        } else {
                                            pageNum = pagination.currentPage - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                    pageNum === pagination.currentPage
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-white/20 backdrop-blur-xl border border-white/30 text-zinc-700 hover:bg-white/30'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                {pagination.hasNextPage && (
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-zinc-700 font-medium hover:bg-white/30 hover:border-blue-400/50 transition-all duration-200"
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </PageContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    const { collection } = context.params;
    const { page = 1 } = context.query;
    const pageNumber = parseInt(page, 10);
    const pageSize = 12; // Posts per page
    const skip = (pageNumber - 1) * pageSize;

    const filters = parseCollectionName(collection);
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = db.collection('posts');

        // Build MongoDB query
        let query = {};
        if (filters.source) query.source = filters.source;
        if (filters.category) query.category = filters.category;

        // Date filtering (optional, expand as needed)
        if (filters.date && (filters.date.month || filters.date.year)) {
            let start, end;
            if (filters.date.year) {
                if (filters.date.month) {
                    // Month and year
                    const monthIndex = [
                        'january','february','march','april','may','june','july','august','september','october','november','december'
                    ].indexOf(filters.date.month);
                    if (monthIndex !== -1) {
                        start = new Date(Number(filters.date.year), monthIndex, 1);
                        end = new Date(Number(filters.date.year), monthIndex + 1, 1);
                    }
                } else {
                    // Just year
                    start = new Date(Number(filters.date.year), 0, 1);
                    end = new Date(Number(filters.date.year) + 1, 0, 1);
                }
                if (start && end) {
                    query.createdAt = { $gte: start.toISOString(), $lt: end.toISOString() };
                }
            }
        }

        // Get total count for pagination
        const totalPosts = await postsCollection.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / pageSize);

        // Get paginated posts
        const posts = await postsCollection
            .find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        // Map MongoDB docs to props
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

        return {
            props: {
                posts: mappedPosts,
                collection,
                filters,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalPosts,
                    hasNextPage: pageNumber < totalPages,
                    hasPrevPage: pageNumber > 1,
                },
                error: null,
            },
        };
    } catch (error) {
        console.error('Collection page error:', error);
        return {
            props: {
                posts: [],
                collection,
                filters,
                pagination: {
                    currentPage: 1,
                    totalPages: 0,
                    totalPosts: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
                error: 'Failed to load collection. Please try again later.',
            },
        };
    } finally {
        if (client) {
            client.close();
        }
    }
}