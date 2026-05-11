import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { MESSAGES } from '../shared/data/enums';

vi.setConfig({ testTimeout: 20000 });

const mockFetch = vi.fn();
global.fetch = mockFetch;

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const createMockCharacter = (id: number, name: string) => ({
  id,
  name,
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://example.com/image.jpg',
  episode: [],
  url: '',
  created: '',
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockFetch.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockApiSuccess = (characters: any[] = [createMockCharacter(1, 'Rick Sanchez')]) => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ results: characters }),
    });
  };

  const mockApiError = (status: number = 500) => {
    mockFetch.mockResolvedValue({
      ok: false,
      status,
    });
  };

  const advanceTimers = async (ms: number) => {
    await act(async () => {
      vi.advanceTimersByTime(ms);
      await Promise.resolve();
    });
  };

  it('Makes initial API call on component mount (without saved search term)', async () => {
    mockApiSuccess();
    await act(async () => {
      render(<App />);
    });
    await advanceTimers(2000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://rickandmortyapi.com/api/character');
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorageMock.getItem.mockReturnValue('Morty');
    mockApiSuccess();
    await act(async () => {
      render(<App />);
    });
    await advanceTimers(2000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toContain('?name=Morty');
  });

  it('Manages loading states during API calls', async () => {
    mockApiSuccess();
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(MESSAGES.LOADING)).toBeInTheDocument();
    await advanceTimers(2000);
    expect(screen.queryByText(MESSAGES.LOADING)).not.toBeInTheDocument();
  });

  it('Handles successful API responses and updates component state', async () => {
    const rick = createMockCharacter(1, 'Rick Sanchez');
    mockApiSuccess([rick]);
    await act(async () => {
      render(<App />);
    });
    await advanceTimers(2000);
    expect(screen.getByText(/Rick Sanchez/)).toBeInTheDocument();
  });

  it('Handles API error responses and displays error message', async () => {
    mockApiError(404);
    await act(async () => {
      render(<App />);
    });
    await advanceTimers(2000);
    expect(screen.getByText(MESSAGES.ERROR)).toBeInTheDocument();
  });

  it('Calls API with correct parameters (trimmed and encoded)', async () => {
    vi.useRealTimers();
    mockApiSuccess();
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1), { timeout: 5000 });
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');
    await userEvent.type(input, '  Rick  ');
    mockFetch.mockClear();
    mockApiSuccess();
    await userEvent.click(button);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      const url = mockFetch.mock.calls[0][0];
      expect(url).toBe('https://rickandmortyapi.com/api/character/?name=Rick');
    }, { timeout: 5000 });
    vi.useFakeTimers();
  });
  
  it('Manages search term state correctly and saves to localStorage', async () => {
    vi.useRealTimers();
    mockApiSuccess();
    render(<App />);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1), { timeout: 5000 });
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');
    await userEvent.type(input, 'Summer');
    await userEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('characterSearchTerm', 'Summer');
    vi.useFakeTimers();
  });
});