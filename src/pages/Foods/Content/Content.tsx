import React, { useEffect, useState } from 'react';
import styles from './Content.module.scss';
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Paganation';
import Loader from 'components/Loader';

import { Recipe, getPaginatedRecipes } from 'config/api';
import timeIcon from 'assets/timeIcon.svg';
import { Link } from 'react-router';

const Content: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    pageCount: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async (page: number) => {
    try {
      setIsLoading(true);
      // const data = await getAllRecipes();
      const { data, pagination } = await getPaginatedRecipes(page, 9);
      setRecipes(data);
      setPagination(pagination);
      setError(null);
    } catch (err) {
      setError('Error loading foods');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(1);
  }, []);

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

    if (recipes.length === 0) {
      return (
        <Text view="title" weight="bold">
          List of foods not found!
        </Text>
      );
    }

    return (
      <ul className={styles.foods}>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.documentId} className={styles.food}>
            <Link to={`/foods/${recipe.documentId}`}>
              <Card
                image={recipe.images[0]?.url || ''}
                title={recipe.name}
                subtitle={recipe.summary}
                contentSlot={recipe.calories + ' kcal'}
                actionSlot={
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Save
                  </Button>
                }
                captionSlot={
                  <div className={styles.time}>
                    <img src={timeIcon} alt="icon time" />
                    <Text color="secondary" weight="medium" view="p-14">
                      {recipe.preparationTime + ' minutes'}
                    </Text>
                  </div>
                }
              />
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={styles.content}>
      <div className={styles.wrapper}>
        <Text view="p-20">
          Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to{' '}
          <u>holiday feasts</u>.
        </Text>
        <div className={styles.actions}>
          <div className={styles.search}>
            <Input placeholder="Enter dishes" value="" onChange={() => {}} />
            <Button>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_38_1472)">
                  <path
                    d="M16 14H15.21L14.93 13.73C15.91 12.59 16.5 11.11 16.5 9.5C16.5 5.91 13.59 3 10 3C6.41 3 3.5 5.91 3.5 9.5C3.5 13.09 6.41 16 10 16C11.61 16 13.09 15.41 14.23 14.43L14.5 14.71V15.5L19.5 20.49L20.99 19L16 14ZM10 14C7.51 14 5.5 11.99 5.5 9.5C5.5 7.01 7.51 5 10 5C12.49 5 14.5 7.01 14.5 9.5C14.5 11.99 12.49 14 10 14Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_38_1472">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
          <div className={styles.dropdown}>
            <MultiDropdown
              options={[]}
              value={[]}
              placeholder="Categories"
              getTitle={() => {
                return 'Categories';
              }}
              onChange={() => {}}
            />
          </div>
        </div>
        {renderContent()}
      </div>
      <Pagination currentPage={pagination.page} totalPages={pagination.pageCount} onPageChange={fetchRecipes} />
    </section>
  );
};

export default Content;
