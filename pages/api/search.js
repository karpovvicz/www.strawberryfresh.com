import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export default async function handler(req, res) {
    const { title, description } = req.query;

    if (!title && !description) {
        return res.status(400).json({ error: 'Missing search query: provide title and/or description' });
    }

    // Build query
    const query = { $or: [] };
    if (title) {
        query.$or.push({ title: { $regex: title, $options: 'i' } });
    }
    if (description) {
        query.$or.push({ description: { $regex: description, $options: 'i' } });
    }
    // If only one, remove $or and use direct
    let mongoQuery = query;
    if (query.$or.length === 1) {
        mongoQuery = query.$or[0];
    }

    try {
        const { db } = await connectToDatabase();
        const posts = await db
            .collection('posts')
            .find(mongoQuery)
            .sort({ createdAt: -1 })
            .limit(20)
            .toArray();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
