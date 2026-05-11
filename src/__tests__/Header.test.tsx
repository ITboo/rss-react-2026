import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterContext } from '../providers/CharactersProvider';
import { UI } from '../shared/data/enums';
import { Header } from '../widgets/Header/Header';

describe('Header', () => {
  const mockHandleSearch = vi.fn();

  const renderWithContext = (contextValue: any) => {
    return render(
      <CharacterContext.Provider value={contextValue}>
        <Header />
      </CharacterContext.Provider>
    );
  };

  beforeEach(() => {
    mockHandleSearch.mockClear();
  });

  it('renders search input and search button', () => {
    renderWithContext({ handleSearch: mockHandleSearch });
    
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText(UI.SEARCH);
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    renderWithContext({ handleSearch: mockHandleSearch });
    
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Rick' } });
    
    expect(input.value).toBe('Rick');
  });

  it('triggers search callback with correct parameters when search button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext({ handleSearch: mockHandleSearch });
    
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText(UI.SEARCH);
    
    await user.type(input, 'Morty');
    await user.click(button);
    
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith('Morty');
  });

  it('triggers search callback with correct parameters when Enter key is pressed', async () => {
    const user = userEvent.setup();
    renderWithContext({ handleSearch: mockHandleSearch });
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'Summer{Enter}');
    
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    expect(mockHandleSearch).toHaveBeenCalledWith('Summer');
  });
});