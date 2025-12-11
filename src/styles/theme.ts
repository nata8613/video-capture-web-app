export const theme = {
  colors: {
    primary: '#0055CC',
    secondary: '#003E99',
    backgroundLight: '#FFFFFF',
    backgroundDark: '#1A1A1A',
    white: '#FFFFFF',
    black: '#1A1A1A',
    gray: '#E0E0E0',
    darkGray: '#A19F9F',
    success: '#2E7D32',
    error: '#C62828',
    warning: '#ED6C02',
    textPrimary: '#1A1A1A',
    textSecondary: '#616161',
    textDisabled: '#9E9E9E',
    buttonHover: '#003E99',
    buttonDisabled: '#E0E0E0',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '32px',
  },
  typography: {
    font: {
      primary: "'Roboto', sans-serif",
      secondary: "'Lora', serif",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    fontSize: {
      small: '0.8rem',
      base: '1rem',
      large: '1.4rem',
    },
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    xLarge: '24px',
  },
  shadow: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
} as const;

export type Theme = typeof theme;
