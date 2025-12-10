import { useRef, useState, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const startStream = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setStream(mediaStream);
      setIsStreaming(true);
      setError(null);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(mapError(err));
      setIsStreaming(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    videoRef,
    stream,
    error,
    isStreaming,
    startStream,
    stopStream,
  };
};

const ERROR_MESSAGES: Record<string, string> = {
  NotAllowedError: 'Camera access denied. Please allow camera access in your browser settings and click the Start button again.',
  PermissionDeniedError: 'Camera access denied. Please allow camera access in your browser settings and click the Start button again.',
  NotFoundError: 'No camera found on this device. Please connect a camera and click the Start button again.',
};

function mapError(err: unknown): string {
  if (!(err instanceof Error)) {
    return 'Failed to access camera. Please try again.';
  }

  return ERROR_MESSAGES[err.name] ?? `Failed to access camera: ${err.message}`;
}
