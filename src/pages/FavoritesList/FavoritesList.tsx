import React from 'react';
import styles from './FavoritesList.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FavoritesStore } from 'entities/recipe/stores/FavoritesStore';
import Card from 'components/Card';
import { Link } from 'react-router';
import Text from 'components/Text';
import Button from 'components/Button';
import timeIcon from 'assets/timeIcon.svg';

const FavoritesList: React.FC = observer(() => {
  const favoritesStore = useLocalObservable(() => new FavoritesStore());

  if (favoritesStore.favorites.length === 0) {
    return (
      <div className={styles['foods-favorites']}>
        <div className={styles['foods-favorites__wrapper']}>
          <Text view="title" weight="bold">
            No favorites found
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['foods-favorites']}>
      <div className={styles['foods-favorites__wrapper']}>
        <div className={styles['foods-favorites__header']}>
          <Text view="title" tag="h1" weight="bold">
            Favorites Recipes
          </Text>
          <Text view="p-20" color="secondary">
            Explore your favorites recipes and enjoy cooking them!
          </Text>
        </div>

        <ul className={styles['foods-favorites__list']}>
          {favoritesStore.favorites.map((recipe) => (
            <li key={recipe.documentId} className={styles['foods-favorites__item']}>
              <Link to={`/foods/${recipe.documentId}`}>
                <Card
                  image={recipe.images[0]?.url || ''}
                  title={recipe.name}
                  subtitle={recipe.summary}
                  contentSlot={`${recipe.calories} kcal`}
                  actionSlot={
                    <Button
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        favoritesStore.removeFavorite(recipe.documentId);
                      }}
                    >
                      Remove
                    </Button>
                  }
                  captionSlot={
                    <div className={styles['foods-favorites__time']}>
                      <img src={timeIcon} alt="icon time" />
                      <Text color="secondary" weight="medium" view="p-14">
                        {`${recipe.preparationTime} minutes`}
                      </Text>
                    </div>
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default FavoritesList;
