import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, GOLD_LIGHT, WHITE, GRAY } from '../constants';

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
        background: `radial-gradient(ellipse at center, #1a1208 0%, ${BG} 70%)`,
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

      {/* Logo monogram */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      >
        <div style={{
          width: 110,
          height: 110,
          border: `2px solid ${GOLD}`,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${GOLD}15`,
          position: 'relative',
        }}>
          <span style={{
            fontSize: 52,
            fontWeight: 700,
            color: GOLD,
            fontFamily: 'Georgia, serif',
            letterSpacing: -2,
          }}>G</span>
          <div style={{
            position: 'absolute',
            bottom: -6,
            right: -6,
            width: 12,
            height: 12,
            background: GOLD,
            borderRadius: 2,
          }} />
        </div>
      </div>

      {/* Company name */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textAlign: 'center',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 58,
          fontWeight: 300,
          color: WHITE,
          fontFamily: 'Georgia, serif',
          letterSpacing: 8,
          textTransform: 'uppercase',
        }}>
          GWARD
        </h1>
        <h2 style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 400,
          color: GOLD,
          fontFamily: 'Georgia, serif',
          letterSpacing: 14,
          textTransform: 'uppercase',
          marginTop: 4,
        }}>
          CONCIERGERIE
        </h2>
      </div>

      {/* Gold separator line */}
      <div style={{
        width: lineWidth,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginTop: 24,
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
        fontFamily: 'Arial, sans-serif',
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
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      }}>
        gward-conciergerie.fr
      </p>
    </AbsoluteFill>
  );
};
