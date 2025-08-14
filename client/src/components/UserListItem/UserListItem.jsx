import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser, fetchUserById } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import styles from './UserListItem.module.scss';
import classNames from 'classnames';

const UserListItem = ({ user }) => {
    const dispatch = useDispatch();

    // профиль текущего юзера с массивом .followers
    const profile = useSelector(state => state.user.profile);
    
    const isFollowing = profile?.followers?.some(follower => follower._id === user._id);

    console.log(isFollowing)
    const handleToggle = async () => {
      try {
         // ждем, пока API выполнит (и первое, и второе обновление на сервере)
        await dispatch(isFollowing
          ? unfollowUser(user._id)
          : followUser(user._id)
        ).unwrap();

      } catch (err) {
        console.error('Follow/unfollow error:', err);
        // здесь можно запустить toast или inline-сообщение об ошибке
      }
    };

  return (
    <div className={styles.itemWrapper}>
        <Link to={`/profiles/${user._id}`} className={styles.item}>
      <img
        src={user.avatarUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className={styles.avatar}
      />
      <span className={styles.name}>
        {user.firstName} {user.lastName}
      </span>
    </Link>

    <button
        className={classNames(styles.followBtn, 
          {
            [styles.unsubscribe]: isFollowing,
            [styles.subscribe]: !isFollowing,
          }
        )}
        onClick={handleToggle}
      >
        {isFollowing ? 'Unsubscribe' : 'Subscribe'}
     </button>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    _id:       PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName:  PropTypes.string.isRequired,
    avatarUrl: PropTypes.string
  }).isRequired
};

export default UserListItem;
