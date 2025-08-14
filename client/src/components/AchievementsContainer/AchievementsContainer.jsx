import  { useMemo } from 'react';
import styles from './AchievementsContainer.module.scss';
import { useAchievementsData } from '../../hooks/useAchievementsData';
import { ACHIEVEMENT_CONFIG } from '../../constants/achievements';
import AwardProgress from '../AwardProgress/AwardProgress';

const AchievementsContainer = () => {
  const { workouts, goals, user, initialLoading, error } = useAchievementsData();

  // базовые метрики
  const workoutsCount = workouts.length;
  const goalsCount    = goals.filter(g => g.completed).length;
  const diffDays      = Math.floor((Date.now() - new Date(user.date)) / (1000*60*60*24));
  const initW         = user.initialWeight || 0;
  const currW         = user.currentWeight || initW;
  const lostKgFromWorkouts = workoutsCount * 0.1;


  // сборка полного списка ачивок
  const achievements = useMemo(() => {
    return Object.entries(ACHIEVEMENT_CONFIG).map(([key, cfg]) => {
      let prog = 0;
      switch (key) {
        case 'welcome':
          prog = user.avatarUrl ? 1 : 0;
          break;
        case 'first_workout':
        case 'streak3':
          prog = Math.min(workoutsCount, cfg.threshold);
          break;
        case 'first_goal':
        case 'third_goal':
          prog = Math.min(goalsCount, cfg.threshold);
          break;
        case 'lost1kg':
           prog = Math.min(lostKgFromWorkouts, cfg.threshold);
          break;
        case 'loyal_customer_30_day':
          prog = Math.min(diffDays, cfg.threshold);
          break;
        default:
          prog = 0;
      }
      const threshold = (cfg.threshold && cfg.threshold > 0) ? cfg.threshold : 1;
      const rawPct = (prog / threshold) * 100;
      const pct    = Math.round(rawPct);
      
      const percent = Number.isFinite(pct) ? pct : 0;
      const completed = prog >= cfg.threshold;

      return {
        ...cfg,
        key,
        title:     cfg.title,      // если есть в константе
        progress:  prog,
        percent,
        completed
      };
    });
  }, [workoutsCount, goalsCount, diffDays, lostKgFromWorkouts, user.avatarUrl]);

  if (initialLoading) {
  return <div>Loading achievements…</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.achievementsContainerContainer}>
      {achievements.map(a => (
        <AwardProgress
          key={a.key}
          size={140}
          strokeWidth={10}
          color={a.completed ? '#00b37e' : '#999'}
          iconSrc={a.img}
          percent={a.percent}
          completed={a.completed}
          title={a.title}
        />
      ))}
    </div>
  );
};

export default AchievementsContainer;
