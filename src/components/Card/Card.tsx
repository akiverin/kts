import React from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';
import Text from '../Text';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}: CardProps) => {
  return (
    <div onClick={onClick} className={classNames(styles.card, className)}>
      <div className={styles.header}>
        <img src={image} alt="image card" className={styles.image} />
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          {captionSlot && captionSlot}
          <Text maxLines={2} weight="medium" view="p-20">
            {title}
          </Text>
          <Text maxLines={3} color="secondary" view="p-16">
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={styles.footer}>
            {contentSlot && (
              <Text color="accent" weight="bold" view="p-18">
                {contentSlot}
              </Text>
            )}
            {actionSlot && actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
