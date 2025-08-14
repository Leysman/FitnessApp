import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import logoSrc from '../../assets/icons/logoFitnessApp.svg'


const Logo = () => {
  return (
    <>
      <Link to="/" className={styles.logo}>
        <img src={logoSrc} alt="Logo" />
        <span>FitnessApp</span>
      </Link>
    </>
  );
}

export default Logo;