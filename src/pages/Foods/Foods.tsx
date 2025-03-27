import React from 'react';
import styles from './Foods.module.scss';
import Hero from './Hero';
import Content from './Content';

const Foods = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <Content />
    </main>
  );
};

export default Foods;
