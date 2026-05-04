import { Component } from 'react';
import { CharacterContext } from '../../providers/CharactersProvider';
import { UI } from '../../shared/data/enums';
import { ErrorButton } from '../../shared/ui/ErrorButton/ErrorButton';

interface HeaderState {
  inputValue: string;
}

export class Header extends Component<{}, HeaderState> {
  static contextType = CharacterContext;
  context!: React.ContextType<typeof CharacterContext>;
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = ():void => {
    this.context.handleSearch(this.state.inputValue);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      this.context.handleSearch(this.state.inputValue);
    }
  };

  render() {
    return (
      <header>
        <ErrorButton/>
        <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleSearchClick}>{UI.SEARCH}</button>
        </div>
      </header>
    );
  }
}
