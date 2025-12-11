import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from './Button';
import { theme } from '../../styles/theme';

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Button', () => {
  it('should the button with text', () => {
    renderWithTheme(<Button>Start</Button>);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should be focusable with keyboard', () => {
    renderWithTheme(<Button>Focus</Button>);

    const button = screen.getByRole('button', { name: /focus/i });
    button.focus();

    expect(button).toHaveFocus();
  });
});
