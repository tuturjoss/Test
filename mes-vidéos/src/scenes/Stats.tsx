import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY, BG_CARD } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const STATS = [
  { prefix: '+', value: 20, suffix: '', label: 'Propriétaires nous font confiance', icon: '🏠' },
  { prefix: '+', value: 30, suffix: '%', label: 'Revenus en plus', icon: '📈' },
  { prefix: '',  value: 98, suffix: '%', label: 'Taux de satisfaction', icon: '⭐' },
  { prefix: '',  value: 24, suffix: '/7', label: 'Disponibilité', icon: '📞' },
];

const StatBlock: React.FC<{
  stat: (typeof STATS)[0];
  index: number;
}> = ({ stat, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 30 + index * 20;

  const blockOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const blockY = interpolate(frame, [delay, delay + 25], [30, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const progress = interpolate(frame, [delay + 10, delay + 70], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  });
  const displayValue = Math.round(stat.value * progress);

  return (
    <div style={{
      opacity: blockOpacity,
      transform: `translateY(${blockY}px)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 30px',
      border: `1px solid ${GOLD}33`,
      borderRadius: 8,
      background: BG_CARD,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Bottom orange glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 3,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />

      <span style={{ fontSize: 36, marginBottom: 12 }}>{stat.icon}</span>

      <div style={{
        fontSize: 64,
        fontWeight: 700,
        color: GOLD,
        fontFamily: FONT_TITLE,
        lineHeight: 1,
        letterSpacing: -2,
      }}>
        {stat.prefix}{displayValue}{stat.suffix}
      </div>

      <div style={{
        marginTop: 12,
        fontSize: 14,
        color: GRAY,
        fontFamily: FONT_BODY,
        letterSpacing: 1,
        textTransform: 'uppercase',
        lineHeight: 1.4,
      }}>
        {stat.label}
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [15, 40], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #232D5A 0%, ${BG} 65%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 100px',
        opacity: fadeOut,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: GOLD,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
          opacity: titleOpacity,
        }}>Notre bilan</p>
        <h2 style={{
          margin: '10px 0 0',
          fontSize: 44,
          fontWeight: 400,
          color: WHITE,
          fontFamily: FONT_TITLE,
          letterSpacing: 2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          Nos <em style={{ color: GOLD, fontStyle: 'italic' }}>Chiffres</em>
        </h2>
        <div style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          margin: '16px auto 0',
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        width: '100%',
        maxWidth: 1400,
      }}>
        {STATS.map((stat, i) => (
          <StatBlock key={i} stat={stat} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
