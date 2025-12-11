import { Section } from '../../components/section/Section';
import { Video } from '../../components/video/Video';
import { Error } from '../../components/error/Error';
import { useCameraContext } from '../../contexts/CameraContext';
import { VideoContainer, VideoPlaceholder, VideoIcon } from './VideoPreview.styled';

export const VideoPreview = () => {
  const { videoRef, error, isStreaming } = useCameraContext();

  return (
    <Section aria-label="Video preview">
      <VideoContainer role="region" aria-label="Camera feed">
        {!isStreaming && !error && (
          <VideoPlaceholder aria-hidden="true">
            <VideoIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="14" height="12" rx="2" />
              <path d="M17 10l4-2v8l-4-2" />
            </VideoIcon>
          </VideoPlaceholder>
        )}
        <Video ref={videoRef} autoPlay muted aria-label="Live camera preview" />
        {error && <Error>{error}</Error>}
      </VideoContainer>
    </Section>
  );
};
