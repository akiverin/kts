import React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, afterSlot, onChange, className, ...props }: InputProps, ref) => {
    return (
      <div
        className={classNames(styles.inputContainer, className, {
          [styles['input-container--icon']]: afterSlot,
        })}
      >
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          {...props}
        />
        {afterSlot}
      </div>
    );
  },
);

export default Input;
