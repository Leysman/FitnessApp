import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../redux/slices/workoutsSlice';
import { fetchGoals }    from '../redux/slices/goalsSlice';

export function useAchievementsData() {
  const dispatch = useDispatch();

  // Читаем редьюсеры и гарантируем, что items всегда массив
  const {
    items: rawWorkouts = [],
    isLoading: workoutsLoading,
    error: workoutsError
  } = useSelector((s) => s.workouts || {});

  const {
    items: rawGoals = [],
    loading: goalsLoading,
    error: goalsError
  } = useSelector((s) => s.goals || {});

  const { profile: user = null, error: userError } = useSelector((s) => s.user || {});

  // Запрос данных один раз при монтировании
  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchGoals());
  }, [dispatch]);

  // Оборачиваем items, чтобы избежать null
  const workouts = Array.isArray(rawWorkouts) ? rawWorkouts : [];
  const goals = Array.isArray(rawGoals) ? rawGoals : [];

  const isLoading = workoutsLoading || goalsLoading;
  const error = workoutsError || goalsError || userError;

  return {
    workouts,
    goals,
    user,
    isLoading,
    error
  };
}
