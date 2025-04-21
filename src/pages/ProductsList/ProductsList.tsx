import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import Text from 'components/Text';
import { useSearchParams } from 'react-router';
import { observer, useLocalObservable } from 'mobx-react-lite';
import SearchBar from 'components/SearchBar';
import { debounce } from 'utils/debounce';
import ProductsCards from './ProductsCards';
import { ShoppingListStore } from 'entities/product/stores/ShoppingListStore';
import { ProductModel } from 'entities/product/model';

const ProductsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shoppingListStore = useLocalObservable(() => new ShoppingListStore());
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    shoppingListStore.setSearchQuery(search);
    shoppingListStore.fetchProducts(page);
  }, [shoppingListStore, searchParams]);

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
    (product: ProductModel) => {
      shoppingListStore.toggleShop(product);
    },
    [shoppingListStore],
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
        products={shoppingListStore.paginatedProducts}
        meta={shoppingListStore.meta}
        error={shoppingListStore.error}
        pagination={shoppingListStore.pagination}
        onPageChange={onPageChange}
        handleCardClick={handleCardClick}
      />
    </div>
  );
});

export default ProductsList;
