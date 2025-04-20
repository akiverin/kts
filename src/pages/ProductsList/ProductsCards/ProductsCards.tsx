import React from 'react';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { Meta } from 'utils/meta';
import Pagination from 'components/Paganation';
import styles from './ProductsCards.module.scss';
import { ProductListStore } from 'entities/product/stores/ProductListStore';
import ProductCard from './ProductCard';
import Button from 'components/Button';
import { ProductModel } from 'entities/product/model';
import { observer } from 'mobx-react-lite';

interface ProductsCardsProps {
  isShop: (id: string) => string;
  products: ProductListStore['products'];
  meta: ProductListStore['meta'];
  error: ProductListStore['error'];
  pagination: ProductListStore['pagination'];
  onPageChange: (page: number) => void;
  handleCardClick?: (product: ProductModel) => void;
}

const ProductsCards: React.FC<ProductsCardsProps> = observer(
  ({ isShop, meta, error, products, pagination, onPageChange, handleCardClick }) => {
    if (meta === Meta.loading) {
      return (
        <div className={styles.loader}>
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

    if (products.length === 0) {
      return (
        <Text view="title" weight="bold">
          No categories found
        </Text>
      );
    }
    return (
      <>
        <div className={styles.products__grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              className={styles.products__card}
              title={product.name}
              images={product.images}
              contentSlot={
                <>
                  <Text color="accent" weight="bold" view="p-18">
                    {product.price}
                  </Text>
                  {product.price !== product.oldPrice && (
                    <Text color="secondary" view="p-14">
                      <s>{product.oldPrice}</s>
                    </Text>
                  )}
                </>
              }
              desc={product.desc}
              actionSlot={
                <Button onClick={() => handleCardClick && handleCardClick(product)}>
                  {isShop(product.documentId)}
                </Button>
              }
            />
          ))}
        </div>
        <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} onPageChange={onPageChange} />
      </>
    );
  },
);

export default ProductsCards;
