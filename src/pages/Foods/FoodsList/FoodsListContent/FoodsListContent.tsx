import React from 'react';
import { Meta } from 'utils/meta';
import styles from './FoodsListContent.module.scss';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { RecipeListStore } from 'entities/recipe/stores/RecipeListStore';
import { Link } from 'react-router';
import Card from 'components/Card';
import { Recipe } from 'entities/recipe/types';
import Button from 'components/Button';
import Pagination from 'components/Paganation';
import timeIcon from 'assets/timeIcon.svg';
import { FavoritesStore } from 'entities/recipe/stores/FavoritesStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Summary from 'components/Summary';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  recipes: RecipeListStore['recipes'];
  meta: RecipeListStore['meta'];
  error: RecipeListStore['error'];
  pagination: RecipeListStore['pagination'];
  onPageChange: (page: number) => void;
}

const FoodsListContent: React.FC<Props> = observer(({ recipes, meta, error, pagination, onPageChange }) => {
  const favoritesStore = useLocalObservable(() => new FavoritesStore());
  const getIsSaved = React.useCallback((id: Recipe['documentId']) => favoritesStore.isFavorite(id), [favoritesStore]);
  const handleSaveClick = (e: React.MouseEvent, recipe: Recipe) => {
    e.preventDefault();
    e.stopPropagation();
    favoritesStore.toggleFavorite(recipe);
  };
  if (meta === Meta.loading || meta === Meta.initial) {
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

  if (recipes.length === 0) {
    return (
      <Text view="title" weight="bold">
        List of recipes not found!
      </Text>
    );
  }

  return (
    <>
      <ul className={styles['foods-list__list']}>
        <AnimatePresence>
          {recipes.map((recipe: Recipe) => (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key={recipe.documentId}
              className={styles['foods-list__item']}
            >
              <Link to={`/foods/${recipe.documentId}`}>
                <Card
                  image={recipe.images[0].url || ''}
                  title={recipe.name}
                  subtitle={<Summary>{recipe.summary}</Summary>}
                  contentSlot={`${recipe.calories} kcal`}
                  actionSlot={
                    <Button onClick={(event) => handleSaveClick(event, recipe)}>
                      {getIsSaved(recipe.documentId) ? 'Remove' : 'Save'}
                    </Button>
                  }
                  captionSlot={
                    <div className={styles['foods-list__time']}>
                      <img src={timeIcon} alt="icon time" />
                      <Text color="secondary" weight="medium" view="p-14">
                        {`${recipe.preparationTime} minutes`}
                      </Text>
                    </div>
                  }
                />
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} onPageChange={onPageChange} />
    </>
  );
});

export default FoodsListContent;
