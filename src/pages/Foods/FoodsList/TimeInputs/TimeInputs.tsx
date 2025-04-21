import React, { useEffect, useMemo, useState } from 'react';
import Input from 'components/Input';
import styles from './TimeInputs.module.scss';
import { debounceNumberInput } from 'utils/debounce';

export interface TimeInputsProps {
  totalTime: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
  onTimeChange: (timeType: 'totalTime' | 'cookingTime' | 'preparationTime', value: number | null) => void;
}

const TimeInputs: React.FC<TimeInputsProps> = ({ totalTime, cookingTime, preparationTime, onTimeChange }) => {
  const [localTotalTime, setLocalTotalTime] = useState(totalTime !== null ? totalTime.toString() : '');
  const [localCookingTime, setLocalCookingTime] = useState(cookingTime !== null ? cookingTime.toString() : '');
  const [localPreparationTime, setLocalPreparationTime] = useState(
    preparationTime !== null ? preparationTime.toString() : '',
  );

  // Обновление локальных состояний при изменении props извне
  useEffect(() => setLocalTotalTime(totalTime !== null ? totalTime.toString() : ''), [totalTime]);
  useEffect(() => setLocalCookingTime(cookingTime !== null ? cookingTime.toString() : ''), [cookingTime]);
  useEffect(
    () => setLocalPreparationTime(preparationTime !== null ? preparationTime.toString() : ''),
    [preparationTime],
  );

  // Дебаунс-функции для каждого типа времени
  const debouncedHandlers = useMemo(
    () => ({
      totalTime: debounceNumberInput((value) => onTimeChange('totalTime', value), 500),
      cookingTime: debounceNumberInput((value) => onTimeChange('cookingTime', value), 500),
      preparationTime: debounceNumberInput((value) => onTimeChange('preparationTime', value), 500),
    }),
    [onTimeChange],
  );

  const handleInputChange = (timeType: 'totalTime' | 'cookingTime' | 'preparationTime') => (value: string) => {
    const numValue = value.trim() !== '' ? Number(value) : null;

    if (timeType === 'totalTime') setLocalTotalTime(value);
    else if (timeType === 'cookingTime') setLocalCookingTime(value);
    else if (timeType === 'preparationTime') setLocalPreparationTime(value);

    debouncedHandlers[timeType](numValue);
  };

  return (
    <div className={styles.timeInputs}>
      <Input placeholder="Total Time" value={localTotalTime} onChange={handleInputChange('totalTime')} />
      <Input placeholder="Cooking Time" value={localCookingTime} onChange={handleInputChange('cookingTime')} />
      <Input
        placeholder="Preparation Time"
        value={localPreparationTime}
        onChange={handleInputChange('preparationTime')}
      />
    </div>
  );
};

export default React.memo(TimeInputs);
