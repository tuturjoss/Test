import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, delay: 5 });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const titleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [25, 50], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lineWidth = interpolate(frame, [45, 70], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [60, 85], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const urlOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bgOpacity = interpolate(frame, [85, 100], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: `1px solid ${GOLD}22`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: logoOpacity,
      }} />
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        border: `1px solid ${GOLD}11`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: logoOpacity,
      }} />

      {/* Logo image */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
          borderRadius: 12,
          overflow: 'hidden',
          width: 220,
          height: 220,
          background: WHITE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 40px ${GOLD}33`,
        }}
      >
        <Img
          src={staticFile('image.png')}
          style={{ width: '90%', height: '90%', objectFit: 'contain' }}
        />
      </div>

      {/* Gold separator line */}
      <div style={{
        width: lineWidth,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginTop: 8,
        marginBottom: 24,
      }} />

      {/* Tagline */}
      <p style={{
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        margin: 0,
        fontSize: 18,
        fontWeight: 300,
        color: GRAY,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
        textTransform: 'uppercase',
      }}>
        Conciergerie premium · Location courte durée
      </p>

      {/* URL */}
      <p style={{
        opacity: urlOpacity,
        margin: 0,
        marginTop: 16,
        fontSize: 14,
        color: `${GOLD}99`,
        fontFamily: FONT_BODY,
        letterSpacing: 2,
      }}>
        gward-conciergerie.fr
      </p>
    </AbsoluteFill>
  );
};
