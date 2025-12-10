import React from 'react';

type VideoProps = React.PropsWithChildren<React.VideoHTMLAttributes<HTMLVideoElement>>;

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(({ children, ...props }, ref) => {
  return (
    <video ref={ref} {...props}>
      {children}
    </video>
  );
});

Video.displayName = 'Video';
