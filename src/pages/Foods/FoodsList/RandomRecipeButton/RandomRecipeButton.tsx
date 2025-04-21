import React from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import { RecipeListStore } from 'entities/recipe/stores/RecipeListStore';
import styles from './RandomRecipeButton.module.scss';

interface Props {
  recipes: RecipeListStore['recipes'];
}

const RandomRecipeButton: React.FC<Props> = ({ recipes }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (recipes.length === 0) {
      alert('No saved recipes available.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipeId = recipes[randomIndex].documentId;
    navigate(`/foods/${recipeId}`);
  };

  return (
    <Button className={styles['random-button']} onClick={handleClick}>
      Random Recipe
    </Button>
  );
};

export default RandomRecipeButton;
