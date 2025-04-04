import React, { useCallback, useEffect, useState } from 'react';
import styles from './FoodsList.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Paganation';
import Loader from 'components/Loader';

import timeIcon from 'assets/timeIcon.svg';
import { Link } from 'react-router';
import { Recipe } from 'entities/recipe/types';
import { RecipeListStore } from 'entities/recipe/stores/RecipeListStore';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';
import SearchBar from './SearchBar';

const recipeListStore = new RecipeListStore();

const FoodsList: React.FC = observer(() => {
  const [localSearch, setLocalSearch] = useState('');

  const fetchRecipes = useCallback((page: number) => {
    recipeListStore.fetchRecipes(page);
  }, []);

  useEffect(() => {
    fetchRecipes(1);
  }, [fetchRecipes]);

  const onSearch = () => {
    recipeListStore.setSearchQuery(localSearch);
    fetchRecipes(1);
  };

  const renderContent = () => {
    if (recipeListStore.meta === Meta.loading) {
      return (
        <>
          <Text view="title" weight="bold">
            Loading...
          </Text>
          <Loader />
        </>
      );
    }

    if (recipeListStore.meta === Meta.error) {
      return (
        <Text view="title" weight="bold">
          {recipeListStore.error}
        </Text>
      );
    }

    if (recipeListStore.recipes.length === 0) {
      return (
        <Text view="title" weight="bold">
          List of recipes not found!
        </Text>
      );
    }

    return (
      <>
        <ul className={styles.foods}>
          {recipeListStore.recipes.map((recipe: Recipe) => (
            <li key={recipe.documentId} className={styles.food}>
              <Link to={`/foods/${recipe.documentId}`}>
                <Card
                  image={recipe.images[0]?.url || ''}
                  title={recipe.name}
                  subtitle={recipe.summary}
                  contentSlot={recipe.calories + ' kcal'}
                  actionSlot={
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Save
                    </Button>
                  }
                  captionSlot={
                    <div className={styles.time}>
                      <img src={timeIcon} alt="icon time" />
                      <Text color="secondary" weight="medium" view="p-14">
                        {recipe.preparationTime + ' minutes'}
                      </Text>
                    </div>
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={recipeListStore.pagination.page}
          totalPages={recipeListStore.pagination.pageCount}
          onPageChange={(page: number) => recipeListStore.fetchRecipes(page)}
        />
      </>
    );
  };

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        <Text view="p-20">
          Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to{' '}
          <u>holiday feasts</u>.
        </Text>
        <div className={styles.actions}>
          <SearchBar value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
          <div className={styles.dropdown}>
            <MultiDropdown
              options={[]}
              value={[]}
              placeholder="Categories"
              getTitle={() => {
                return 'Categories';
              }}
              onChange={() => {}}
            />
          </div>
        </div>
        {renderContent()}
      </div>
    </section>
  );
});

export default FoodsList;
