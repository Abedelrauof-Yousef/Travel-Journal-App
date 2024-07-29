import { useState, useEffect } from 'react';
import { database, ref, push, set, onValue, update } from '../Firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../Firebase/firebase';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    
    const fetchComments = () => {
      onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        const commentsArray = data ? Object.entries(data).map(([id, comment]) => ({ id, ...comment })) : [];
        setComments(commentsArray);
      });
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    try {
      const commentsRef = ref(database, 'comments');
      const newCommentRef = push(commentsRef);
      await set(newCommentRef, {
        text: newComment,
        timestamp: new Date().toISOString(),
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        replies: {},
        deleted: false
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (replyText.trim() === '') return;

    try {
      const replyRef = ref(database, `comments/${commentId}/replies`);
      const newReplyRef = push(replyRef);
      await set(newReplyRef, {
        text: replyText,
        timestamp: new Date().toISOString(),
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        deleted: false
      });
      setReplyText('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentRef = ref(database, `comments/${commentId}`);
      await update(commentRef, { deleted: true });

      // Soft delete replies as well
      const repliesRef = ref(database, `comments/${commentId}/replies`);
      onValue(repliesRef, (snapshot) => {
        const replies = snapshot.val();
        if (replies) {
          Object.keys(replies).forEach(async (replyId) => {
            await update(ref(database, `comments/${commentId}/replies/${replyId}`), { deleted: true });
          });
        }
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-heading">Leave a Comment</h3>
      {user ? (
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            rows="4"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <div className="comment-form-actions">
            <button type="submit" className="comment-submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <p>Please sign in to leave a comment.</p>
      )}
      <div className="comments-list">
        {comments
          .filter(comment => !comment.deleted)
          .map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.username}</strong>: {comment.text}</p>
              {user && (
                <>
                  <button onClick={() => setReplyTo(comment.id)}>Reply</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </>
              )}
              {replyTo === comment.id && (
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                  <textarea
                    placeholder="Write your reply here..."
                    rows="2"
                    value={replyText}
                    onChange={handleReplyChange}
                  ></textarea>
                  <button type="submit">Submit Reply</button>
                </form>
              )}
              {comment.replies && Object.entries(comment.replies)
                .filter(([_, reply]) => !reply.deleted)
                .map(([replyId, reply]) => (
                  <div key={replyId} className="reply">
                    <p><strong>{reply.username}</strong>: {reply.text}</p>
                  </div>
                ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CommentSection;
