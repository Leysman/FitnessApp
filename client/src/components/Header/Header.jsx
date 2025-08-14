import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import GuestNav from '../Navigation/HeaderNav/GuestNav/GuestNav';
import UserNav from '../Navigation/HeaderNav/UserNav/UserNav'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';


const Header = () => {
  const isAuth = useSelector(selectIsAuthenticated);

  return (
    <header className={styles.headerAuth}>
      <div className={styles.container}>
        <Logo />

        {isAuth ? (
          <UserNav />
        ) : (
          <GuestNav />  
        )}
      </div>
    </header>
  );
}

export default Header;