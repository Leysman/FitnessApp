import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SignupForm.module.scss';
import CustomInput from '../CustomInput';

 // Схема валидации через Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
      .required('Name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last Name must contain only letters')
      .required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    login: Yup.string().matches(/^[a-zA-Z0-9]{3,10}$/, 'Login 3-10 Latin characters or numbers')
      .required('Login is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/\d/, 'Must contain at least one number'),
  });

const SignupForm = ({ onSubmit, isLoading, isError }) => {
    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          login: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.container}>
              <CustomInput type="text" name="firstName" id="firstName" placeholder="John" label="Name*" />
              <CustomInput type="text" name="lastName" id="lastName" placeholder="Scott" label="Last Name*" />
              <CustomInput type="email" name="email" id="email" placeholder="ivanov92@gmail.com" label="Email*" />
              <CustomInput type="text" name="login" id="login" placeholder="ivanov27" label="Your Login*" />
              <CustomInput type="password" name="password" id="password" placeholder="Min 8 characters, 1 uppercase, 1 number" label="Password*" />

              <button className={styles.btnSubmit} type="submit" disabled={isSubmitting || isLoading}>
                {isLoading || isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>


              {isError && (
                <div className={styles.error}>
                  Registration failed. Please try again.
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    )
}

export default SignupForm;