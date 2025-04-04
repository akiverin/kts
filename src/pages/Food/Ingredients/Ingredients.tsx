import React from 'react';
import Text from 'components/Text';
import DishIcon from 'components/icons/Dish';
import EquipmentIcon from 'components/icons/Equipment';
import styles from './Ingredients.module.scss';

type Ingredient = { name: string };
type Equipment = { name: string };

type IngredientsProps = {
  equipment: Equipment[];
  ingredients: Ingredient[];
};

const Ingredients: React.FC<IngredientsProps> = ({ equipment, ingredients }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text view="p-20" weight="medium">
          Ingredients
        </Text>
        <div className={styles.grid}>
          {ingredients.map((item, index) => (
            <div key={index} className={styles.item}>
              <DishIcon />
              <Text view="p-16">{item.name}</Text>
            </div>
          ))}
          <svg
            className={styles.border}
            width="7"
            height="243"
            viewBox="0 0 7 243"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3.5C7 5.433 5.433 7 3.5 7C1.567 7 0 5.433 0 3.5C0 1.567 1.567 0 3.5 0C5.433 0 7 1.567 7 3.5Z"
              fill="#B5460F"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M2.99999 243L3 12H4L3.99999 243H2.99999Z" fill="#B5460F" />
          </svg>
        </div>
      </div>

      <div className={styles.section}>
        <Text view="p-20" weight="medium">
          Equipment
        </Text>
        <div className={styles.grid}>
          {equipment.map((item, index) => (
            <div key={index} className={styles.item}>
              <EquipmentIcon />
              <Text view="p-16">{item.name}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
