import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY } from '../constants';
import { FONT_BODY } from '../fonts';
import { Logo } from '../components/Logo';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 20, stiffness: 60 }, delay: 8 });
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  const lineWidth = interpolate(frame, [60, 100], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [85, 120], [25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const urlOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bgOpacity = interpolate(frame, [155, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #232D5A 0%, ${BG} 70%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: bgOpacity,
      }}
    >
      {/* Decorative background circles */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        border: `1px solid ${GOLD}18`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: logoOpacity,
      }} />
      <div style={{
        position: 'absolute',
        width: 950,
        height: 950,
        borderRadius: '50%',
        border: `1px solid ${GOLD}0E`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: logoOpacity,
      }} />

      {/* Logo SVG */}
      <div style={{
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
        marginBottom: 32,
      }}>
        <Logo size={420} />
      </div>

      {/* Orange separator line */}
      <div style={{
        width: lineWidth,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 30,
      }} />

      {/* Tagline */}
      <p style={{
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        margin: 0,
        fontSize: 20,
        fontWeight: 300,
        color: GRAY,
        fontFamily: FONT_BODY,
        letterSpacing: 4,
        textTransform: 'uppercase',
      }}>
        Conciergerie premium · Location courte durée
      </p>

      {/* URL */}
      <p style={{
        opacity: urlOpacity,
        margin: 0,
        marginTop: 18,
        fontSize: 15,
        color: `${GOLD}AA`,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
      }}>
        gward-conciergerie.fr
      </p>
    </AbsoluteFill>
  );
};
