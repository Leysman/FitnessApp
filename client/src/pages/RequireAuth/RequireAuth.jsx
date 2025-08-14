import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../../redux/slices/userSlice';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const dispatch = useDispatch();

  // Всегда вызываем хуки в одном порядке
  const userId = useSelector(state => state.auth.user?.id);
  const { profile } = useSelector(state => state.user);

  // Загружаем полный профиль, когда у нас есть userId
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  // Редирект если не вошли
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // Спиннер пока профиль загружается
  if (!profile) {
    return <div>Loading profile…</div>;
  }

  // Доступ разрешён
  return <Outlet />;
};

export default RequireAuth;
