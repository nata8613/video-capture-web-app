import styled from 'styled-components';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 280px;

  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};

  font-family: ${({ theme }) => theme.typography.font.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 3px;
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    background-color: ${theme.colors.buttonDisabled};
    color: ${theme.colors.textDisabled};
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
  `}

  @media (min-width: 480px) {
    width: auto;
    padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  }
`;
