import { NavLink } from 'react-router-dom';
import styles from './GuestNav.module.scss';
import classNames from 'classnames';
import ButtonLink from '../../../ButtonLink/ButtonLink';

const GuestNav = () => {
  return (
    <nav>
      <ul className={styles.authLinks}>
        <li>
          <ButtonLink to="/login" titleName="Login"/>
        </li>
        <li>
          <ButtonLink to="/signup" titleName="Sign Up"/>
        </li>
      </ul>
    </nav>
  );
};

export default GuestNav;
