import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../redux/slices/postsSlice';


const usePostUser = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.auth.user.id);


    // берём сразу уже отфильтрованные на бэке:
    const {
      userItems: userPosts,
      userTotal: total,
      isUserLoading: isLoading,
      userError: error
    } = useSelector(state => state.posts);

    const [page, setPage] = useState(1);
    const limit = 6;

    // при монтировании и когда page или userId меняются — грузим “страницу” постов пользователя
    useEffect(() => {
      if (currentUserId) {
        dispatch(fetchUserPosts({ userId: currentUserId, page, limit }));
      }
    }, [dispatch, currentUserId, page]);


    // колбэк для “загрузить ещё”
    const loadMore = useCallback(() => {
      if (!isLoading && userPosts.length < total) {
        setPage(p => p + 1);
      }
    }, [isLoading, userPosts.length, total]);

     return {
      userPosts,
      isLoading,
      error,
      loadMore,
      hasMore: userPosts.length < total
  };
}

export default usePostUser; 