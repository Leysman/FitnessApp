import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addGoal, toggleGoal, deleteGoal } from '../../redux/slices/goalsSlice';
import styles from './UserGoals.module.scss';
import { ImCross } from 'react-icons/im';
import Goal from '../Goal/Goal';

const UserGoals = ({ goals }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('active'); // 'active' | 'completed'
  const [newGoalTitle, setNewGoalTitle] = useState('');

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);


   const handleCustomComplete = async (goal) => {
    try {
      await dispatch(toggleGoal({ id: goal._id, completed: !goal.completed })).unwrap();
    } catch (err) {
      console.error('Error toggling goal:', err);
    }
  };

  const handleAddGoal = async () => {
    const title = newGoalTitle.trim();
    if (!title) return;
    try {
      await dispatch(addGoal(title)).unwrap();
      setNewGoalTitle('');
    } catch (err) {
      console.error('Error adding custom goal:', err);
    }
  };



  return (
    <div className={styles.userGoalsContainer}>
      
      <h2 className={styles.sectionTitle}>My Goals</h2>

        <div className={styles.addGoalRow}>
          <input
            type="text"
            value={newGoalTitle}
            onChange={e => setNewGoalTitle(e.target.value)}
            placeholder="Enter a new goal"
            className={styles.inputAddGoal}
          />
          <button
            type="button"
            onClick={handleAddGoal}
            className={styles.addBtn}
          >
            Add My Goal
          </button>
        </div>



      <div className={styles.tabs}>
        <button
          className={tab === 'active' ? styles.activeTab : ''}
          onClick={() => setTab('active')}
        >
          Active
        </button>
        <button
          className={tab === 'completed' ? styles.activeTab : ''}
          onClick={() => setTab('completed')}
        >
          Completed
        </button>
      </div>

      {tab === 'active' && (
        <ul className={styles.goalList}>
          {activeGoals.map(goal => (
             <Goal
              key={goal._id}
              id={goal._id}
              title={goal.title}
              isComplete={goal.completed}
              typeGoal="userGoal"
              onComplete={() => handleCustomComplete(goal)}
              deleteGoal={() => dispatch(deleteGoal(goal._id))}
            />
          ))}
        </ul>
      )}

      {tab === 'completed' && (
        <ul className={styles.goalList}>
          {completedGoals.map(goal => (
            <li key={goal._id} className={styles.goalItem}>
              <h3 className={styles.goalTitle}>{goal.title}</h3>
              <span className={styles.completedLabel}>
                 {new Date(goal.date).toLocaleDateString()} ✓
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

UserGoals.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      completedAt: PropTypes.string,
    })
  ).isRequired,
};

export default UserGoals;