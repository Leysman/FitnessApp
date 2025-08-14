import styles from './LoginPage.module.scss';
import { loginUser } from '../../redux/slices/authSlice';
import { fetchWorkouts } from '../../redux/slices/workoutsSlice';
import { fetchUserAwards } from '../../redux/slices/awardsSlice';
import FitHero from '../../assets/images/FitnessGirlLogin.png'; // Замени на актуальный путь
import LoginForm from '../../components/LoginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError   = useSelector(state => state.auth.isError);
  const errorMsg  = useSelector(state => state.auth.error);

  const handleLogin = async (values, formikHelpers) => {
      const result = await dispatch(loginUser(values));
      formikHelpers.setSubmitting(false);
  
      if (loginUser.fulfilled.match(result)) {
        await dispatch(fetchWorkouts());
        await dispatch(fetchUserAwards());
        // при успехе редирект на логин
        navigate('/account');
      }
      // при ошибке флаг isError покажет сообщение
    };


  return (
    <section className={styles.loginPageSection}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1 className={styles.titleLogin}>Log in</h1>
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            isError={isError}
            errorMsg={errorMsg}
          />
        </div>
        <div className={styles.imageWrapper}>
          <img src={FitHero} alt="Fit woman exercising" />
        </div>
      </div>   
    </section>
  );
};

export default LoginPage;