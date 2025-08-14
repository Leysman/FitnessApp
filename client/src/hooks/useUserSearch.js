// hooks/useUserSearch.js
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slices/usersSlice';
import { useEffect } from 'react';

export function useUserSearch(debouncedQuery, currentUserId) {
  const dispatch = useDispatch();
  const users = useSelector(s => s.users.items);
  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  if (!debouncedQuery) return [];
  return users
    .filter(u => u._id !== currentUserId)
    .filter(u =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase())
    );
}
