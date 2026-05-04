import { Component } from 'react';
import { CharacterContext } from '../../providers/CharactersProvider';
import Card from '../../shared/ui/Card/Card';

export class CardList extends Component {
  static contextType = CharacterContext;
  context!: React.ContextType<typeof CharacterContext>;
  render() {
    const { filteredCharacters } = this.context;

    return (
      <div className="card-list" style={{ padding: '20px' }}>
        {filteredCharacters.length === 0 ? (
          <p>Персонажи не найдены</p>
        ) : (
          filteredCharacters.map(character => (
            <Card key={character.id} character={character} />
          ))
        )}
      </div>
    );
  }
}
