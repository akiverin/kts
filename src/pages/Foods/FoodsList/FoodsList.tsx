import React, { useEffect, useMemo, useState } from 'react';
import styles from './FoodsList.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';
import Pagination from 'components/Paganation';
import Loader from 'components/Loader';
import timeIcon from 'assets/timeIcon.svg';
import { Link, useSearchParams } from 'react-router';
import { Recipe } from 'entities/recipe/types';
import { RecipeListStore } from 'entities/recipe/stores/RecipeListStore';
import { CategoryStore } from 'entities/category/stores/CategoryStore';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';
import SearchBar from 'components/SearchBar';
import DropdownCategory from './DropdownCategory';
import { OptionT } from 'components/MultiDropdown';

const recipeListStore = new RecipeListStore();
const categoryStore = new CategoryStore();

const FoodsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);

    setLocalSearch(search);
    recipeListStore.setSearchQuery(search);

    if (category) {
      const categoryId = parseInt(category, 10);
      setSelectedCategory(categoryId);
      recipeListStore.setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(null);
      recipeListStore.setSelectedCategory(null);
    }

    recipeListStore.fetchRecipes(page);
  }, [searchParams]);

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const onSearch = () => {
    const updatedParams: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      search: localSearch,
      page: '1',
    };
    setSearchParams(updatedParams);
  };

  const handleCategoryChange = (value: OptionT | OptionT[]) => {
    const categoryIds = Array.isArray(value) ? value.map((opt) => Number(opt.key)) : [Number(value.key)];
    const selected = categoryIds[0] ?? null;

    const updatedParams: Record<string, string> = {
      ...Object.fromEntries(searchParams.entries()),
      page: '1',
    };

    if (selected) {
      updatedParams.category = selected.toString();
    } else {
      delete updatedParams.category;
    }

    setSearchParams(updatedParams);
  };

  const onPageChange = (page: number) => {
    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    };
    setSearchParams(updatedParams);
  };

  const getCategoryOption = (id: number | null) =>
    id !== null ? categoryStore.asOptions.find((opt) => opt.key === id.toString()) || null : null;

  const selectedOption = useMemo(() => getCategoryOption(selectedCategory), [selectedCategory]);
  const categoryOptions = useMemo(() => categoryStore.asOptions, [categoryStore.asOptions]);

  const renderContent = () => {
    if (recipeListStore.meta === Meta.loading) {
      return (
        <>
          <Text view="title" weight="bold">
            Loading...
          </Text>
          <Loader />
        </>
      );
    }

    if (recipeListStore.meta === Meta.error) {
      return (
        <Text view="title" weight="bold">
          {recipeListStore.error}
        </Text>
      );
    }

    if (recipeListStore.recipes.length === 0) {
      return (
        <Text view="title" weight="bold">
          List of recipes not found!
        </Text>
      );
    }

    return (
      <>
        <ul className={styles.foods}>
          {recipeListStore.recipes.map((recipe: Recipe) => (
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
        <Pagination
          currentPage={recipeListStore.pagination.page}
          totalPages={recipeListStore.pagination.pageCount}
          onPageChange={onPageChange}
        />
      </>
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
          <SearchBar placeholder="Enter dishes" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
          <DropdownCategory
            placeholder="Categories"
            options={categoryOptions}
            value={selectedOption ? [selectedOption] : []}
            onChange={handleCategoryChange}
            getTitle={(values) => values[0]?.value || 'Categories'}
          />
        </div>
        {renderContent()}
      </div>
    </section>
  );
});

export default FoodsList;
