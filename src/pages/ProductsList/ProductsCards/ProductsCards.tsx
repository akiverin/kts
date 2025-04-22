import React from 'react';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { Meta } from 'utils/meta';
import Pagination from 'components/Paganation';
import styles from './ProductsCards.module.scss';
import { ProductModel } from 'entities/product/model';
import { observer } from 'mobx-react-lite';
import { PaginationStore } from 'entities/pagination/stores/PaginationStore';
import ProductCard from './ProductCard';

interface ProductsCardsProps {
  products: ProductModel[];
  meta: Meta;
  error: string;
  pagination: PaginationStore;
  onPageChange: (page: number) => void;
  handleCardClick?: (product: ProductModel) => void;
}

const ProductsCards: React.FC<ProductsCardsProps> = observer(
  ({ products, meta, error, pagination, onPageChange, handleCardClick }) => {
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

    if (!products) {
      return (
        <Text view="title" weight="bold">
          No products found
        </Text>
      );
    }

    return (
      <>
        <div className={styles.products__grid}>
          {products.map((product: ProductModel) => (
            <ProductCard
              key={product.id}
              className={styles.products__card}
              title={product.name}
              contentSlot={`${product.amount} ${product.unit}`}
              actionSlot={<Button onClick={() => handleCardClick && handleCardClick(product)}>Remove</Button>}
            />
          ))}
        </div>
        <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} onPageChange={onPageChange} />
      </>
    );
  },
);

export default ProductsCards;
