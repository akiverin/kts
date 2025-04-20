import React, { useState } from 'react';
import Text from 'components/Text';
import DishIcon from 'components/icons/Dish';
import EquipmentIcon from 'components/icons/Equipment';
import styles from './Ingredients.module.scss';
import Input from 'components/Input';

type Ingredient = { name: string; amount: number; unit: string };
type Equipment = { name: string };

type IngredientsProps = {
  equipment: Equipment[];
  ingredients: Ingredient[];
};

const Ingredients: React.FC<IngredientsProps> = ({ equipment, ingredients }) => {
  const [person, setPerson] = useState<number>(1);
  return (
    <div className={styles.ingredients}>
      <div className={styles.ingredients__section}>
        <Text view="p-20" weight="medium">
          Ingredients
        </Text>
        <div className={styles.ingredients__head}>
          <Text view="p-16">Number of people</Text>
          <Input type="number" value={person.toString()} onChange={(value) => setPerson(+value)} />
        </div>
        <div className={styles.ingredients__grid}>
          {ingredients.map((item, index) => (
            <div key={index} className={styles.ingredients__item}>
              <DishIcon />
              <div className={styles.ingredients__info}>
                <Text view="p-16">{item.name}</Text>
                <Text view="p-14" color="accent">
                  {(item.amount * person).toFixed(2)} {item.unit}
                </Text>
              </div>
            </div>
          ))}
          <svg
            className={styles.ingredients__border}
            width="7"
            height="800"
            viewBox="0 0 7 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 3.5C7 5.433 5.433 7 3.5 7C1.567 7 0 5.433 0 3.5C0 1.567 1.567 0 3.5 0C5.433 0 7 1.567 7 3.5Z"
              fill="#B5460F"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M3 800L3 12H4L4 800H3Z" fill="#B5460F" />
          </svg>
        </div>
      </div>

      <div className={styles.ingredients__section}>
        <Text view="p-20" weight="medium">
          Equipment
        </Text>
        <div className={styles.ingredients__grid}>
          {equipment.map((item, index) => (
            <div key={index} className={styles.ingredients__item}>
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
