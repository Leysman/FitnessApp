import React from 'react';
import PropTypes from 'prop-types';
import styles from './AwardProgress.module.scss';

const AwardProgress = ({
  size = 140,
  strokeWidth = 10,
  color = '#00b37e',
  iconSrc,
  percent = 0,
  completed = false,
  title
}) => {
  const radius       = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // смещение штриха так, чтобы отрисовалось именно `percent`%
  const offset       = circumference * (1 - percent / 100);

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <h2 className={styles.achievedPercent}>{percent}%</h2>
      <svg width={size} height={size} className={styles.svg}>
        {/* фоновой круг */}
        <circle
          className={styles.bgCircle}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* круг прогресса */}
        <circle
          className={styles.progressCircle}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>

      <div
        className={styles.iconWrapper}
        style={{
          filter: completed ? 'none' : 'grayscale(100%)'
        }}
      >
        <img className={styles.imgAward} src={iconSrc} alt={title} />
      </div>
      <h2 className={styles.achievedTitle}>{title}</h2>
    </div>
  );
};

AwardProgress.propTypes = {
  size:        PropTypes.number,
  strokeWidth: PropTypes.number,
  color:       PropTypes.string,
  iconSrc:     PropTypes.string.isRequired,
  percent:     PropTypes.number,
  completed:   PropTypes.bool,
  title:       PropTypes.string
};

export default AwardProgress;

