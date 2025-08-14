// src/components/Comments/CommentsList.jsx
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import styles from './CommentsList.module.scss';

const CommentsList = ({
  comments,
  isLoading,
  error,
  newComment,
  onCommentChange,
  onCommentSubmit
}) => (
  <div className={styles.commentsSection}>
    {isLoading  && <p>Loading comments...</p>}
    {error      && <p className={styles.error}>{error}</p>}

    <div className={styles.list}>
      {comments.map(c => <Comment key={c._id} comment={c} />)}
    </div>

    <form onSubmit={onCommentSubmit} className={styles.form}>
      <textarea
        className={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChange={e => onCommentChange(e.target.value)}
      />
      <button type="submit" className={styles.button} disabled={!newComment.trim()}>
        Send
      </button>
    </form>
  </div>
);

CommentsList.propTypes = {
  comments:        PropTypes.array.isRequired,
  isLoading:       PropTypes.bool.isRequired,
  error:           PropTypes.string,
  newComment:      PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
};

export default CommentsList;