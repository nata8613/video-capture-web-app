import { useState } from 'react';
import { Section } from '../../components/section/Section';
import { Image } from '../../components/image/Image';
import { Timer } from '../../components/timer/Timer';
import { useCameraContext } from '../../contexts/CameraContext';
import { SnapshotContainer, TimerWrapper } from './Snapshot.styled';

export const Snapshot = () => {
  const { isStreaming, captureSnapshot, stopStream } = useCameraContext();
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const handleTimerComplete = () => {
    const snapshot = captureSnapshot();
    if (snapshot) {
      setImageDataUrl(snapshot);
      stopStream();
    }
  };

  return (
    <Section>
      <TimerWrapper>
        {isStreaming && <Timer durationInSeconds={5} onComplete={handleTimerComplete} />}
      </TimerWrapper>
      {imageDataUrl && (
        <SnapshotContainer>
          <Image src={imageDataUrl} alt="Captured snapshot" />
        </SnapshotContainer>
      )}
    </Section>
  );
};
