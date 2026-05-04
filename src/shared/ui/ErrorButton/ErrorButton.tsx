import { Component, type ReactNode } from "react";

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
        throw new Error('Error button was clicked');
      }
  
      return (
        <button
          type="button"
          onClick={() => this.handleClick()}
        >
          DO NOT PUSH
        </button>
      );
    }
  }