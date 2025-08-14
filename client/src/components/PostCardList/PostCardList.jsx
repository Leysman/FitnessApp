// src/components/PostCard/PostCardList.jsx
import PropTypes from 'prop-types';
import cn from 'classnames';
import PostCardContainer from '../PostCardContainer/PostCardContainer';
import styles from './PostCardList.module.scss';

const PostCardsList = ({ posts, profilePosts }) => {
  const containerClass = cn({
    [styles.postsContainerGrid]: profilePosts === 'profile',
    [styles.postsContainerFlex]:  profilePosts === 'feed',
  });

  return (
    <div className={containerClass}>
      {posts.map(post => (
        <PostCardContainer
          key={post._id}
          post={post}
          profilePosts={profilePosts}
        />
      ))}
    </div>
  );
};

PostCardsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  profilePosts: PropTypes.oneOf(['profile', 'feed']).isRequired,
};

export default PostCardsList;

