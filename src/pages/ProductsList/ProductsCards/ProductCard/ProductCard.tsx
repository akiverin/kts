import React, { useCallback, useState } from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import Text from 'components/Text';

export type ProductCardProps = {
  /** Дополнительный classname */
  className?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Массив изображений карточки */
  images?: { url: string }[];
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
  images,
  captionSlot,
  title,
  desc,
  contentSlot,
  actionSlot,
  onClick,
}) => {
  const imageArray = images && images.length > 0 ? images : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    },
    [imageArray.length],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    },
    [imageArray.length],
  );

  return (
    <div onClick={onClick} className={classNames(styles['product-card'], className)}>
      {imageArray.length > 0 && (
        <div className={styles['product-card__header']}>
          <img src={imageArray[currentImageIndex].url} alt="Card image" className={styles['product-card__image']} />
          {imageArray.length > 1 && (
            <div className={styles.slider}>
              <button type="button" onClick={handlePrev} className={styles.slider__button}>
                &#8249;
              </button>
              <button type="button" onClick={handleNext} className={styles.slider__button}>
                &#8250;
              </button>
            </div>
          )}
        </div>
      )}
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
