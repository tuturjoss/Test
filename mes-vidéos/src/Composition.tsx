import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SCENE, TOTAL_FRAMES } from './constants';
import { Intro } from './scenes/Intro';
import { Services } from './scenes/Services';
import { Domain } from './scenes/Domain';
import { Stats } from './scenes/Stats';
import { Reviews } from './scenes/Reviews';
import { CTA } from './scenes/CTA';

export const GwardVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#181F3D' }}>
      <Sequence from={SCENE.intro.start} durationInFrames={SCENE.intro.duration}>
        <Intro />
      </Sequence>

      <Sequence from={SCENE.services.start} durationInFrames={SCENE.services.duration}>
        <Services />
      </Sequence>

      <Sequence from={SCENE.domain.start} durationInFrames={SCENE.domain.duration}>
        <Domain />
      </Sequence>

      <Sequence from={SCENE.stats.start} durationInFrames={SCENE.stats.duration}>
        <Stats />
      </Sequence>

      <Sequence from={SCENE.reviews.start} durationInFrames={SCENE.reviews.duration}>
        <Reviews />
      </Sequence>

      <Sequence from={SCENE.cta.start} durationInFrames={SCENE.cta.duration}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
