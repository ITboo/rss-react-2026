import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharacterContext } from '../providers/CharactersProvider';
import { CardList } from '../widgets/CardList/CardList';
import type { Character } from '../shared/types/types';
import { MESSAGES } from '../shared/data/enums';

describe('CardList', () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth (C-137)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth (C-137)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: '',
    },
  ];

  const renderWithContext = (contextValue: any) => {
    return render(
      <CharacterContext.Provider value={contextValue}>
        <CardList />
      </CharacterContext.Provider>
    );
  };

  it('displays loading message when isLoading is true', () => {
    renderWithContext({
      filteredCharacters: [],
      isLoading: true,
      error: null,
    });
    const loadingDiv = screen.getByText(MESSAGES.LOADING);
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv).toHaveAttribute('aria-label', 'Loading data, please wait');
  });

  it('displays error message when error exists', () => {
    renderWithContext({
      filteredCharacters: [],
      isLoading: false,
      error: 'Failed to fetch',
    });
    expect(screen.getByText(MESSAGES.ERROR)).toBeInTheDocument();
  });

  it('displays not found message when filteredCharacters is empty', () => {
    renderWithContext({
      filteredCharacters: [],
      isLoading: false,
      error: null,
    });
    expect(screen.getByText(MESSAGES.NOT_FOUND)).toBeInTheDocument();
  });

  it('renders a list of Card components when characters exist', () => {
    renderWithContext({
      filteredCharacters: mockCharacters,
      isLoading: false,
      error: null,
    });
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Rick Sanchez');
    expect(headings[1]).toHaveTextContent('Morty Smith');
  });

  it('applies correct CSS module class to container', () => {
    const { container } = renderWithContext({
      filteredCharacters: mockCharacters,
      isLoading: false,
      error: null,
    });
    const div = container.querySelector('div');
    expect(div?.className).toMatch(/cardlist/);
  });
});