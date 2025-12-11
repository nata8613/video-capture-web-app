import React from 'react';
import { StyledText } from './Text.styled';

export type TypographyHtmlElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

interface TextProps<T extends TypographyHtmlElement> extends React.HTMLAttributes<HTMLElement> {
  as?: T;
  children: React.ReactNode;
}

export const Text = <T extends TypographyHtmlElement>({
  as: Component = 'p' as T,
  children,
  ...props
}: TextProps<T>) => {
  return (
    <StyledText as={Component} {...props}>
      {children}
    </StyledText>
  );
};
