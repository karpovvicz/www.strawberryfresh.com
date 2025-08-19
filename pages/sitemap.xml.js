
import { MongoClient } from 'mongodb';

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"\n\r]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            case '\n': return '';
            case '\r': return '';
        }
    });
}

function getMonthName(monthIndex) {
    return [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ][monthIndex];
}

function generateSiteMap({ posts, categories, categorySources, collections }) {
    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://strawberryfresh.com/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/new-post</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/privacy-policy</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/terms-of-service</loc>
    <lastmod>${now}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://strawberryfresh.com/collections</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Dynamic Post Pages -->
  ${posts.map(post => `
  <url>
    <loc>https://strawberryfresh.com/${escapeXml(post.category)}/${escapeXml(post.source)}/${escapeXml(post.slug)}</loc>
    <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}

  <!-- Category Index Pages -->
  ${categories.map(cat => `
  <url>
    <loc>https://strawberryfresh.com/${escapeXml(cat.category)}</loc>
    <lastmod>${new Date(cat.lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Category/Source Pages -->
  ${categorySources.map(cs => `
  <url>
    <loc>https://strawberryfresh.com/${escapeXml(cs.category)}/${escapeXml(cs.source)}</loc>
    <lastmod>${new Date(cs.lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

  <!-- Collections -->
  ${collections.map(col => `
  <url>
    <loc>https://strawberryfresh.com/collections/best-of-${escapeXml(col.source)}-${escapeXml(col.month)}-${escapeXml(col.year)}</loc>
    <lastmod>${new Date(col.lastmod).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const postsCollection = db.collection('posts');
        const posts = await postsCollection.find({}, { projection: { slug: 1, category: 1, source: 1, createdAt: 1 } }).toArray();

        // Category index pages
        const categoryMap = new Map();
        // Category/source pages
        const categorySourceMap = new Map();
        // Collections
        const collectionMap = new Map();

        posts.forEach(post => {
            // Category
            if (post.category) {
                if (!categoryMap.has(post.category)) {
                    categoryMap.set(post.category, post.createdAt);
                } else if (new Date(post.createdAt) > new Date(categoryMap.get(post.category))) {
                    categoryMap.set(post.category, post.createdAt);
                }
            }
            // Category/Source
            if (post.category && post.source) {
                const key = `${post.category}|${post.source}`;
                if (!categorySourceMap.has(key)) {
                    categorySourceMap.set(key, post.createdAt);
                } else if (new Date(post.createdAt) > new Date(categorySourceMap.get(key))) {
                    categorySourceMap.set(key, post.createdAt);
                }
            }
            // Collections (source, year, month)
            if (post.source && post.createdAt) {
                const date = new Date(post.createdAt);
                const year = date.getFullYear();
                const month = getMonthName(date.getMonth());
                const key = `${post.source}|${year}|${month}`;
                if (!collectionMap.has(key)) {
                    collectionMap.set(key, post.createdAt);
                } else if (new Date(post.createdAt) > new Date(collectionMap.get(key))) {
                    collectionMap.set(key, post.createdAt);
                }
            }
        });

        const categories = Array.from(categoryMap.entries()).map(([category, lastmod]) => ({ category, lastmod }));
        const categorySources = Array.from(categorySourceMap.entries()).map(([key, lastmod]) => {
            const [category, source] = key.split('|');
            return { category, source, lastmod };
        });
        const collections = Array.from(collectionMap.entries()).map(([key, lastmod]) => {
            const [source, year, month] = key.split('|');
            return { source, year, month, lastmod };
        });

        // Generate the XML sitemap
        const sitemap = generateSiteMap({ posts, categories, categorySources, collections });

        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
        res.write(sitemap);
        res.end();

        return { props: {} };
    } catch (error) {
        console.error('Sitemap error:', error);
        // Return empty sitemap on error
        const sitemap = generateSiteMap({ posts: [], categories: [], categorySources: [], collections: [] });
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
        res.write(sitemap);
        res.end();
        return { props: {} };
    } finally {
        if (client) {
            client.close();
        }
    }
}

export default SiteMap;