import { Component } from 'react';
import { MESSAGES, UI } from '../../shared/data/enums';

export class ErrorPage extends Component {
    private static handleRefresh = (): void => {
        window.location.reload();
      };
  render() {
    return (
      <>
        <p>{MESSAGES.ERROR}</p>
        <button onClick={ErrorPage.handleRefresh}>{UI.REFRESH}</button>
      </>
    );
  }
}
