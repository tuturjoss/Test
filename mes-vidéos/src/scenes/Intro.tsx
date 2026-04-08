import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY } from '../constants';
import { FONT_BODY, FONT_TITLE } from '../fonts';
import { Logo } from '../components/Logo';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo: smooth spring entrance — damping:200 = no bounce (per skill)
  const logoSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 1.5 * fps });
  const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Separator line
  const lineW = interpolate(frame, [1.5 * fps, 2.5 * fps], [0, 320], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline words
  const tagOpacity = interpolate(frame, [2 * fps, 3 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tagY = interpolate(frame, [2 * fps, 3 * fps], [20, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL
  const urlOpacity = interpolate(frame, [3 * fps, 4 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Decorative circles pulse
  const ringPulse = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.96, 1.04],
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #232D5A 0%, ${BG} 70%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated rings */}
      {[700, 900].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size * ringPulse,
          height: size * ringPulse,
          borderRadius: '50%',
          border: `1px solid ${GOLD}${i === 0 ? '20' : '10'}`,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: logoOpacity,
        }} />
      ))}

      {/* Logo */}
      <div style={{
        opacity: logoOpacity,
        transform: `scale(${logoSpring})`,
        marginBottom: 28,
      }}>
        <Logo size={460} />
      </div>

      {/* Separator */}
      <div style={{
        width: lineW,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 32,
      }} />

      {/* Tagline */}
      <p style={{
        opacity: tagOpacity,
        transform: `translateY(${tagY}px)`,
        margin: 0,
        fontSize: 22,
        fontWeight: 300,
        color: GRAY,
        fontFamily: FONT_BODY,
        letterSpacing: 5,
        textTransform: 'uppercase',
      }}>
        Conciergerie premium · Location courte durée
      </p>

      {/* URL */}
      <p style={{
        opacity: urlOpacity,
        margin: '20px 0 0',
        fontSize: 15,
        color: `${GOLD}BB`,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
      }}>
        gward-conciergerie.fr
      </p>
    </AbsoluteFill>
  );
};
