import React from 'react';
import MultiDropdown, { MultiDropdownProps } from 'components/MultiDropdown';

const DropdownRating: React.FC<MultiDropdownProps> = ({ onChange, value, ...props }) => {
  return (
    <MultiDropdown
      options={props.options}
      value={value}
      onChange={onChange}
      getTitle={(values) => values[0]?.value || 'Rating'}
      placeholder={props.placeholder}
    />
  );
};

export default DropdownRating;
