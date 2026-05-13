import { useContext } from 'react';
import { CharacterContext } from '../../providers/CharactersProvider';
import Card from '../../shared/ui/Card/Card';
import { MESSAGES } from '../../shared/data/enums';
import styles from './styles.module.css';

export const CardList = () => {
  const { filteredCharacters, isLoading, error } = useContext(CharacterContext);

  if (isLoading) {
    return <div aria-label="Loading data, please wait">{MESSAGES.LOADING}</div>;
  }

  if (error) {
    return <div>{MESSAGES.ERROR}</div>;
  }

  if (!filteredCharacters || filteredCharacters.length === 0) {
    return <div>{MESSAGES.NOT_FOUND}</div>;
  }

  return (
    <div className={styles.cardlist}>
      {filteredCharacters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};