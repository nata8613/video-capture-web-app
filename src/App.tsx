import { Instructions } from './containers/instructions/Instructions';
import { VideoPreview } from './containers/video-preview/VideoPreview';
import { CameraProvider } from './contexts/CameraContext';

function App() {
  return (
    <CameraProvider>
      <Instructions />
      <VideoPreview />
    </CameraProvider>
  );
}

export default App;
