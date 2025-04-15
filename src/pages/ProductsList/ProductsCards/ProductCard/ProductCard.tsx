import React from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import Text from 'components/Text';

export type ProductCardProps = {
  /** Дополнительный classname */
  className?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  desc: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const ProductCard: React.FC<ProductCardProps> = ({
  className,
  captionSlot,
  title,
  desc,
  contentSlot,
  actionSlot,
  onClick,
}: ProductCardProps) => {
  return (
    <div onClick={onClick} className={classNames(styles.card, className)}>
      <div className={styles.card__body}>
        <div className={styles.card__info}>
          {captionSlot && captionSlot}
          <Text maxLines={2} weight="medium" view="p-20">
            {title}
          </Text>
          <Text maxLines={3} color="secondary" view="p-16">
            {desc}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={styles.card__footer}>
            <div className={styles.card__content}>{contentSlot && contentSlot}</div>
            {actionSlot && actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
