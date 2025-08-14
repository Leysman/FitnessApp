// src/components/PostCard/PostCardContainer.jsx
import PropTypes from 'prop-types';
import styles from './PostCardContainer.module.scss'
import { useToggleLike } from '../../hooks/useToggleLike';
import PostCard from '../PostCard/PostCard';

const PostCardContainer = ({ post, profilePosts }) => {
  const { likesCount, likedByMe, toggle } = useToggleLike(post._id);


  return (
    <div className={styles.potsContainer}>
      <PostCard
        post={post}
        likesCount={likesCount}
        likedByMe={likedByMe}
        onToggleLike={toggle}
        profilePosts={profilePosts}
      />
    </div>
    
  );
};

PostCardContainer.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default PostCardContainer;

