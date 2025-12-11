import styled from 'styled-components';

export const TimerWrapper = styled.div`
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SnapshotContainer = styled.div`
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
