import styles from './TemplateGoals.module.scss';
import Goal from '../Goal/Goal';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkout } from '../../redux/slices/workoutsSlice';


const TemplateGoals = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.user);

  // 1) Вычисляем сегодняшнюю дату и дату прошлого клика
  const todayString = new Date().toDateString();
  const lastClick = profile.lastClickWorkout
    ? new Date(profile.lastClickWorkout)
    : null;
  const lastClickString = lastClick ? lastClick.toDateString() : null;

  // 2) Блокировка для First Workout «раз в сутки»
  const disableFirstWorkout = lastClickString === todayString;


  const templateGoals = [
    { id: 'first_workout', title: 'First Workout', disabled: disableFirstWorkout },
    // { id: 'walk_10000_steps', title: 'Walk 10 000 steps' }
  ];


  const handleTemplateComplete = async (id) => {
      if (id === 'first_workout') {
        try {
          await dispatch(addWorkout()).unwrap();
        } catch (err) {
          console.error('Error adding workout:', err);
        }
      }
      if (id === 'walk_10000_steps') {
        try {
          // await dispatch(addGoal('Walk 10000 steps')).unwrap();
          alert('Walk 10000 steps')
        } catch (err) {
          console.error('Error adding goal:', err);
        }
      }
    };


  return (
    <>
      <h2 className={styles.sectionTitle}>Template Goals</h2>
      <ul className={styles.goalList}>
          {templateGoals.map(goal => (
              <Goal
                  key={goal.id}
                  id={goal.id}
                  title={goal.title}
                  disabled={goal.disabled}
                  typeGoal="templateGoal"
                  onComplete={() => handleTemplateComplete(goal.id)}
              />
          ))}
        </ul>
    </>
      
  )
};

export default TemplateGoals;