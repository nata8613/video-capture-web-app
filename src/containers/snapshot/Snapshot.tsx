import { useState } from 'react';
import { Section } from '../../components/section/Section';
import { Image } from '../../components/image/Image';
import { Timer } from '../../components/timer/Timer';
import { useCameraContext } from '../../contexts/CameraContext';

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
      {isStreaming && <Timer durationInSeconds={5} onComplete={handleTimerComplete} />}
      {imageDataUrl && <Image src={imageDataUrl} alt="Captured snapshot" />}
    </Section>
  );
};
