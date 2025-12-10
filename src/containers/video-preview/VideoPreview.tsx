import { Section } from '../../components/section/Section';
import { Video } from '../../components/video/Video';
import { Text } from '../../components/text/Text';
import { useCameraContext } from '../../contexts/CameraContext';

export const VideoPreview = () => {
  const { videoRef, error } = useCameraContext();

  return (
    <Section>
      <Video ref={videoRef} autoPlay muted />
      {error && <Text as="span">{error}</Text>}
    </Section>
  );
};
