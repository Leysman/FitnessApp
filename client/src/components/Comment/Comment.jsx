import PropTypes from 'prop-types';
import styles from './Comment.module.scss';

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <img
        src={comment.user.avatarUrl}
        alt={comment.user.username}
        className={styles.commentAvatar}
      />
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.username}>{comment.user.firstName} {comment.user.lastName}</p>
          <span className={styles.date}>
            {new Date(comment.date).toLocaleString()}
          </span>
        </div>
        <p className={styles.text}>{comment.content}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id:     PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date:    PropTypes.string,
    user:    PropTypes.shape({
      username:  PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Comment;
