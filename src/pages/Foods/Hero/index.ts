export { default } from './Hero.tsx';
export * from './Hero.tsx';

// 320w
import imageHero320wWebp from 'assets/imageHero-320w.webp';
import imageHero320w2xWebp from 'assets/imageHero-320w@2x.webp';
import imageHero320wPng from 'assets/imageHero-320w.png';
import imageHero320w2xPng from 'assets/imageHero-320w@2x.png';

// 768w
import imageHero768wWebp from 'assets/imageHero-768w.webp';
import imageHero768w2xWebp from 'assets/imageHero-768w@2x.webp';
import imageHero768wPng from 'assets/imageHero-768w.png';
import imageHero768w2xPng from 'assets/imageHero-768w@2x.png';

// 1024w
import imageHero1024wWebp from 'assets/imageHero-1024w.webp';
import imageHero1024w2xWebp from 'assets/imageHero-1024w@2x.webp';
import imageHero1024wPng from 'assets/imageHero-1024w.png';
import imageHero1024w2xPng from 'assets/imageHero-1024w@2x.png';

// 1440w
import imageHero1440wWebp from 'assets/imageHero-1440w.webp';
import imageHero1440w2xWebp from 'assets/imageHero-1440w@2x.webp';
import imageHero1440wPng from 'assets/imageHero-1440w.png';
import imageHero1440w2xPng from 'assets/imageHero-1440w@2x.png';

export const heroImages = {
  '320': {
    webp: {
      x1: imageHero320wWebp,
      x2: imageHero320w2xWebp,
    },
    png: {
      x1: imageHero320wPng,
      x2: imageHero320w2xPng,
    },
  },
  '768': {
    webp: {
      x1: imageHero768wWebp,
      x2: imageHero768w2xWebp,
    },
    png: {
      x1: imageHero768wPng,
      x2: imageHero768w2xPng,
    },
  },
  '1024': {
    webp: {
      x1: imageHero1024wWebp,
      x2: imageHero1024w2xWebp,
    },
    png: {
      x1: imageHero1024wPng,
      x2: imageHero1024w2xPng,
    },
  },
  '1440': {
    webp: {
      x1: imageHero1440wWebp,
      x2: imageHero1440w2xWebp,
    },
    png: {
      x1: imageHero1440wPng,
      x2: imageHero1440w2xPng,
    },
  },
};

export type HeroImageSizes = keyof typeof heroImages;
