import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './CategoriesList.module.scss';
import Text from 'components/Text';
import { useSearchParams, useNavigate } from 'react-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { CategoryListStore } from 'entities/category/stores/CategoryListStore';
import SearchBar from 'components/SearchBar';
import { debounce } from 'utils/debounce';
import CategoriesCards from './CategoriesCards';

const CategoriesList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryListStore = useLocalObservable(() => new CategoryListStore());
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    categoryListStore.setSearchQuery(search);
    categoryListStore.fetchCategories(page);
  }, [categoryListStore, searchParams]);

  const onSearch = useMemo(
    () =>
      debounce(() => {
        setSearchParams({
          search: localSearch,
          page: '1',
        });
      }, 500),
    [localSearch, setSearchParams],
  );

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

  return (
    <div className={styles.categories__wrapper}>
      <div className={styles.categories__header}>
        <Text view="title" tag="h1" weight="bold">
          Meals Categories
        </Text>
        <Text view="p-20" color="secondary">
          Explore our wide range of meal categories. Click on any category to view related recipes.
        </Text>
      </div>

      <div className={styles.categories__controls}>
        <SearchBar placeholder="Search categories" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
      </div>

      <CategoriesCards
        categories={categoryListStore.categories}
        meta={categoryListStore.meta}
        error={categoryListStore.error}
        pagination={categoryListStore.pagination}
        onPageChange={onPageChange}
        handleCardClick={handleCardClick}
      />
    </div>
  );
});

export default CategoriesList;
