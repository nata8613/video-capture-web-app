import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Timer } from './Timer';
import { theme } from '../../styles/theme';

describe('Timer', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it('should render initial countdown time', () => {
    renderWithTheme(<Timer durationInSeconds={5} />);
    expect(screen.getByText(/Photo will be taken in: 5 seconds/i)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    renderWithTheme(<Timer durationInSeconds={5} />);
    const timer = screen.getByRole('timer');
    expect(timer).toHaveAttribute('aria-live', 'polite');
    expect(timer).toHaveAttribute('aria-atomic', 'true');
  });

  it('should countdown from initial value', async () => {
    renderWithTheme(<Timer durationInSeconds={3} />);

    expect(screen.getByText(/Photo will be taken in: 3 seconds/i)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/Photo will be taken in: 2 seconds/i)).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('should call onComplete callback when timer reaches 0', async () => {
    const onComplete = vi.fn();
    renderWithTheme(<Timer durationInSeconds={1} onComplete={onComplete} />);

    await waitFor(
      () => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );
  });
});
