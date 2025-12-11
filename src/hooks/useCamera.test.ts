import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCamera } from './useCamera';

describe('useCamera', () => {
  let mockMediaStream: MediaStream;
  let mockTrack: MediaStreamTrack;

  beforeEach(() => {
    // Mock MediaStreamTrack
    mockTrack = {
      stop: vi.fn(),
      kind: 'video',
      id: 'mock-track-id',
      label: 'Mock Camera',
      enabled: true,
      muted: false,
      readyState: 'live',
    } as unknown as MediaStreamTrack;

    // Mock MediaStream
    mockMediaStream = {
      getTracks: vi.fn(() => [mockTrack]),
      getVideoTracks: vi.fn(() => [mockTrack]),
      getAudioTracks: vi.fn(() => []),
      id: 'mock-stream-id',
      active: true,
    } as unknown as MediaStream;

    // Mock getUserMedia
    Object.defineProperty(global.navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: vi.fn(() => Promise.resolve(mockMediaStream)),
      },
    });

    // Mock HTMLVideoElement
    HTMLVideoElement.prototype.play = vi.fn(() => Promise.resolve());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCamera());

    expect(result.current.stream).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.videoRef.current).toBeNull();
  });

  it('should start camera stream successfully', async () => {
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.startStream();
    });

    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      video: true,
      audio: false,
    });
    expect(result.current.stream).toBe(mockMediaStream);
    expect(result.current.isStreaming).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle camera permission denied error', async () => {
    const permissionError = new Error('Permission denied');
    permissionError.name = 'NotAllowedError';

    vi.spyOn(navigator.mediaDevices, 'getUserMedia').mockRejectedValueOnce(permissionError);

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.startStream();
    });

    expect(result.current.error).toContain('Camera access denied');
    expect(result.current.isStreaming).toBe(false);
  });

  it('should handle camera not found error', async () => {
    const notFoundError = new Error('Camera not found');
    notFoundError.name = 'NotFoundError';

    vi.spyOn(navigator.mediaDevices, 'getUserMedia').mockRejectedValueOnce(notFoundError);

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.startStream();
    });

    expect(result.current.error).toContain('No camera found');
    expect(result.current.isStreaming).toBe(false);
  });

  it('should stop camera stream', async () => {
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.startStream();
    });

    expect(result.current.isStreaming).toBe(true);

    act(() => {
      result.current.stopStream();
    });

    expect(mockTrack.stop).toHaveBeenCalled();
    expect(result.current.stream).toBeNull();
    expect(result.current.isStreaming).toBe(false);
  });

  it('should cleanup stream on unmount', async () => {
    const { result, unmount } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.startStream();
    });

    expect(result.current.isStreaming).toBe(true);

    unmount();

    expect(mockTrack.stop).toHaveBeenCalled();
  });

  it('should capture snapshot from video', () => {
    const { result } = renderHook(() => useCamera());

    // Create a mock video element with read-only properties
    const mockVideo = document.createElement('video');
    Object.defineProperty(mockVideo, 'videoWidth', {
      value: 640,
      writable: false,
    });
    Object.defineProperty(mockVideo, 'videoHeight', {
      value: 480,
      writable: false,
    });

    // Mock the canvas
    const mockCanvas = document.createElement('canvas');
    const mockContext = {
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D;

    vi.spyOn(document, 'createElement').mockReturnValueOnce(mockCanvas);
    vi.spyOn(mockCanvas, 'getContext').mockReturnValueOnce(mockContext);
    vi.spyOn(mockCanvas, 'toDataURL').mockReturnValueOnce('data:image/png;base64,mockdata');

    Object.defineProperty(result.current.videoRef, 'current', {
      writable: true,
      value: mockVideo,
    });

    const snapshot = result.current.captureSnapshot();

    expect(snapshot).toBe('data:image/png;base64,mockdata');
    expect(mockContext.drawImage).toHaveBeenCalledWith(mockVideo, 0, 0, 640, 480);
  });
});
