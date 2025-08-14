import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';
import HeroHome from '../../components/HeroHome/HeroHome';
import SearchBar from '../../components/SearchBar/SearchBar';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import UserListItem from '../../components/UserListItem/UserListItem';
import PostCardsList from '../../components/PostCardList/PostCardList';
import { usePaginatedPosts } from '../../hooks/usePaginatedPosts';
import { useUserSearch } from '../../hooks/useUserSearch';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  const authUser = useSelector(s => s.auth.user);
  const currentUserId = authUser?.id;

  const {
    posts, total, isLoading, error,
    query, setQuery, loadMore, hasMore
  } = usePaginatedPosts({ initialLimit: 5 });

  

  const filteredUsers = useUserSearch(query, currentUserId);

  if (!isAuth) return <HeroHome />;

  return (
    <div className={styles.container}>
      <SearchBar
        placeholder="Search posts or users…"
        value={query}
        onChange={setQuery}
      />

      {filteredUsers.length > 0 && (
        <ul className={styles.userDropdown}>
          {filteredUsers.map(u => (
            <li key={u._id}><UserListItem user={u} /></li>
          ))}
        </ul>
      )}

      <CreatePostForm />

      {error && <p className={styles.error}>{error}</p>}

      <PostCardsList posts={posts} profilePosts="feed" />

      {hasMore && (
        <div className={styles.loadMore}>
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className={styles.loadMoreButton}
          >
            {isLoading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
