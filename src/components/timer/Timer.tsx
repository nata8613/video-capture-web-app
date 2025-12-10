import { useEffect, useState } from 'react';
import { Text } from '../../components/text/Text';

interface TimerProps {
  durationInSeconds: number;
  onComplete?: () => void;
}

export const Timer = ({ durationInSeconds, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return <Text as="span">Photo will be taken in: {timeLeft} seconds</Text>;
};
