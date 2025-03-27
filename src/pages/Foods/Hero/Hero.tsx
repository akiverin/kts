import React from 'react';
import styles from './Hero.module.scss';
import { heroImages } from '.';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <picture>
        <source
          type="image/webp"
          srcSet={`
          ${heroImages['320'].webp.x1} 320w,
          ${heroImages['320'].webp.x2} 640w,
          ${heroImages['768'].webp.x1} 768w,
          ${heroImages['768'].webp.x2} 1536w,
          ${heroImages['1024'].webp.x1} 1024w,
          ${heroImages['1024'].webp.x2} 2048w,
          ${heroImages['1440'].webp.x1} 1440w,
          ${heroImages['1440'].webp.x2} 2880w
        `}
          sizes="(max-width: 320px) 320px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               1440px"
        />
        <source
          type="image/png"
          srcSet={`
          ${heroImages['320'].png.x1} 320w,
          ${heroImages['320'].png.x2} 640w,
          ${heroImages['768'].png.x1} 768w,
          ${heroImages['768'].png.x2} 1536w,
          ${heroImages['1024'].png.x1} 1024w,
          ${heroImages['1024'].png.x2} 2048w,
          ${heroImages['1440'].png.x1} 1440w,
          ${heroImages['1440'].png.x2} 2880w
        `}
          sizes="(max-width: 320px) 320px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               1440px"
        />
        <img
          src={heroImages['1440'].png.x1}
          srcSet={`
          ${heroImages['1440'].png.x1} 1x,
          ${heroImages['1440'].png.x2} 2x
        `}
          alt="cover hero home page"
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </picture>
    </section>
  );
};

export default Hero;
