import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useSearchParams, createSearchParams } from 'react-router';
import styles from './ProductsList.module.scss';

import Text from 'components/Text';
import SearchBar from 'components/SearchBar';
import ProductsCards from './ProductsCards';
import { debounce } from 'utils/debounce';
import { ShoppingListStore } from 'entities/product/stores/ShoppingListStore';
import { ProductModel } from 'entities/product/model';

const Wrapper: React.FC<{ title: string; subtitle?: string; children?: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div className={styles.products__wrapper}>
    <div className={styles.products__header}>
      <Text view="title" tag="h1" weight="bold">
        {title}
      </Text>
      {subtitle && (
        <Text view="p-20" color="secondary">
          {subtitle}
        </Text>
      )}
      {children}
    </div>
  </div>
);

const ProductsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useLocalObservable(() => new ShoppingListStore());

  const searchParam = searchParams.get('search') ?? '';
  const pageParam = parseInt(searchParams.get('page') ?? '1', 10);

  const [localSearch, setLocalSearch] = useState<string>(searchParam);

  useEffect(() => {
    setLocalSearch(searchParam);
    store.setSearchQuery(searchParam);
  }, [searchParam, store]);

  useEffect(() => {
    store.fetchProducts(pageParam);
  }, [pageParam, store]);

  const onSearch = useMemo(
    () =>
      debounce(() => {
        setSearchParams(createSearchParams({ search: localSearch, page: '1' }));
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
    (product: ProductModel) => {
      store.toggleProduct(product);
    },
    [store],
  );

  if (store.meta === 'loading') {
    return <Wrapper title="Loading..." />;
  }

  if (store.meta === 'error') {
    return <Wrapper title={`Error! ${store.error}`} subtitle="Unable to load products. Please try again later." />;
  }

  if (store.products.length === 0) {
    return <Wrapper title="No products found!" subtitle="Add product to your shopping list from recipes." />;
  }

  return (
    <Wrapper title="Products" subtitle="Manage your shopping list. Add or remove products as needed.">
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
    </Wrapper>
  );
});

export default ProductsList;
