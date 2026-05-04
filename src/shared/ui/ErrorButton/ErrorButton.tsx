import { Component, type ReactNode } from "react";
import { MESSAGES } from "../../data/enums";
import styles from './styles.module.css';

type ErrButtonProps = Record<string, never>;

type State = {
  shouldThrowError: boolean;
};

export class ErrorButton extends Component<ErrButtonProps, State> {
    constructor(props: ErrButtonProps) {
      super(props);
      this.state = {
        shouldThrowError: false,
      };
    }
  
    private handleClick(): void {
      this.setState({ shouldThrowError: true });
    }
  
    public render(): ReactNode {
      const { shouldThrowError } = this.state;
  
      if (shouldThrowError) {
        throw new Error(MESSAGES.ERR_BTN);
      }
  
      return (
        <button
          type="button"
          onClick={() => this.handleClick()}
          className={styles.btn}
        >
          DO NOT PUSH
        </button>
      );
    }
  }