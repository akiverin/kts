import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './FoodsList.module.scss';
import Text from 'components/Text';
import { useSearchParams } from 'react-router';
import { RecipeListStore } from 'entities/recipe/stores/RecipeListStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import SearchBar from 'components/SearchBar';
import DropdownCategory from './DropdownCategory';
import { OptionT } from 'components/MultiDropdown';
import DropdownRating from './DropdownRating/DropdownRating';
import CheckBox from 'components/CheckBox';
import TimeInputs from './TimeInputs';
import { updateSearchParam, resetPageParam } from 'utils/searchParamsHelpers';
import FoodsListContent from './FoodsListContent';
import RandomRecipeButton from './RandomRecipeButton';

const RATING_OPTIONS = [
  { key: '1', value: '1+ stars' },
  { key: '2', value: '2+ stars' },
  { key: '3', value: '3+ stars' },
  { key: '4', value: '4+ stars' },
  { key: '5', value: '5 stars' },
];

const FoodsList: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');
  const [selectedRating, setSelectedRating] = useState<OptionT[]>([]);
  const recipeListStore = useLocalObservable(
    () => new RecipeListStore(setSearchParams, new URLSearchParams(searchParams.toString())),
  );
  useEffect(() => {
    recipeListStore.searchModel.initFromParams(new URLSearchParams(searchParams.toString()));
    recipeListStore.fetchRecipes();
    setLocalSearch(recipeListStore.searchModel.search);
  }, [recipeListStore, searchParams]);

  useEffect(() => {
    recipeListStore.fetchAllCategories();
  }, [recipeListStore]);

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
      if (timeType === 'totalTime') {
        recipeListStore.searchModel.setTotalTime(value);
      } else if (timeType === 'cookingTime') {
        recipeListStore.searchModel.setCookingTime(value);
      } else if (timeType === 'preparationTime') {
        recipeListStore.searchModel.setPreparationTime(value);
      }
      recipeListStore.fetchRecipes();
    },
    [recipeListStore],
  );

  const categoryOptions = useMemo(() => recipeListStore.categoryOptions, [recipeListStore.categoryOptions]);
  const getCategoryOption = useCallback(
    (id: number | null) =>
      id !== null ? recipeListStore.categoryOptions.find((opt) => opt.key === id.toString()) || null : null,
    [recipeListStore.categoryOptions],
  );
  const selectedOptionCategory = useMemo(
    () => getCategoryOption(recipeListStore.searchModel.category),
    [getCategoryOption, recipeListStore.searchModel.category],
  );

  return (
    <section className={styles['foods-list']}>
      <div className={styles['foods-list__wrapper']}>
        <Text view="p-20">
          Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to{' '}
          <u>holiday feasts</u>.
        </Text>
        <div className={styles['foods-list__actions']}>
          <div className={styles['foods-list__search']}>
            <SearchBar placeholder="Enter dishes" value={localSearch} onChange={setLocalSearch} onSearch={onSearch} />
          </div>
          <div className={styles['foods-list__filters']}>
            <RandomRecipeButton recipes={recipeListStore.recipes} />
            <label className={styles['foods-list__vegetarian']}>
              <CheckBox
                checked={recipeListStore.searchModel.vegetarian}
                onChange={(value) => {
                  recipeListStore.searchModel.setVegetarian(value);
                  recipeListStore.fetchRecipes();
                }}
              />
              <Text view="p-18">Vegetarian</Text>
            </label>

            <DropdownRating
              className={styles['foods-list__dropdown']}
              placeholder="Rating"
              value={selectedRating}
              options={RATING_OPTIONS}
              getTitle={(values) => values[0]?.value || 'Rating'}
              onChange={(value) => {
                setSelectedRating(Array.isArray(value) ? value : [value]);
                handleFilterChange('rating', Array.isArray(value) ? value : [value]);
              }}
            />
            <DropdownCategory
              className={styles['foods-list__dropdown']}
              placeholder="Categories"
              options={categoryOptions}
              value={selectedOptionCategory ? [selectedOptionCategory] : []}
              onChange={handleCategoryChange}
              getTitle={(values) => values[0]?.value || 'Categories'}
            />
            <TimeInputs
              totalTime={recipeListStore.searchModel.totalTime}
              cookingTime={recipeListStore.searchModel.cookingTime}
              preparationTime={recipeListStore.searchModel.preparationTime}
              onTimeChange={handleTimeChange}
            />
          </div>
        </div>
        <FoodsListContent
          recipes={recipeListStore.recipes}
          meta={recipeListStore.meta}
          error={recipeListStore.error}
          pagination={recipeListStore.pagination}
          onPageChange={(page) => {
            recipeListStore.searchModel.setPage(page);
            recipeListStore.fetchRecipes();
          }}
        />
      </div>
    </section>
  );
});

export default FoodsList;
