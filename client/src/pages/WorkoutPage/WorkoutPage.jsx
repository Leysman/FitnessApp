import styles from './WorkoutPage.module.scss';
import AchievementsContainer from '../../components/AchievementsContainer/AchievementsContainer';
import { useAchievementsData } from '../../hooks/useAchievementsData';
import TemplateGoals from '../../components/TemplateGoals/TemplateGoals';
import UserGoals from '../../components/UserGoals/UserGoals';

const WorkoutPage = () => {
  
  const { goals: customGoals, initialLoading, isUpdating, error } = useAchievementsData();

  if (initialLoading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Workouts</h1>

        <section>
          <AchievementsContainer />
        </section>

        <section className={styles.section}>
          <TemplateGoals />
        </section>

        <section className={styles.section}>
          <UserGoals goals={customGoals}/>
        </section>
        
    </div>
  );
};

export default WorkoutPage;

