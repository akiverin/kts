import MultiDropdown, { MultiDropdownProps, OptionT } from 'components/MultiDropdown';
const DropdownCategory = ({ onChange, options, value, getTitle, ...props }: MultiDropdownProps) => {
  const handleChange = (selected: OptionT | OptionT[]) => {
    const values = Array.isArray(selected) ? selected : [selected];
    onChange(values);
  };
  return (
    <MultiDropdown
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={props.placeholder}
      getTitle={getTitle}
    />
  );
};

export default DropdownCategory;
