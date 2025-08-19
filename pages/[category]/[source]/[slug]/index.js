import { MongoClient } from 'mongodb';
import PostDetail from '../../../../components/posts/PostDetail';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';

export default function PostPage({ postData }) {
    if (!postData) {
        return <h1>Post not found</h1>;
    }

    const seoConfig = {
        title: postData.title,
        description: postData.description || `Check out this ${postData.category} post from ${postData.source}`,
        canonical: `https://strawberryfresh.com/${postData.category}/${postData.source}/${postData.slug}`,
        openGraph: {
            title: postData.title,
            description: postData.description || `Check out this ${postData.category} post from ${postData.source}`,
            url: `https://strawberryfresh.com/${postData.category}/${postData.source}/${postData.slug}`,
            type: 'article',
            article: {
                publishedTime: postData.createdAt,
                modifiedTime: postData.createdAt,
                section: postData.category,
                authors: [postData.source],
            },
            images: postData.image ? [
                {
                    url: postData.image,
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                }
            ] : [],
        },
        twitter: {
            cardType: 'summary_large_image',
            title: postData.title,
            description: postData.description || `Check out this ${postData.category} post from ${postData.source}`,
            images: postData.image ? [postData.image] : [],
        },
        additionalMetaTags: [
            {
                name: 'article:published_time',
                content: postData.createdAt,
            },
            {
                name: 'article:section',
                content: postData.category,
            },
            {
                name: 'article:author',
                content: postData.source,
            },
        ],
    };

    return (
        <Fragment>
            <NextSeo {...seoConfig} />
            <PostDetail {...postData} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { category, source, slug } = context.params;

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = db.collection('posts');
        const post = await postsCollection.findOne({
            category,
            source,
            slug,
        });

        if (!post) {
            return { notFound: true };
        }

        return {
            props: {
                postData: {
                    id: post._id.toString(),
                    title: post.title,
                    image: post.image,
                    video: post.video ?? null,
                    address: post.address,
                    description: post.description,
                    slug: post.slug,
                    createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
                    subreddit: post.subreddit,
                    upvotes: post.upvotes,
                    comment: post.comment,
                    category: post.category ?? '',
                    source: post.source ?? '',
                },
            },
        };
    } catch (error) {
        console.error('Post detail page error:', error);
        return { notFound: true };
    } finally {
        if (client) {
            client.close();
        }
    }
}
