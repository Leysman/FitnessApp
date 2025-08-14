import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/slices/userSlice';

export default function useChangePassword() {
  const dispatch = useDispatch();
  const { isChangingPassword, changePasswordError, changePasswordSuccess } = useSelector(state => state.user);

  const submitChange = (currentPassword, newPassword) => {
    dispatch(changePassword({ currentPassword, newPassword }));
  };

  return { isChangingPassword, changePasswordError, changePasswordSuccess, submitChange };
}
