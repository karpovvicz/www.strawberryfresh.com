import { useState, useEffect } from 'react';

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ authorName: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    // Generate or retrieve user ID on component mount
    useEffect(() => {
        let storedUserId = localStorage.getItem('strawberryfresh_user_id');
        if (!storedUserId) {
            storedUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('strawberryfresh_user_id', storedUserId);
        }
        setUserId(storedUserId);
    }, []);

    // Fetch comments on component mount
    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/comments?postId=${postId}&userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                setError('Failed to load comments');
            }
        } catch (error) {
            setError('Failed to load comments');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newComment.authorName.trim() || !newComment.content.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId,
                    authorName: newComment.authorName.trim(),
                    content: newComment.content.trim(),
                }),
            });

            if (response.ok) {
                const addedComment = await response.json();
                setComments([addedComment, ...comments]);
                setNewComment({ authorName: '', content: '' });
                setError(null);
            } else {
                setError('Failed to add comment');
            }
        } catch (error) {
            setError('Failed to add comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpvote = async (commentId) => {
        try {
            const response = await fetch('/api/comments/upvote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentId, userId }),
            });

            if (response.ok) {
                const updatedComment = await response.json();
                setComments(comments.map(comment => 
                    comment._id === commentId 
                        ? { ...comment, upvotes: updatedComment.upvotes, hasUpvoted: true }
                        : comment
                ));
            } else if (response.status === 400) {
                // User has already upvoted
                const data = await response.json();
                if (data.error === 'Already upvoted') {
                    // Update the comment to show it's already upvoted
                    setComments(comments.map(comment => 
                        comment._id === commentId 
                            ? { ...comment, hasUpvoted: true }
                            : comment
                    ));
                }
            }
        } catch (error) {
            console.error('Failed to upvote comment:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">💬</span>
                <h3 className="font-bold text-lg text-zinc-800">Comments</h3>
                <span className="bg-purple-500/20 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {comments.length}
                </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={newComment.authorName}
                            onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 text-zinc-800 placeholder-zinc-500 focus:bg-white/60 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-300 transition-all duration-300"
                            maxLength={50}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Share your thoughts..."
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 text-zinc-800 placeholder-zinc-500 focus:bg-white/60 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-300 transition-all duration-300 resize-none"
                            rows={3}
                            maxLength={500}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-500">
                            {newComment.content.length}/500 characters
                        </span>
                        <button
                            type="submit"
                            disabled={isSubmitting || !newComment.authorName.trim() || !newComment.content.trim()}
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-300/30 text-purple-700 font-semibold text-sm shadow-lg hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <span>📝</span>
                                    Post Comment
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-300/30">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        <span className="text-red-700 font-medium">{error}</span>
                    </div>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                            <span className="text-zinc-700 font-medium">Loading comments...</span>
                        </div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-4xl">💭</span>
                            <p className="text-zinc-600 font-medium">No comments yet</p>
                            <p className="text-zinc-500 text-sm">Be the first to share your thoughts!</p>
                        </div>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                                        <span className="text-purple-700 font-semibold text-sm">
                                            {comment.authorName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-800 text-sm">{comment.authorName}</p>
                                        <p className="text-zinc-500 text-xs">{formatDate(comment.createdAt)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUpvote(comment._id)}
                                    disabled={comment.hasUpvoted}
                                    title={comment.hasUpvoted ? 'Already upvoted!' : 'Upvote this comment'}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${
                                        comment.hasUpvoted
                                            ? 'bg-purple-500/30 border-purple-400/50 text-purple-700 cursor-not-allowed'
                                            : 'bg-white/30 border-white/40 text-zinc-700 hover:bg-white/50 hover:border-purple-400/50'
                                    }`}
                                >
                                    <span className={`text-lg transition-transform duration-300 ${
                                        comment.hasUpvoted 
                                            ? 'scale-110' 
                                            : 'group-hover:scale-110'
                                    }`}>
                                        {comment.hasUpvoted ? '❤️' : '⬆️'}
                                    </span>
                                    <span className="font-semibold text-sm">{comment.upvotes}</span>
                                </button>
                            </div>
                            <p className="text-zinc-700 leading-relaxed">{comment.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CommentSection; 