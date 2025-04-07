import React, { useEffect, useState } from 'react';
import styles from './CheckBox.module.scss';
import classNames from 'classnames';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, checked, className, ...props }: CheckBoxProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(!!checked);
  useEffect(() => {
    if (isControlled) {
      setInternalChecked(!!checked);
    }
  }, [checked, isControlled]);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !internalChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange(newChecked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        disabled={disabled}
        checked={internalChecked}
        className={classNames('visuallyHidden', styles.checkbox__input)}
        onChange={(e) => {
          if (disabled) return;
          const newChecked = e.target.checked;
          if (!isControlled) {
            setInternalChecked(newChecked);
          }
          onChange(newChecked);
        }}
        {...props}
      />
      <button
        type="button"
        className={classNames(
          className,
          styles.checkbox__button,
          internalChecked && styles['checkbox__button--active'],
        )}
        onClick={handleToggle}
        disabled={disabled}
        aria-checked={internalChecked}
        role="checkbox"
      >
        {internalChecked && <CheckIcon width={40} height={40} />}
      </button>
    </label>
  );
};

export default CheckBox;
