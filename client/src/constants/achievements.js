// src/constants/achievements.js
import welcomeImg from '../assets/awards/welcome.png';
import firstWorkoutImg from '../assets/awards/first_workout.png';
import streak3Img from '../assets/awards/streak3.png';
import firstGoalImg from '../assets/awards/first_goal.png';
import thirdGoalImg from '../assets/awards/third_goal.png';
import lostOneKG from '../assets/awards/lost1kg.png';
import thirtyDaysTogether from '../assets/awards/30days.png'; 

export const ACHIEVEMENT_CONFIG = {
  welcome: {
    threshold: 1,
    img:       welcomeImg,
    title:     'Welcome'
  },
  first_workout: {
    threshold: 1,
    img:       firstWorkoutImg,
    title:     'First Workout'
  },
  streak3: {
    threshold: 3,
    img:       streak3Img,
    title:     'Third Workout'
  },
  first_goal: {
    threshold: 1,
    img:       firstGoalImg,
    title:     'First Goal'
  },
  third_goal: {
    threshold: 3,
    img:       thirdGoalImg,
    title:     'Third Goal'
  },
  lost1kg: {
    threshold: 1,
    img:       lostOneKG,
    title:     '1KG Goal'
  },
  loyal_customer_30_day: {
    threshold: 30,
    img:       thirtyDaysTogether,
    title:     '30-Day Together'
  },
  
};
