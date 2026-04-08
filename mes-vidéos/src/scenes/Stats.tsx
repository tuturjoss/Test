import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY, BG_CARD } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const STATS = [
  { prefix: '+', value: 20, suffix: '',   label: 'Propriétaires\nnous font confiance', icon: '🏠' },
  { prefix: '+', value: 30, suffix: '%',  label: 'Revenus\nen plus',                  icon: '📈' },
  { prefix: '',  value: 98, suffix: '%',  label: 'Taux de\nsatisfaction',             icon: '⭐' },
  { prefix: '',  value: 24, suffix: '/7', label: 'Disponibilité\ngarantie',           icon: '📞' },
];

const StatBlock: React.FC<{ stat: (typeof STATS)[0]; index: number }> = ({ stat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 1.2 * fps + index * 0.4 * fps;
  const blockSpring = spring({ frame, fps, config: { damping: 200 }, delay, durationInFrames: 1.5 * fps });
  const opacity = interpolate(frame - delay, [0, 0.6 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Counter animation — cubic easing per skill
  const progress = interpolate(frame, [delay + 0.3 * fps, delay + 2.5 * fps], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const displayValue = Math.round(stat.value * progress);

  return (
    <div style={{
      opacity,
      transform: `translateY(${interpolate(blockSpring, [0, 1], [40, 0])})`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '44px 24px',
      border: `1px solid ${GOLD}30`,
      borderRadius: 12,
      background: BG_CARD,
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
    }}>
      {/* Top glow bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />
      {/* Bottom glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 1,
        background: `${GOLD}40`,
        boxShadow: `0 0 20px 2px ${GOLD}30`,
      }} />

      <div style={{ fontSize: 70, fontWeight: 700, color: GOLD, fontFamily: FONT_TITLE, lineHeight: 1, letterSpacing: -2 }}>
        {stat.prefix}{displayValue}{stat.suffix}
      </div>

      <div style={{
        marginTop: 16, fontSize: 14, color: GRAY, fontFamily: FONT_BODY,
        letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1.6,
        whiteSpace: 'pre-line',
      }}>
        {stat.label}
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 1 * fps], [25, 0], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const lineW = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 200], {
    easing: Easing.inOut(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 35%, #232D5A 0%, ${BG} 65%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 100px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 70, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{
          margin: 0, fontSize: 13, color: GOLD, letterSpacing: 6,
          textTransform: 'uppercase', fontFamily: FONT_BODY,
        }}>Notre bilan</p>
        <h2 style={{
          margin: '14px 0 0', fontSize: 52, fontWeight: 400, color: WHITE, fontFamily: FONT_TITLE,
        }}>
          Nos <em style={{ color: GOLD, fontStyle: 'italic' }}>Chiffres</em>
        </h2>
        <div style={{
          width: lineW, height: 1, margin: '20px auto 0',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />
      </div>

      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1500 }}>
        {STATS.map((stat, i) => <StatBlock key={i} stat={stat} index={i} />)}
      </div>
    </AbsoluteFill>
  );
};
