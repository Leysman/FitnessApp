import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import userReducer from './redux/slices/userSlice';
import postsReducer from './redux/slices/postsSlice';
import workoutsReducer from "./redux/slices/workoutsSlice";
import awardsReducer from "./redux/slices/awardsSlice";
import goalsReducer from "./redux/slices/goalsSlice";
import usersReducer from "./redux/slices/usersSlice";
import commentsReducer from "./redux/slices/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
    workouts: workoutsReducer,
    awards: awardsReducer,
    goals: goalsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export default store;