import { useState } from 'react';
import styles from './styles.module.css'; 
import { UI } from '../../data/enums';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <div className={styles.search_form}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.search_btn} onClick={handleSearchClick}>
        {UI.SEARCH}
      </button>
    </div>
  );
};