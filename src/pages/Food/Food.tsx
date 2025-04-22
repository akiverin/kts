import React, { useEffect } from 'react';
import styles from './Food.module.scss';
import { useParams } from 'react-router';
import pattern from 'assets/patterg.svg';
import { RecipeStore } from 'entities/recipe/stores/RecipeStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import FoodContent from './FoodContent';

const Food: React.FC = observer(() => {
  const navigate = useNavigate();
  const { documentId } = useParams<{ documentId: string }>();

  const recipeStore = useLocalObservable(() => new RecipeStore());

  useEffect(() => {
    if (documentId) {
      recipeStore.fetchRecipe(documentId);
    }
  }, [documentId, recipeStore]);

  return (
    <section className={styles.food}>
      <img className={styles.food__pattern} src={pattern} alt="decorate pattern" />
      <div className={styles.food__wrapper}>
        <FoodContent food={recipeStore.recipe} error={recipeStore.error} navigate={navigate} meta={recipeStore.meta} />
      </div>
    </section>
  );
});

export default Food;
