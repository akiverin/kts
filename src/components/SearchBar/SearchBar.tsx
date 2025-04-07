import Input, { InputProps } from 'components/Input';
import styles from './SearchBar.module.scss';
import Button from 'components/Button';
import Search from 'components/icons/Search';
import { FormEvent } from 'react';

const SearchBar = ({ onSearch, ...props }: InputProps & { onSearch: (value: string) => void }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(props.value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={styles.search}>
      <Input {...props} />
      <Button type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
