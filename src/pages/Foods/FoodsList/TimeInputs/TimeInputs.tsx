import React, { useCallback } from 'react';
import Input from 'components/Input';
import styles from './TimeInputs.module.scss';

export interface TimeInputsProps {
  totalTime: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
  onTimeChange: (timeType: 'totalTime' | 'cookingTime' | 'preparationTime', value: number | null) => void;
}

const TimeInputs: React.FC<TimeInputsProps> = ({ totalTime, cookingTime, preparationTime, onTimeChange }) => {
  const handleChange = useCallback(
    (timeType: 'totalTime' | 'cookingTime' | 'preparationTime') => (value: string) => {
      const numValue = value ? Number(value) : null;
      onTimeChange(timeType, numValue);
    },
    [onTimeChange],
  );

  return (
    <div className={styles.timeInputs}>
      <Input
        placeholder="Total Time"
        value={totalTime !== null ? totalTime.toString() : ''}
        onChange={handleChange('totalTime')}
      />
      <Input
        placeholder="Cooking Time"
        value={cookingTime !== null ? cookingTime.toString() : ''}
        onChange={handleChange('cookingTime')}
      />
      <Input
        placeholder="Preparation Time"
        value={preparationTime !== null ? preparationTime.toString() : ''}
        onChange={handleChange('preparationTime')}
      />
    </div>
  );
};

export default React.memo(TimeInputs);
