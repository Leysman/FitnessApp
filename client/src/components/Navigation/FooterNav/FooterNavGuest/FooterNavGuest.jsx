import styles from './FooterNavGuest.module.scss';
import { NavLink } from 'react-router';

const FooterNavGuest = () => {

  return (

    <>
        <nav>
          <ul className={styles.authLinks}>
            <li>
              <NavLink to="/" className={styles.footerNav} >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={styles.footerNav} >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={styles.footerNav}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
    </>
  );

}

export default FooterNavGuest;