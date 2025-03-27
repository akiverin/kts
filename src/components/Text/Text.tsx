import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
}: TextProps) => {
  return (
    <Tag
      className={classNames(styles.text, className, {
        [styles['text--w-bold']]: weight === 'bold',
        [styles['text--w-medium']]: weight === 'medium',
        [styles[`text--v-${view}`]]: view,
        [styles[`text--c-${color}`]]: color,
      })}
      style={{ WebkitLineClamp: maxLines ? maxLines : 'auto' }}
    >
      {children}
    </Tag>
  );
};

export default Text;
