// src/hooks/useUpdateUser.js
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/userSlice';

export default function useUpdateUser() {
  const dispatch = useDispatch();
  const { profile, isUpdating, updateError } = useSelector(state => state.user);

  const updateProfile = (formData ) => {
    if (!profile) return Promise.reject();
    // возвращаем promise от dispatch
    return dispatch(updateUser({ id: profile._id, data: formData }));
  };

  return { profile, isUpdating, updateError, updateProfile };
}
