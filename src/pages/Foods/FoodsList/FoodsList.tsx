import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import DropdownRating from './DropdownRating/DropdownRating';
import CheckBox from 'components/CheckBox';
import TimeInputs from './TimeInputs';
import { updateSearchParam, resetPageParam } from 'utils/searchParamsHelpers';

const recipeListStore = new RecipeListStore();
const categoryStore = new CategoryStore();

const FoodsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<OptionT[]>([]);
  const [selectedTotalTime, setSelectedTotalTime] = useState<number | null>(null);
  const [selectedCookingTime, setSelectedCookingTime] = useState<number | null>(null);
  const [selectedPreparationTime, setSelectedPreparationTime] = useState<number | null>(null);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const rating = searchParams.get('rating');
    const totalTime = searchParams.get('totalTime') || '';
    const cookingTime = searchParams.get('cookingTime') || '';
    const preparationTime = searchParams.get('preparationTime') || '';
    const vegetarian = searchParams.get('vegetarian');

    setLocalSearch(search);
    recipeListStore.setSearchQuery(search);

    const totalTimeNum = Number(totalTime) || null;
    setSelectedTotalTime(totalTimeNum);
    if (recipeListStore.setTotalTime) {
      recipeListStore.setTotalTime(totalTimeNum);
    }

    const cookingTimeNum = Number(cookingTime) || null;
    setSelectedCookingTime(cookingTimeNum);
    if (recipeListStore.setCookingTime) {
      recipeListStore.setCookingTime(cookingTimeNum);
    }

    const preparationTimeNum = Number(preparationTime) || null;
    setSelectedPreparationTime(preparationTimeNum);
    if (recipeListStore.setPreparationTime) {
      recipeListStore.setPreparationTime(preparationTimeNum);
    }

    if (category) {
      const categoryId = parseInt(category, 10);
      setSelectedCategory(categoryId);
      recipeListStore.setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(null);
      recipeListStore.setSelectedCategory(null);
    }

    if (rating) {
      setSelectedRating([{ key: rating, value: `${rating}+ stars` }]);
      recipeListStore.setRatingFilter(Number(rating));
    }

    recipeListStore.setVegetarianFilter(vegetarian === 'true');
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

  const handleCategoryChange = useCallback(
    (value: OptionT | OptionT[]) => {
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
    },
    [searchParams, setSearchParams],
  );

  const onPageChange = useCallback(
    (page: number) => {
      const updatedParams = {
        ...Object.fromEntries(searchParams.entries()),
        page: page.toString(),
      };
      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams],
  );

  const handleFilterChange = useCallback(
    (filterType: string, value: OptionT[] | boolean) => {
      const params = new URLSearchParams(searchParams);
      resetPageParam(params);
      if (typeof value === 'boolean') {
        updateSearchParam(params, filterType, value ? 'true' : null);
      } else {
        const key = value[0]?.key;
        updateSearchParam(params, filterType, key || null);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleTimeChange = useCallback(
    (timeType: 'totalTime' | 'cookingTime' | 'preparationTime', value: number | null) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set('page', '1');

      if (value != null && !Number.isNaN(value)) {
        updatedParams.set(timeType, value.toString());
      } else {
        updatedParams.delete(timeType);
      }

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams],
  );

  const categoryOptions = useMemo(() => categoryStore.asOptions, [categoryStore.asOptions]);
  const getCategoryOption = useCallback(
    (id: number | null) =>
      id !== null ? categoryStore.asOptions.find((opt) => opt.key === id.toString()) || null : null,
    [categoryStore.asOptions],
  );
  const selectedOptionCategory = useMemo(
    () => getCategoryOption(selectedCategory),
    [selectedCategory, getCategoryOption],
  );

  const renderContent = useCallback(() => {
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
        <ul className={styles['foods-list__list']}>
          {recipeListStore.recipes.map((recipe: Recipe) => (
            <li key={recipe.documentId} className={styles['foods-list__item']}>
              <Link to={`/foods/${recipe.documentId}`}>
                <Card
                  image={recipe.images[0]?.url || ''}
                  title={recipe.name}
                  subtitle={recipe.summary}
                  contentSlot={`${recipe.calories} kcal`}
                  actionSlot={<Button onClick={(event) => event.preventDefault()}>Save</Button>}
                  captionSlot={
                    <div className={styles['foods-list__time']}>
                      <img src={timeIcon} alt="icon time" />
                      <Text color="secondary" weight="medium" view="p-14">
                        {`${recipe.preparationTime} minutes`}
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
  }, [onPageChange]);

  return (
    <section className={styles['foods-list']}>
      <div className={styles['foods-list__wrapper']}>
        <Text view="p-20">
          Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to{' '}
          <u>holiday feasts</u>.
        </Text>
        <div className={styles['foods-list__actions']}>
          <SearchBar placeholder="Enter dishes" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
          <div className={styles['foods-list__filters']}>
            <label className={styles['foods-list__vegetarian']}>
              <CheckBox
                checked={recipeListStore.vegetarianFilter}
                onChange={(value) => {
                  handleFilterChange('vegetarian', value);
                }}
              />
              <Text view="p-18">Vegetarian</Text>
            </label>
            <TimeInputs
              totalTime={selectedTotalTime}
              cookingTime={selectedCookingTime}
              preparationTime={selectedPreparationTime}
              onTimeChange={handleTimeChange}
            />
            <DropdownRating
              placeholder="Rating"
              value={selectedRating}
              options={[
                { key: '1', value: '1+ stars' },
                { key: '2', value: '2+ stars' },
                { key: '3', value: '3+ stars' },
                { key: '4', value: '4+ stars' },
                { key: '5', value: '5 stars' },
              ]}
              getTitle={(values) => values[0]?.value || 'Rating'}
              onChange={(value) => {
                setSelectedRating(Array.isArray(value) ? value : [value]);
                handleFilterChange('rating', Array.isArray(value) ? value : [value]);
              }}
            />
            <DropdownCategory
              placeholder="Categories"
              options={categoryOptions}
              value={selectedOptionCategory ? [selectedOptionCategory] : []}
              onChange={handleCategoryChange}
              getTitle={(values) => values[0]?.value || 'Categories'}
            />
          </div>
        </div>
        {renderContent()}
      </div>
    </section>
  );
});

export default FoodsList;
