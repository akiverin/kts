import React from 'react';
import Text from 'components/Text';
import styles from './Directions.module.scss';

type directionsT = { directions: Array<{ description: string }> };

const Directions = ({ directions }: directionsT) => {
  return (
    <div className={styles.section}>
      <Text view="p-20" weight="bold">
        Directions
      </Text>
      <ul className={styles.list}>
        {directions.map((item, index) => (
          <li key={index} className={styles.item}>
            <Text view="p-16" weight="bold">
              Step {index + 1}
            </Text>
            <Text view="p-16">{item.description}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Directions;
