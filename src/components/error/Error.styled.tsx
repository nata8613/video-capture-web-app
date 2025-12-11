import styled from 'styled-components';

export const StyledError = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.typography.font.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  z-index: 1;
`;
