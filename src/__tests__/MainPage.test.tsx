import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainPage } from '../pages/MainPage/MainPage';

vi.mock('../../widgets/Header/Header', () => ({
  Header: () => <div data-testid="mock-header">Mock Header</div>,
}));

vi.mock('../../widgets/CardList/CardList', () => ({
  CardList: () => <div data-testid="mock-cardlist">Mock CardList</div>,
}));

describe('MainPage', () => {
  it('renders Header and CardList components', () => {
    render(<MainPage />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cardlist')).toBeInTheDocument();
  });
});