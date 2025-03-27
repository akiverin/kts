import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, loading = false, children, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className && className, loading && 'buttonLoading')}
      disabled={loading}
      {...props}
    >
      {loading && <Loader className={styles.loader} size="s" />}
      {children}
    </button>
  );
};

export default Button;
