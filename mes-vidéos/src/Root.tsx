import React from 'react';
import { Composition } from 'remotion';
import { GwardVideo } from './Composition';
import { TOTAL_FRAMES, FPS } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GwardConciergerie"
        component={GwardVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
