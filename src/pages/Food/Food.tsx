import React, { useEffect } from 'react';
import styles from './Food.module.scss';
import { Link, useParams } from 'react-router';
import ArrowLeft from 'components/icons/ArrowLeft';
import Text from 'components/Text';
import pattern from 'assets/patterg.svg';
import Summary from './Summary';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Loader from 'components/Loader';
import { RecipeStore } from 'entities/recipe/stores/RecipeStore';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';

const recipeStore = new RecipeStore();

const Food: React.FC = observer(() => {
  const { documentId } = useParams<{ documentId: string }>();

  useEffect(() => {
    if (documentId) {
      recipeStore.fetchRecipe(documentId);
    }
  }, [documentId]);

  const renderContent = () => {
    if (recipeStore.meta === Meta.loading) {
      return (
        <>
          <Text view="title" weight="bold">
            Loading...
          </Text>
          <Loader />
        </>
      );
    }

    if (recipeStore.meta === Meta.error) {
      return (
        <Text view="title" weight="bold">
          {recipeStore.error}
        </Text>
      );
    }

    if (!recipeStore.recipe) {
      return (
        <Text view="title" weight="bold">
          Recipe not found!
        </Text>
      );
    }

    const food = recipeStore.recipe;
    const details = recipeStore.recipe.details;

    return (
      <>
        <section className={styles.controls}>
          <Link to="/">
            <ArrowLeft color="accent" height={32} width={32} />
          </Link>
          <Text view="title" weight="bold">
            {food.name}
          </Text>
        </section>
        <section className={styles.content}>
          <div className={styles.info}>
            <img className={styles.image} src={food.image} alt="image food" />
            <div className={styles.details}>
              <ul className={styles.list}>
                {details.map((item) => (
                  <li key={item.label} className={styles.item}>
                    <Text>{item.label}</Text>
                    <Text color="accent" weight="bold">
                      {item.value}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.desc}>
            <Summary>{food.summary}</Summary>
          </div>
          <Ingredients equipment={food.equipment} ingredients={food.ingredients} />{' '}
          <Directions directions={food.directions} />
        </section>
      </>
    );
  };

  return (
    <section className={styles.food}>
      <img className={styles.pattern} src={pattern} alt="decorate pattern" />
      <div className={styles.wrapper}>{renderContent()}</div>
    </section>
  );
});

export default Food;
