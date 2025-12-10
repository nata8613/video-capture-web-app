import { ThemeProvider } from 'styled-components';
import { Instructions } from './containers/instructions/Instructions';
import { VideoPreview } from './containers/video-preview/VideoPreview';
import { Snapshot } from './containers/snapshot/Snapshot';
import { CameraProvider } from './contexts/CameraContext';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CameraProvider>
        <Instructions />
        <VideoPreview />
        <Snapshot />
      </CameraProvider>
    </ThemeProvider>
  );
}

export default App;
