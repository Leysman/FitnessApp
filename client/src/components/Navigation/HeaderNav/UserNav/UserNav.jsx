import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './UserNav.module.scss';
import logoutIcon from '../../../../assets/icons/Logout.svg'
import { logout } from '../../../../redux/slices/authSlice';
import { clearProfile } from '../../../../redux/slices/userSlice';
import classNames from 'classnames';
import { IoSettingsSharp } from "react-icons/io5";
import { clearGoals } from '../../../../redux/slices/goalsSlice';
import { clearWorkouts } from '../../../../redux/slices/workoutsSlice';
import ButtonLink from '../../../ButtonLink/ButtonLink';

const UserNav = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    dispatch(clearGoals());
    dispatch(clearWorkouts());
    navigate('/');   // ← перенаправление на HomePage
  };


  return (
    <nav className={styles.nav}>
      <ul className={styles.authLinks}>
        <li>
          <ButtonLink to="/" titleName="Feed"/>
        </li>
        <li>
          <ButtonLink to="/account" titleName="Profile"/>
        </li>
        <li>
          <ButtonLink to="/workouts" titleName="Workouts"/>
        </li>
        <li>
          <NavLink to="/settings">
            <IoSettingsSharp className={styles.setting}/>
          </NavLink>
        </li>
        
        <li>
          <button className={styles.btnLogout} onClick={handleLogout}>
            <img className={styles.logout} src={logoutIcon} alt="Logout" />
          </button>
        </li>
        
      </ul>
    </nav>
  );
};

export default UserNav;