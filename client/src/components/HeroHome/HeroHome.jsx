import { Link } from 'react-router-dom';
import styles from './HeroHome.module.scss';
import FitHero from '../../assets/images/FitnessGirl.png';

const HeroHome = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Get started with FitnessApp</h1>
          <p>Crush your goals. Share your success.</p>
          <Link to="/signup" className={styles.cta}>Get Started</Link>
        </div>
        <div className={styles.imageWrapper}>
          <img src={FitHero} alt="Fit woman exercising" />
        </div>
      </div>   
    </section>
  );
}

export default HeroHome;