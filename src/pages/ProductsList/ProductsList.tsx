import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import Text from 'components/Text';
import { useSearchParams } from 'react-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import SearchBar from 'components/SearchBar';
import { debounce } from 'utils/debounce';
import ProductsCards from './ProductsCards';
import { ProductListStore } from 'entities/product/stores/ProductListStore';

const ProductsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productListStore = useLocalObservable(() => new ProductListStore());
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    productListStore.setSearchQuery(search);
    productListStore.fetchProducts(page);
  }, [productListStore, searchParams]);

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

  return (
    <div className={styles.categories__wrapper}>
      <div className={styles.categories__header}>
        <Text view="title" tag="h1" weight="bold">
          Products
        </Text>
      </div>

      <div className={styles.categories__controls}>
        <SearchBar placeholder="Search products" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
      </div>

      <ProductsCards
        products={productListStore.products}
        meta={productListStore.meta}
        error={productListStore.error}
        pagination={productListStore.pagination}
        onPageChange={onPageChange}
      />
    </div>
  );
});

export default ProductsList;
