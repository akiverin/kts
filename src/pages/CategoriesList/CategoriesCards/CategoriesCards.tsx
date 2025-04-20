import React from 'react';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Card from 'components/Card';
import { Meta } from 'utils/meta';
import Pagination from 'components/Paganation';
import styles from './CategoriesCards.module.scss';
import { CategoryListStore } from 'entities/category/stores/CategoryListStore';

interface CategoriesCardsProps {
  categories: CategoryListStore['categories'];
  meta: CategoryListStore['meta'];
  error: CategoryListStore['error'];
  pagination: CategoryListStore['pagination'];
  onPageChange: (page: number) => void;
  handleCardClick: (categoryId: number) => void;
}

const CategoriesCards: React.FC<CategoriesCardsProps> = ({
  meta,
  error,
  categories,
  pagination,
  onPageChange,
  handleCardClick,
}) => {
  if (meta === Meta.loading) {
    return (
      <div className="loader">
        <Text view="title" weight="bold">
          Loading...
        </Text>
        <Loader />
      </div>
    );
  }

  if (meta === Meta.error) {
    return (
      <Text view="title" weight="bold">
        {error}
      </Text>
    );
  }

  if (categories.length === 0) {
    return (
      <Text view="title" weight="bold">
        No categories found
      </Text>
    );
  }
  return (
    <>
      <div className={styles.categories__grid}>
        {categories.map((category) => (
          <Card
            key={category.id}
            className={styles.categories__card}
            image={category.imageUrl}
            title={category.name}
            contentSlot={`${category.recipeCount} recipes`}
            subtitle={`Created: ${category.createdAt}`}
            onClick={() => handleCardClick(category.id)}
          />
        ))}
      </div>
      <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} onPageChange={onPageChange} />
    </>
  );
};

export default CategoriesCards;
