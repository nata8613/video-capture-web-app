import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  @media (min-width: 768px) {
    max-width: min(480px, 35vw);
    max-height: 30vh;
  }

  video {
    animation: ${fadeIn} 0.3s ease-in;
  }
`;

export const VideoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  gap: ${({ theme }) => theme.spacing.medium};
  z-index: 1;
  animation: ${fadeIn} 0.3s ease-in;
`;

export const VideoIcon = styled.svg`
  width: 400px;
  height: 400px;
  fill: none;
  stroke: ${({ theme }) => theme.colors.darkGray};
  stroke-width: 0.5px;
`;
