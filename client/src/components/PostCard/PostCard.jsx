// src/components/PostCard/PostCard.jsx
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { useComments } from '../../hooks/useComments';
import CommentsList from '../CommentsList/CommentsList';
import styles from './PostCard.module.scss';

const PostCard = ({
  post,
  likesCount,
  likedByMe,
  onToggleLike,
  profilePosts,
}) => {

  const [showComments, setShowComments] = useState(false);
  // Локальный стейт для счётчика комментариев
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);

 const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
    newComment,
    setNewComment,
    submit: onCommentSubmit,
    loadComments
  } = useComments(post._id);

  const toggleComments = useCallback(() => {
    // если собираемся открыть — подгружаем
    if (!showComments) loadComments();
    setShowComments(open => !open);
  }, [loadComments, showComments]);

  // Теперь точно есть onCommentSubmit — оборачиваем его
  const handleCommentSubmit = async (e) => {
    e.preventDefault(e);
    try {
      await onCommentSubmit(e);         // вызов хука
      setCommentCount(c => c + 1);     // локальный инкремент
      setNewComment('');               // очистить поле
    } catch (err) {
      console.error('Ошибка при отправке комментария', err);
    }
  };
  
  return (
    <div className={styles.postCard }>
      <div className={styles.header}>
        <img
          src={post.user.avatarUrl}
          alt={post.user.username}
          className={styles.avatar}
        />
        <h3 className={styles.username}>{post.user.firstName} {post.user.lastName}</h3>
      </div>


      {/* Картинка поста */}
      {profilePosts === 'profile' && (
        <div className={styles.imageWrapper}>
            <img
              src={post.imageUrls[0]}
              alt="Post image"
              className={styles.postCardImage}
            />
        </div>
      )}

      {profilePosts === 'feed' && (
        <div className={styles.imageWrapperFeed}>
            <img
              src={post.imageUrls[0]}
              alt="Post image"
              className={styles.postCardImageFeed}
            />
        </div>
      )}

      <p className={styles.postCardContent}>{post.content}</p>

      <div className={styles.actions}>
        <button type="button" onClick={onToggleLike} className={styles.likeButton}>
          {likedByMe ? <FaHeart className={styles.liked} />  : <FiHeart className={styles.notLiked}/>}
          <span className={styles.count}>{likesCount}</span>
        </button>

        <button className={styles.wrapperCommentsIcon} onClick={toggleComments}>
          <FaComment className={styles.iconComment}/>
          <span className={styles.count}>{commentCount}</span>      
        </button>
        
      </div>

      {/* Только когда showComments=true */}
      <div
        className={`${styles.commentsWrapper} ${
          showComments ? styles.open : ''
        }`}
      >
        {showComments && (
          <CommentsList
            postId={post._id}
            comments={comments}
            isLoading={commentsLoading}
            error={commentsError}
            newComment={newComment}
            onCommentChange={setNewComment}
            onCommentSubmit={handleCommentSubmit}
          />
        )}
      </div>     
    </div>
)};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  likesCount: PropTypes.number.isRequired,
  likedByMe: PropTypes.bool.isRequired,
  onToggleLike: PropTypes.func.isRequired,

  comments: PropTypes.array.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  commentsError: PropTypes.string,
  newComment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired
};

export default PostCard;
