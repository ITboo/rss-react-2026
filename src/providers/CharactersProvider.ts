import React from 'react';
import type { CharacterContextValue } from '../shared/types/types';

const CharacterContextType: CharacterContextValue = {
  filteredCharacters: [],
  handleSearch: () => { },
  searchTerm: '',
  isLoading: true,
  error: ''
};

export const CharacterContext = React.createContext<CharacterContextValue>(CharacterContextType);
