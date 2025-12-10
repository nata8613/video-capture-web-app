import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Section = ({ children, ...props }: SectionProps) => {
  return <section {...props}>{children}</section>;
};
