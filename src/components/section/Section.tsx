import React from 'react';
import { StyledSection } from './Section.styled';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = ({ children, ...props }: SectionProps) => {
  return <StyledSection {...props}>{children}</StyledSection>;
};
