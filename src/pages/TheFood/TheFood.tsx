import React, { useEffect, useState } from 'react';
import styles from './TheFood.module.scss';
import { Link, useParams } from 'react-router';
import ArrowLeft from 'components/icons/ArrowLeft';
import Text from 'components/Text';
import { getRecipe } from 'config/api';
import pattern from 'assets/patterg.svg';
import Summary from './Summary';
import Ingredients from './Ingredients/Ingredients';
import Directions from './Directions/Directions';
import Loader from 'components/Loader';

export type FoodDetails = {
  documentId: string;
  name: string;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  images: Array<{ url: string }>;
  calories: number;
  category: {
    title: string;
  };
  directions: Array<{ description: string }>;
  equipments: Array<{ name: string }>;
  ingradients: Array<{ name: string }>;
  summary: string;
  vegetarian: boolean;
};

const TheFood: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [food, setFood] = useState<FoodDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const DETAILS: {
    key: keyof Pick<FoodDetails, 'preparationTime' | 'cookingTime' | 'totalTime' | 'likes' | 'servings' | 'rating'>;
    name: string;
    formatter?: (value: string) => string;
  }[] = [
    {
      key: 'preparationTime',
      name: 'Preparation',
      formatter: (value) => `${value} minutes`,
    },
    {
      key: 'cookingTime',
      name: 'Cooking',
      formatter: (value) => `${value} minutes`,
    },
    {
      key: 'totalTime',
      name: 'Total',
      formatter: (value) => `${value} minutes`,
    },
    {
      key: 'likes',
      name: 'Likes',
      formatter: (value) => value.toLocaleString(),
    },
    {
      key: 'servings',
      name: 'Servings',
      formatter: (value) => `${value} servings`,
    },
    {
      key: 'rating',
      name: 'Ratings',
      formatter: (value) => `${value} / 5`,
    },
  ];

  useEffect(() => {
    const fetchFood = async () => {
      if (!documentId) {
        setError('Неверный идентификатор рецепта');
        return;
      }

      try {
        setIsLoading(true);
        const data = await getRecipe(documentId);
        setFood(data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке рецепта.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFood();
  }, [documentId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Text view="title" weight="bold">
            Loading...
          </Text>
          <Loader />
        </>
      );
    }

    if (error) {
      return (
        <Text view="title" weight="bold">
          {error}
        </Text>
      );
    }

    if (!food) {
      return (
        <Text view="title" weight="bold">
          Food not found!
        </Text>
      );
    }
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
            <img className={styles.image} src={food.images[0].url} alt="image food" />
            <div className={styles.details}>
              <ul className={styles.list}>
                {DETAILS.map((item) => {
                  const value = food[item.key];
                  return (
                    <li key={item.key} className={styles.item}>
                      <Text>{item.name}</Text>
                      <Text color="accent" weight="bold">
                        {item.formatter ? item.formatter(value.toString()) : value}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.desc}>
            <Summary>{food.summary}</Summary>
          </div>

          <Ingredients equipments={food.equipments} ingradients={food.ingradients} />
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
};
export default TheFood;
