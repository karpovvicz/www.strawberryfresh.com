import { MongoClient } from 'mongodb';

export async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;
        let client;

        try {
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const postsCollection = db.collection('posts');

            const result = await postsCollection.insertOne(data);
            console.log(result);

            res.status(201).json({
                message: 'Post successfully created!',
            });
        } catch (error) {
            console.error('New post API error:', error);
            res.status(500).json({
                message: 'Failed to create post',
            });
        } finally {
            if (client) {
                client.close();
            }
        }
    } else {
        res.status(405).json({
            message: 'Method not allowed!',
        });
    }
}

export default handler;