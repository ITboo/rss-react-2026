import { Component } from 'react';
import { CharacterContext } from '../../providers/CharactersProvider';
import Card from '../../shared/ui/Card/Card';
import { MESSAGES } from '../../shared/data/enums';

export class CardList extends Component<{}, {}> {
  static contextType = CharacterContext;
  context!: React.ContextType<typeof CharacterContext>;

  render() {
    const { filteredCharacters, isLoading, error } = this.context;

    if (isLoading) {
      return <div>{MESSAGES.LOADING}</div>;
    }

    if (error) {
      return <div>{MESSAGES.ERROR}</div>;
    }

    if (!filteredCharacters || filteredCharacters.length === 0) {
      return <div>{MESSAGES.NOT_FOUND}</div>;
    }

    return (
      <div>
        {filteredCharacters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
