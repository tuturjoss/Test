import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, GOLD_LIGHT, WHITE, GRAY } from '../constants';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const lineW = interpolate(frame, [15, 50], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word1Opacity = interpolate(frame, [30, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word1Y = interpolate(frame, [30, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word2Opacity = interpolate(frame, [45, 63], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word2Y = interpolate(frame, [45, 65], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word3Opacity = interpolate(frame, [60, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word3Y = interpolate(frame, [60, 80], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const btnScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, delay: 85 });
  const btnOpacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const logoOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1c1508 0%, #050505 70%)`,
        opacity: bgOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}
    >
      {/* Decorative rings */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        border: `1px solid ${GOLD}18`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        border: `1px solid ${GOLD}12`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Top separator */}
      <div style={{
        width: lineW,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 48,
      }} />

      {/* Main tagline — word by word */}
      <div style={{
        display: 'flex',
        gap: 28,
        alignItems: 'baseline',
        marginBottom: 16,
      }}>
        <span style={{
          opacity: word1Opacity,
          transform: `translateY(${word1Y}px)`,
          fontSize: 72,
          fontWeight: 300,
          color: WHITE,
          fontFamily: 'Georgia, serif',
          letterSpacing: 2,
        }}>Louez</span>

        <span style={{
          opacity: word2Opacity,
          transform: `translateY(${word2Y}px)`,
          fontSize: 72,
          fontWeight: 700,
          color: GOLD,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          letterSpacing: 2,
        }}>mieux,</span>
      </div>

      <div style={{
        display: 'flex',
        gap: 28,
        alignItems: 'baseline',
        marginBottom: 48,
      }}>
        <span style={{
          opacity: word1Opacity,
          transform: `translateY(${word1Y}px)`,
          fontSize: 72,
          fontWeight: 300,
          color: WHITE,
          fontFamily: 'Georgia, serif',
          letterSpacing: 2,
        }}>louez</span>

        <span style={{
          opacity: word3Opacity,
          transform: `translateY(${word3Y}px)`,
          fontSize: 72,
          fontWeight: 700,
          color: GOLD,
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          letterSpacing: 2,
        }}>plus.</span>
      </div>

      {/* Bottom separator */}
      <div style={{
        width: lineW,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 40,
      }} />

      {/* Subtitle */}
      <p style={{
        opacity: subOpacity,
        margin: 0,
        fontSize: 18,
        color: GRAY,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 36,
      }}>
        Confiez-nous votre bien dès aujourd'hui
      </p>

      {/* CTA button style */}
      <div style={{
        opacity: btnOpacity,
        transform: `scale(${btnScale})`,
        border: `1px solid ${GOLD}`,
        padding: '16px 48px',
        borderRadius: 4,
        color: GOLD,
        fontSize: 16,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 3,
        textTransform: 'uppercase',
        background: `${GOLD}15`,
      }}>
        gward-conciergerie.fr
      </div>

      {/* Logo */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: logoOpacity,
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: `1px solid ${GOLD}`,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${GOLD}15`,
        }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: GOLD, fontFamily: 'Georgia, serif' }}>G</span>
        </div>
        <div>
          <div style={{ fontSize: 13, color: WHITE, fontFamily: 'Georgia, serif', letterSpacing: 3 }}>GWARD</div>
          <div style={{ fontSize: 9, color: GOLD, fontFamily: 'Arial, sans-serif', letterSpacing: 4 }}>CONCIERGERIE</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
