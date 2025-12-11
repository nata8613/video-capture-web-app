import React from 'react';
import { StyledError } from './Error.styled';

interface ErrorProps {
  children: React.ReactNode;
}

export const Error: React.FC<ErrorProps> = ({ children }) => {
  return (
    <StyledError role="alert" aria-live="assertive">
      {children}
    </StyledError>
  );
};
