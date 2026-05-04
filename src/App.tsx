import { Component } from 'react';
import { CharacterContext } from './providers/CharactersProvider';
import { MainPage } from './pages/MainPage/MainPage';
import type { Character, CharacterContextValue } from './shared/types/types';


interface AppState {
  apiCharacters: Character[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const savedSearchTerm = localStorage.getItem('characterSearchTerm') || '';
    this.state = {
      apiCharacters: [],
      searchTerm: savedSearchTerm,
      isLoading: true,
      error: null,
    };
  }

  fetchCharacters = async (search: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      const url = search.trim()
        ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(search.trim())}`
        : 'https://rickandmortyapi.com/api/character';
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ apiCharacters: data.results || [], isLoading: false });
    } catch (err: any) {
      this.setState({
        error: err.message || 'Не удалось загрузить персонажей. Попробуйте позже.',
        isLoading: false,
        apiCharacters: [],
      });
    }
  };

  componentDidMount() {
    this.fetchCharacters(this.state.searchTerm);
  }

  handleSearch = (term: string) => {
    localStorage.setItem('characterSearchTerm', term);
    this.setState({ searchTerm: term }, () => {
      this.fetchCharacters(term);
    });
  };

  render() {
    const { apiCharacters, searchTerm, isLoading, error } = this.state;

    const contextValue: CharacterContextValue = {
      filteredCharacters: apiCharacters,
      searchTerm,
      handleSearch: this.handleSearch,
      isLoading,
      error,
    };

    return (
      <CharacterContext.Provider value={contextValue}>
        <MainPage />
      </CharacterContext.Provider>
    );
  }
}
