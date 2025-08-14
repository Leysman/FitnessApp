import styles from './Navigation.module.scss';
import { NavLink } from 'react-router';
import classNames from 'classnames';

const Navigation = ({ footer = 'footer' }) => {

  return (

    <>
      {footer !== 'footer' ? (
        <nav className={styles.nav}>
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
      ) : (
        <nav className={styles.nav}>
          <ul className={styles.authLinks}>
            <li>
              <NavLink to="/login" className={({ isActive }) => classNames(styles.link, {[styles.active]: isActive } )} >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={({ isActive }) => classNames(styles.link, {[styles.active]: isActive } )}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>



      

  );

}


export default Navigation;