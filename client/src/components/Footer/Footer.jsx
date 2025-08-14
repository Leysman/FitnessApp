import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {


  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoSection}>
            <span>FitnessApp</span>
        </Link>
        

        

        <div className={styles.rights}>
          <p>© 2025 FitnessApp. All rights reserved.</p>
        </div>
      </div>
  </footer>
  );
}

export default Footer;