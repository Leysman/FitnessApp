import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AccountPage from './pages/AccountPage/AccountPage';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import AccountSettingPage from './pages/AccountSettings/AccountSettingPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />


      <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<AccountSettingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/workouts" element={<WorkoutPage />} />
          
      </Route>   
    </Routes>
  );
}

