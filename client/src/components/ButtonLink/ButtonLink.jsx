import { NavLink } from 'react-router-dom';
import styles from './ButtonLink.module.scss';
import classNames from 'classnames';

const ButtonLink = ({ to, titleName }) => {
  return (
          <NavLink to={to} className={({ isActive }) => classNames(styles.link, {[styles.active]: isActive } )}>
            {titleName}
          </NavLink>
  );
};

export default ButtonLink;