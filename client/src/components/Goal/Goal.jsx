  import { useState } from 'react';
  import { useEffect } from 'react';
  import styles from './Goal.module.scss';
  import PropTypes from 'prop-types';
  import { ImCross } from "react-icons/im";
  /**
   * Компонент Goal отображает цель с кнопкой Complete.
   * При нажатии кнопки меняется состояние completed и показывается зеленая галочка.
   */
  const Goal = ({ id, title, onComplete, typeGoal, deleteGoal, isComplete, disabled }) => {
    const [completed, setCompleted] = useState(false);
    
    
    // если цель была заблокирована извне, сразу ставим completed
    useEffect(() => {
      if (disabled) {
        setCompleted(true);
      }
    }, [disabled]);



    const handleClick = (e) => {
      e.preventDefault(); 
      if (!completed) {
        setCompleted(true);
        if (onComplete) onComplete(id);
      }
    };

    return (

    <>
        <li className={styles.goalItem}>
          <h3 className={styles.goalTitle}>{title}</h3>

          <div className={styles.btnWrapper}>
            <button
              type="button"
              className={styles.completeButton}
              onClick={handleClick}
              disabled={completed || disabled}
            >
              {completed ? 'Completed' : 'Complete'}
            </button>
            {typeGoal === 'templateGoal' && (
              <span className={`${styles.checkmark} ${completed ? styles.visible : ''}`}>
                ✓
              </span>
            )}
            {typeGoal === 'userGoal' && (
              <button
                type="button"
                className={styles.btnCross}
                onClick={deleteGoal}
              >
                <ImCross className={styles.iconCross}/>
              </button>
            )}
          </div>
        </li>
    </>
    );
  };

 Goal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onComplete: PropTypes.func,
  deleteGoal: PropTypes.func,
  typeGoal: PropTypes.oneOf(['templateGoal', 'userGoal']),
  disabled: PropTypes.bool
};

  Goal.defaultProps = {
  onComplete: null,
  deleteGoal: null,
  typeGoal: 'templateGoal',
  disabled: false
}

  export default Goal;