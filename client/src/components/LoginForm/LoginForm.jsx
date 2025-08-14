import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.scss';
import CustomInput from '../CustomInput/index.jsx';
import { Link } from 'react-router-dom';

 // Схема валидации через Yup
  const validationSchema = Yup.object({
    loginOrEmail: Yup.string().matches(/^[a-zA-Z0-9]{3,10}$/, 'Login 3-10 Latin characters or numbers').required('Login is required'),
    password: Yup.string().required('Password is required'),
  });

const LoginForm = ({ onSubmit, isLoading, isError, errorMsg }) => {
    return (
      <Formik
        initialValues={{
          loginOrEmail: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.container}>

              <CustomInput type="text" name="loginOrEmail" id="loginOrEmail" placeholder="Login 3-10 Latin characters or numbers" label="Your Login*" />
              
              <CustomInput type="password" name="password" id="password" placeholder="Min 8 characters, 1 uppercase, 1 number" label="Password*" />
              
              <div className={styles.wrapperActions}>
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot password?</Link>

                <button className={styles.btnSubmit} type="submit" disabled={isSubmitting || isLoading}>
                  {isLoading || isSubmitting ? 'Please wait...' : 'Log In'}
                </button>
              </div>
              


              {errorMsg && (
                <div className={styles.error}>
                  {errorMsg}
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    )
}

export default LoginForm;