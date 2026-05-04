import React from 'react';
import type { CharacterContextValue } from '../shared/types/types';

const CharacterContextType: CharacterContextValue = {
  filteredCharacters: [],
  handleSearch: () => {},
};

export const CharacterContext = React.createContext<CharacterContextValue>(CharacterContextType);
