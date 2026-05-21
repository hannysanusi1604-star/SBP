'use client';

import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SmartImage({ src, alt, className = '', priority, sizes }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-ivory-200/60 ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`img-fade absolute inset-0 h-full w-full object-cover ${
          loaded ? 'loaded' : ''
        }`}
      />
    </div>
  );
}
