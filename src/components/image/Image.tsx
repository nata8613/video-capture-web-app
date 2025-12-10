import React from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ alt, ...props }, ref) => {
  return <img ref={ref} alt={alt} {...props} />;
});

Image.displayName = 'Image';
