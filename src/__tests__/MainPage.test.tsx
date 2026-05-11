import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/MainPage/MainPage';
import { CharacterContext } from '../providers/CharactersProvider';

const mockContextValue = {
  filteredCharacters: [],
  searchTerm: '',
  handleSearch: () => {},
  isLoading: false,
  error: null,
};

describe('MainPage', () => {
  it('renders Header and CardList components', () => {
    render(
      <CharacterContext.Provider value={mockContextValue}>
        <MainPage />
      </CharacterContext.Provider>
    );
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    const notFoundMessage = screen.getByText(/Ooops. Nothing's here/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});