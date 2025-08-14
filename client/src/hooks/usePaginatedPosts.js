// hooks/usePaginatedPosts.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/postsSlice';

export function usePaginatedPosts({ initialLimit = 5, initialQuery = '' }) {
  const dispatch = useDispatch();
  const { items: posts, total, isLoading, error } = useSelector(s => s.posts);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Дебаунс
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 450);
    return () => clearTimeout(timeout);
  }, [query]);

  // Сброс страницы при новом запросе
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  // Выбираем данные
  useEffect(() => {
    dispatch(fetchAllPosts({ page, limit, search: debouncedQuery }));
  }, [dispatch, page, limit, debouncedQuery]);

  const loadMore = () => {
    if (!isLoading && posts.length < total) {
      setPage(p => p + 1);
    }
  };

  return {
    posts,
    total,
    isLoading,
    error,
    query,
    setQuery,
    loadMore,
    hasMore: posts.length < total
  };
}
