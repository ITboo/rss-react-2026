import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { MESSAGES, UI } from '../shared/data/enums';

const reloadMock = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: reloadMock },
  writable: true,
});

describe('ErrorPage', () => {
  it('renders error message and refresh button', () => {
    render(<ErrorPage />);
    expect(screen.getByText(MESSAGES.ERROR)).toBeInTheDocument();
    expect(screen.getByText(UI.REFRESH)).toBeInTheDocument();
  });

  it('calls window.location.reload when refresh button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorPage />);
    const refreshButton = screen.getByText(UI.REFRESH);
    await user.click(refreshButton);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});