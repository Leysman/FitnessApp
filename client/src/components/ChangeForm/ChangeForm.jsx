// src/components/ChangeForm/ChangeForm.jsx
import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useChangePassword from '../../hooks/useChangePassword';
import useUpdateUser from '../../hooks/useUpdateUser';
import styles from './ChangeForm.module.scss';
import CustomInput from '../CustomInput';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif'];

const schema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
    .notRequired(),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last Name must contain only letters')
    .notRequired(),
  email: Yup.string().email('Invalid email format').notRequired(),

  avatar: Yup.mixed().nullable()
    .test(
      'fileSize',
      'File too large (max 2 MB)',
      file => !file || file.size <= MAX_FILE_SIZE
    )
    .test(
      'fileType',
      'Unsupported format (jpg, png, gif only)',
      file => !file || SUPPORTED_FORMATS.includes(file.type)
    ),

  newPassword: Yup.string()
    .notRequired()
    .test(
      'min-length',
      'Must be at least 8 characters',
      v => !v || v.length >= 8
    )
    .test(
      'has-uppercase',
      'Must contain at least one uppercase letter',
      v => !v || /[A-Z]/.test(v)
    )
    .test(
      'has-number',
      'Must contain at least one number',
      v => !v || /\d/.test(v)
    ),

  currentPassword: Yup.string().when('newPassword', {
    is: val => Boolean(val && val.length),
    then: schema => schema.required('Enter current password'),
    otherwise: schema => schema.notRequired()
  }),

  confirmPassword: Yup.string().when('newPassword', {
    is: val => Boolean(val && val.length),
    then: schema =>
      schema
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password'),
    otherwise: schema => schema.notRequired()
  }),
});

const ChangeForm = () => {
  const { profile, isUpdating, updateError, updateProfile } = useUpdateUser();
  const {
    isChangingPassword,
    changePasswordError,
    changePasswordSuccess,
    submitChange
  } = useChangePassword();

  // preview для аватара
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '');
  useEffect(() => {
    if (profile?.avatarUrl) setAvatarPreview(profile.avatarUrl);
  }, [profile?.avatarUrl]);

  const initialValues = {
    firstName: profile?.firstName || '',
    lastName:  profile?.lastName  || '',
    email:     profile?.email     || '',
    avatar: null,
    currentPassword: '',
    newPassword:     '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, actions) => {
        actions.setStatus({});
        try {
          // подготавливаем formData
          const { avatarFile, currentPassword, newPassword, confirmPassword, ...fields } = values;
          const formData = new FormData();
          Object.entries(fields).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
              formData.append(key, val);
            }
          });
          if (avatarFile) {
            formData.append('avatar', avatarFile)
          }

          // 1) обновляем профиль
          await updateProfile(formData).unwrap();

          // 2) если смена пароля
          if (currentPassword && newPassword) {
            await submitChange(currentPassword, newPassword).unwrap();
          }

          // 3) успех
          actions.setStatus({ success: 'Changes saved successfully!' });
          actions.resetForm({
            values: {
              ...fields,
              avatarFile: null,
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            }
          });
        } catch (err) {
          actions.setStatus({ error: err.message || 'Something went wrong' });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, status }) => (
        <Form className={styles.form}>
          {/* Превью аватарки */}
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className={styles.avatarPreview}
            />
          )}

          {/* Файл-аплоад */}
          <div className={styles.field}>
            <label htmlFor="avatarFile">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.currentTarget.files[0];
                setFieldValue('avatarFile', file);
                if (file) setAvatarPreview(URL.createObjectURL(file));
              }}
              className={styles.fileInput}
            />
            <ErrorMessage name="avatarFile" component="div" className={styles.error} />
          </div>

          {/* Обычные текстовые поля */}
          <CustomInput type="text" name="firstName" id="firstName" placeholder="John" label="Name" />
          <CustomInput type="text" name="lastName"  id="lastName"  placeholder="Scott" label="Last Name" />
          <CustomInput type="email" name="email"     id="email"     placeholder="ivanov92@gmail.com" label="Email" />

          {/* Смена пароля */}
          <CustomInput
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Current password"
            label="Current Password"
          />
          <CustomInput
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New password"
            label="New Password"
          />
          <CustomInput
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            label="Confirm Password"
          />

          {/* Статусы */}
          {updateError && <div className={styles.error}>{updateError}</div>}
          {status?.error && <div className={styles.error}>{status.error}</div>}
          {status?.success && <div className={styles.success}>{status.success}</div>}
          {changePasswordError && <div className={styles.error}>{changePasswordError}</div>}
          {changePasswordSuccess && <div className={styles.success}>{changePasswordSuccess}</div>}

          <button
            type="submit"
            disabled={isSubmitting || isUpdating || isChangingPassword}
            className={styles.btnSubmit}
          >
            {(isUpdating || isChangingPassword) ? 'Saving…' : 'Save Changes'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeForm;

