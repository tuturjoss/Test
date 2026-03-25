import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { SCENE_DURATIONS, FADE, BG } from './constants';
import { Intro } from './scenes/Intro';
import { Services } from './scenes/Services';
import { Domain } from './scenes/Domain';
import { Stats } from './scenes/Stats';
import { Reviews } from './scenes/Reviews';
import { CTA } from './scenes/CTA';

const TRANS_FADE = linearTiming({ durationInFrames: FADE });
const TRANS_SLIDE = linearTiming({ durationInFrames: FADE });

export const GwardVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={TRANS_FADE} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.services}>
          <Services />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={TRANS_SLIDE}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.domain}>
          <Domain />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={TRANS_FADE} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.stats}>
          <Stats />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={TRANS_SLIDE}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reviews}>
          <Reviews />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={TRANS_FADE} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
