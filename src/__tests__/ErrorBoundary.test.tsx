import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../providers/ErrorBoundary';
import { MESSAGES, UI } from '../shared/data/enums';
import { ErrorButton } from '../shared/ui/ErrorButton/ErrorButton';

const reloadMock = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: reloadMock },
  writable: true,
});

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  const GoodChild = () => <div>Hello World</div>;

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders ErrorPage when a child component throws error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(MESSAGES.ERROR)).toBeInTheDocument();
    expect(screen.getByText(UI.REFRESH)).toBeInTheDocument();
    spy.mockRestore();
  });

  it('logs error to console via componentDidCatch', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const ThrowError = () => {
      throw new Error('Specific error message');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    const calls = consoleErrorSpy.mock.calls;
    const found = calls.some(call => call[0] && call[0].includes('Specific error message'));
    expect(found).toBe(true);
    
    consoleErrorSpy.mockRestore();
  });

  it('works with ErrorButton that throws error when clicked', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    
    const button = screen.getByText('DO NOT PUSH');
    expect(button).toBeInTheDocument();
    
    await user.click(button);
    
    expect(screen.getByText(MESSAGES.ERROR)).toBeInTheDocument();
    expect(screen.getByText(UI.REFRESH)).toBeInTheDocument();
  });
});