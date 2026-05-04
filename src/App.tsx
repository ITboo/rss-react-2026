import { Component } from 'react';
import { CharacterContext } from './providers/CharactersProvider';
import { MainPage } from './pages/MainPage/MainPage';
import rawData from './shared/data/items.json';

import type { Character } from './shared/types/types';

const characterData = rawData as { characters: Character[] };

interface AppState {
  characters: Character[];
  searchTerm: string;
}

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const savedSearchTerm = localStorage.getItem('characterSearchTerm') || '';
    this.state = {
      characters: characterData.characters,
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = (term: string): void => {
    this.setState({ searchTerm: term });
  };

  getFilteredCharacters = (): Character[] => {
    const { characters, searchTerm } = this.state;
    if (!searchTerm.trim()) return characters;

    const lowerTerm = searchTerm.toLowerCase();
    return characters.filter(
      (char) =>
        char.name.toLowerCase().includes(lowerTerm) ||
        char.role.toLowerCase().includes(lowerTerm)
    );
  };

  render() {
    const filteredCharacters = this.getFilteredCharacters();

    return (
      <CharacterContext.Provider
        value={{
          filteredCharacters: filteredCharacters,
          handleSearch: this.handleSearch,
        }}
      >
        <MainPage />
      </CharacterContext.Provider>
    );
  }
}