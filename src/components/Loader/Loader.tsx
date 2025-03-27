import React from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }: LoaderProps) => {
  return (
    <div
      className={classNames(
        styles.loader,
        size === 's' && styles.loaderSmall,
        size === 'm' && styles.loaderMedium,
        className && className,
      )}
    >
      <div className={styles.circle}></div>
    </div>
  );
};

export default Loader;
