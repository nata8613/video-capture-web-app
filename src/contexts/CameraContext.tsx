import React, { createContext, useContext } from 'react';
import { useCamera } from '../hooks/useCamera';

type CameraContextType = ReturnType<typeof useCamera>;

interface CameraProviderProps {
  children: React.ReactNode;
}

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider = ({ children }: CameraProviderProps) => {
  const camera = useCamera();

  return <CameraContext.Provider value={camera}>{children}</CameraContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCameraContext = () => {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }

  return context;
};
