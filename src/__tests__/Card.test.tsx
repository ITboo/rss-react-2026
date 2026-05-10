import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UI } from '../shared/data/enums';
import type { Character } from '../shared/types/types';
import Card from '../shared/ui/Card/Card';


describe('Card Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  it('renders character name, status, species, location and image', () => {
    render(<Card character={mockCharacter} />);

    // Заголовок
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent(`${mockCharacter.name} — ${mockCharacter.status} (${mockCharacter.species})`);

    // Локация – ищем абзац с нужным содержимым
    const locationParagraph = screen.getByText((content, element) => {
      return element?.tagName === 'P' && 
             content.includes(UI.LOCATION) && 
             content.includes(mockCharacter.location.name);
    });
    expect(locationParagraph).toBeInTheDocument();

    // Изображение
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', mockCharacter.name);
  });

  it('applies CSS module class to article', () => {
    const { container } = render(<Card character={mockCharacter} />);
    const article = container.querySelector('article');
    expect(article?.className).toMatch(/card/);
  });

  it('renders without crashing', () => {
    expect(() => render(<Card character={mockCharacter} />)).not.toThrow();
  });
});