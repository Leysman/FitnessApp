import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './SignupPage.module.scss';


const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError   = useSelector(state => state.auth.isError);

  const handleSignup = async (values, formikHelpers) => {
    const result = await dispatch(registerUser(values));
    formikHelpers.setSubmitting(false);

    if (registerUser.fulfilled.match(result)) {
      // при успехе редирект на логин
      navigate('/login');
    }
    // при ошибке флаг isError покажет сообщение
  };


  return (
    
    <section className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Create your account</h1>

          <SignupForm
            onSubmit={handleSignup}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        
    </section>
    
  );
};

export default SignupPage;