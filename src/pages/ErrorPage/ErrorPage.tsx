import { MESSAGES, UI } from '../../shared/data/enums';

export const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <p>{MESSAGES.ERROR}</p>
      <button onClick={handleRefresh}>{UI.REFRESH}</button>
    </>
  );
};
