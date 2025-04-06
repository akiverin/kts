import React, { useCallback, useEffect, useState } from 'react';
import styles from './CategoriesList.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Pagination from 'components/Paganation';
import Loader from 'components/Loader';
import { useSearchParams, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { CategoryListStore } from 'entities/category/stores/CategoryListStore';
import { Meta } from 'utils/meta';
import SearchBar from 'components/SearchBar';

const categoryListStore = new CategoryListStore();

const CategoriesList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [localSearch, setLocalSearch] = useState('');
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setLocalSearch(search);
    categoryListStore.setSearchQuery(search);
    categoryListStore.fetchCategories(page);
  }, [searchParams, page]);

  const onSearch = useCallback(() => {
    setSearchParams({
      search: localSearch,
      page: '1',
    });
  }, [localSearch, setSearchParams]);

  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set('page', page.toString());
        return prev;
      });
    },
    [setSearchParams],
  );

  const handleCardClick = useCallback(
    (categoryId: number) => {
      navigate(`/?category=${categoryId}`);
    },
    [navigate],
  );

  const renderContent = () => {
    if (categoryListStore.meta === Meta.loading) {
      return (
        <div className={styles.loader}>
          <Text view="title" weight="bold">
            Loading...
          </Text>
          <Loader />
        </div>
      );
    }

    if (categoryListStore.meta === Meta.error) {
      return (
        <Text view="title" weight="bold">
          {categoryListStore.error}
        </Text>
      );
    }

    if (categoryListStore.categories.length === 0) {
      return (
        <Text view="title" weight="bold">
          No categories found
        </Text>
      );
    }
    console.log(categoryListStore.categories);
    return (
      <>
        <div className={styles.grid}>
          {categoryListStore.categories.map((category) => (
            <Card
              key={category.id}
              className={styles.card}
              image={category.imageUrl}
              title={category.name}
              contentSlot={`${category.recipeCount} recipes`}
              subtitle={`Created: ${category.createdAt}`}
              onClick={() => handleCardClick(category.id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={categoryListStore.pagination.page}
          totalPages={categoryListStore.pagination.pageCount}
          onPageChange={onPageChange}
        />
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Text view="title" tag="h1" weight="bold">
          Meals Categories
        </Text>
        <Text view="p-20" color="secondary">
          Explore our wide range of meal categories. Click on any category to view related recipes.
        </Text>
      </div>

      <div className={styles.controls}>
        <SearchBar placeholder="Search categories" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
      </div>

      {renderContent()}
    </div>
  );
});

export default CategoriesList;
