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
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
}) => {
  return (
    <div onClick={onClick} className={classNames(styles['product-card'], className)}>
      <div className={styles['product-card__body']}>
        <div className={styles['product-card__info']}>
          {captionSlot}
          <Text maxLines={2} weight="medium" view="p-20">
            {title}
          </Text>
          <Text maxLines={3} color="secondary" view="p-16">
            {desc}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={styles['product-card__footer']}>
            <div className={styles['product-card__content']}>{contentSlot}</div>
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
