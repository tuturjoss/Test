import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { GOLD } from '../constants';

export const GoldLine: React.FC<{ delay?: number; width?: number }> = ({
  delay = 0,
  width = 80,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        height: 2,
        width: `${progress * width}px`,
        background: `linear-gradient(90deg, ${GOLD}, transparent)`,
        margin: '12px 0',
      }}
    />
  );
};
