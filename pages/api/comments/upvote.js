import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { commentId, userId } = req.body;
    
    if (!commentId || !userId) {
        return res.status(400).json({ error: 'Comment ID and User ID are required' });
    }

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const commentsCollection = db.collection('comments');
        
        // Check if user has already upvoted this comment
        const comment = await commentsCollection.findOne({ _id: commentId });
        
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        // Initialize upvotedBy array if it doesn't exist
        const upvotedBy = comment.upvotedBy || [];
        
        // Check if user has already upvoted
        if (upvotedBy.includes(userId)) {
            return res.status(400).json({ 
                error: 'Already upvoted',
                upvotes: comment.upvotes,
                hasUpvoted: true
            });
        }
        
        // Add upvote and track user
        const result = await commentsCollection.updateOne(
            { _id: commentId },
            { 
                $inc: { upvotes: 1 },
                $push: { upvotedBy: userId }
            }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        // Get the updated comment
        const updatedComment = await commentsCollection.findOne({ _id: commentId });
        
        res.status(200).json({
            ...updatedComment,
            hasUpvoted: true
        });
    } catch (error) {
        console.error('Error upvoting comment:', error);
        res.status(500).json({ error: 'Failed to upvote comment' });
    } finally {
        if (client) await client.close();
    }
} 