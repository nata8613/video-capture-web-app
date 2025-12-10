import { Instructions } from './containers/instructions/Instructions';
import { VideoPreview } from './containers/video-preview/VideoPreview';
import { Snapshot } from './containers/snapshot/Snapshot';
import { CameraProvider } from './contexts/CameraContext';

function App() {
  return (
    <CameraProvider>
      <Instructions />
      <VideoPreview />
      <Snapshot />
    </CameraProvider>
  );
}

export default App;
