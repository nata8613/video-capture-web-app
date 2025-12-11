import styled, { css } from 'styled-components';
import { type TypographyHtmlElement } from './Text';

export const StyledText = styled.p<{ as?: TypographyHtmlElement }>`
  margin: 0;
  padding: 0;

  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.font.primary};
  line-height: 1.4;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  ${({ as, theme }) => {
    switch (as) {
      case 'h1':
        return css`
          font-size: 2rem;
          font-weight: ${theme.typography.fontWeight.medium};

          @media (min-width: 768px) {
            font-size: 2.2rem;
          }
        `;
      case 'h2':
        return css`
          font-size: 1.8rem;
          font-weight: ${theme.typography.fontWeight.bold};

          @media (min-width: 768px) {
            font-size: 2rem;
          }
        `;
      case 'h3':
        return css`
          font-size: 1.6rem;
          font-weight: ${theme.typography.fontWeight.medium};
        `;
      case 'h4':
        return css`
          font-size: 1.4rem;
          font-weight: ${theme.typography.fontWeight.medium};
        `;
      case 'h5':
        return css`
          font-size: 1.2rem;
          font-weight: ${theme.typography.fontWeight.medium};
        `;
      case 'h6':
        return css`
          font-size: 1rem;
          font-weight: ${theme.typography.fontWeight.medium};
        `;
      case 'label':
        return css`
          font-weight: ${theme.typography.fontWeight.medium};
        `;
      case 'span':
      case 'p':
      default:
        return css`
          font-weight: ${theme.typography.fontWeight.regular};
        `;
    }
  }}
`;
