export interface Character {
    id: number;
    name: string;
    role: string;
    level: number;
    health: number;
    weapon: string;
  }
  
  export interface CharacterContextValue {
    filteredCharacters: Character[];
    handleSearch: (term: string) => void;
  }