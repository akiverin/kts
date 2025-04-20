import React from 'react';
import { Meta } from 'utils/meta';
import styles from './FoodContent.module.scss';
import Text from 'components/Text';
import Loader from 'components/Loader';
import ArrowLeft from 'components/icons/ArrowLeft';
import Summary from './Summary';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import { RecipeStore } from 'entities/recipe/stores/RecipeStore';

interface Props {
  food: RecipeStore['recipe'];
  meta: RecipeStore['meta'];
  error: RecipeStore['error'];
  navigate: (to: number) => void;
}

const FoodContent: React.FC<Props> = ({ food, meta, error, navigate }) => {
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

  if (!food) {
    return (
      <Text view="title" weight="bold">
        Recipe not found!
      </Text>
    );
  }

  return (
    <>
      <section className={styles.food__controls}>
        <button className={styles.food__back} onClick={() => navigate(-1)}>
          <ArrowLeft color="accent" height={32} width={32} />
        </button>
        <Text view="title" weight="bold">
          {food.name}
        </Text>
      </section>

      <section className={styles.food__content}>
        <div className={styles.food__info}>
          <img className={styles.food__image} src={food.image} alt="image food" />
          <div className={styles.food__details}>
            <ul className={styles.food__list}>
              {food.details.map((item) => (
                <li key={item.label} className={styles.food__item}>
                  <Text>{item.label}</Text>
                  <Text color="accent" weight="bold">
                    {item.value}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.food__desc}>
          <Summary>{food.summary}</Summary>
        </div>

        <Ingredients equipment={food.equipment} ingredients={food.ingredients} />
        <Directions directions={food.directions} />
      </section>
    </>
  );
};

export default FoodContent;
