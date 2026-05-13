import { useContext } from 'react';
import { CharacterContext } from '../../providers/CharactersProvider';

import User from '../User/User';
import { ErrorButton } from '../../shared/ui/ErrorButton/ErrorButton';
import styles from './styles.module.css';
import { SearchForm } from '../../shared/ui/SearchForm/SearchForm';

export const Header = () => {
  const { handleSearch } = useContext(CharacterContext);

  return (
    <header className={styles.header}>
      <div>
        <User />
        <ErrorButton />
      </div>
      <SearchForm onSearch={handleSearch} />
    </header>
  );
};