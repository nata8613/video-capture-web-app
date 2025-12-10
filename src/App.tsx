import { Text } from './components/text/Text';
import { Button } from './components/button/Button';
import { Section } from './components/section/Section';

function App() {
  return (
    <Section>
      <Text as="h1">Video Capture</Text>
      <Text>Click the button to allow camera access. A photo will be taken automatically after a few seconds.</Text>
      <Button>Start</Button>
    </Section>
  );
}

export default App;
