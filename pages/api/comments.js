import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get comments for a specific post
        const { postId, userId } = req.query;
        
        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        let client;
        try {
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const commentsCollection = db.collection('comments');
            
            const comments = await commentsCollection
                .find({ postId: postId })
                .sort({ createdAt: -1 })
                .toArray();

            // Add hasUpvoted property to each comment if userId is provided
            const commentsWithUpvoteStatus = comments.map(comment => ({
                ...comment,
                hasUpvoted: userId && comment.upvotedBy ? comment.upvotedBy.includes(userId) : false
            }));

            res.status(200).json(commentsWithUpvoteStatus);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error: 'Failed to fetch comments' });
        } finally {
            if (client) await client.close();
        }
    } else if (req.method === 'POST') {
        // Add a new comment
        const { postId, authorName, content } = req.body;
        
        if (!postId || !authorName || !content) {
            return res.status(400).json({ error: 'Post ID, author name, and content are required' });
        }

        let client;
        try {
            client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const commentsCollection = db.collection('comments');
            
            const newComment = {
                postId,
                authorName: authorName.trim(),
                content: content.trim(),
                upvotes: 0,
                createdAt: new Date(),
                _id: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9)
            };
            
            await commentsCollection.insertOne(newComment);
            
            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Failed to add comment' });
        } finally {
            if (client) await client.close();
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 