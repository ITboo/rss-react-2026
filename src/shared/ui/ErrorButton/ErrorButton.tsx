import { useState } from "react";
import { MESSAGES } from "../../data/enums";
import styles from './styles.module.css';

export const ErrorButton = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error(MESSAGES.ERR_BTN);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.btn}
    >
      DO NOT PUSH
    </button>
  );
};