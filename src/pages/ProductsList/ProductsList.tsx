import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useSearchParams, createSearchParams } from 'react-router';
import styles from './ProductsList.module.scss';
import Text from 'components/Text';
import SearchBar from 'components/SearchBar';
import { debounce } from 'utils/debounce';
import ProductsCards from './ProductsCards';
import { ShoppingListStore } from 'entities/product/stores/ShoppingListStore';
import { ProductModel } from 'entities/product/model';

const ProductsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useLocalObservable(() => new ShoppingListStore());

  // Извлекаем параметры из URL
  const searchParam = searchParams.get('search') ?? '';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);

  // Локальное состояние для инпута
  const [localSearch, setLocalSearch] = useState<string>(searchParam);

  // Синхронизируем input со строкой поиска
  useEffect(() => {
    setLocalSearch(searchParam);
    store.setSearchQuery(searchParam);
  }, [searchParam, store]);

  // Фетчим данные при изменении страницы
  useEffect(() => {
    store.fetchProducts(pageParam);
  }, [pageParam, store]);

  // Дебаунс для обновления URL-параметров поиска
  const onSearch = useMemo(
    () =>
      debounce(() => {
        setSearchParams(createSearchParams({ search: localSearch, page: '1' }));
      }, 500),
    [localSearch, setSearchParams],
  );

  // Обработка смены страницы
  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set('page', page.toString());
        return prev;
      });
    },
    [setSearchParams],
  );

  // Тоггл товара в списке
  const handleCardClick = useCallback(
    (product: ProductModel) => {
      store.toggleProduct(product);
    },
    [store],
  );

  return (
    <div className={styles.products__wrapper}>
      <div className={styles.products__header}>
        <Text view="title" tag="h1" weight="bold">
          Products
        </Text>
        <Text view="p-20" color="secondary">
          Manage your shopping list. Add or remove products as needed.
        </Text>
      </div>

      <div className={styles.products__controls}>
        <SearchBar placeholder="Search products" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
      </div>

      <ProductsCards
        products={store.paginatedProducts}
        meta={store.meta}
        error={store.error}
        pagination={store.pagination}
        onPageChange={onPageChange}
        handleCardClick={handleCardClick}
      />
    </div>
  );
});

export default ProductsList;
