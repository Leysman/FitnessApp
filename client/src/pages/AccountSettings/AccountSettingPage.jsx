// src/pages/AccountSettingPage/AccountSettingPage.jsx
import React from 'react';
import styles from './AccountSettingPage.module.scss';
import ChangeForm from '../../components/ChangeForm/ChangeForm';

export default function AccountSettingPage() {
  return (
    <div className={styles.accountSettings}>
      <h2 className={styles.titlePage}>Account Settings</h2>

      <div className={styles.wrapperForms}>
        <ChangeForm enableReinitialize />
      </div>
    </div>
  );
}

