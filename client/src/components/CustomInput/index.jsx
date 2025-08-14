// CustomInput.jsx
import { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import classNames from 'classnames';
import styles from './CustomInput.module.scss';

const CustomInput = ({ id, label, type = 'text', ...props }) => {
  const [field, meta] = useField(props);
  const { submitCount } = useFormikContext();
  const showError = Boolean(meta.error) && (meta.touched || submitCount > 0);

  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && visible ? 'text' : type;

  return (
    <div className={classNames(
      styles.inputWrapper,
      showError && styles.error
    )}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.fieldInner}>
        <input
          id={id}
          {...field}
          {...props}
          type={inputType}
          aria-invalid={showError}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {showError && (
        <p className={styles.errorMessage}>{meta.error}</p>
      )}
    </div>
  );
};

export default CustomInput;
