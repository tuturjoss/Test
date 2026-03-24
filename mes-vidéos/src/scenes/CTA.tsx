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
        background: `radial-gradient(ellipse at center, #232D5A 0%, ${BG} 70%)`,
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
          fontFamily: FONT_TITLE,
          letterSpacing: 2,
        }}>Louez</span>

        <span style={{
          opacity: word2Opacity,
          transform: `translateY(${word2Y}px)`,
          fontSize: 72,
          fontWeight: 700,
          color: GOLD,
          fontFamily: FONT_TITLE,
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
          fontFamily: FONT_TITLE,
          letterSpacing: 2,
        }}>louez</span>

        <span style={{
          opacity: word3Opacity,
          transform: `translateY(${word3Y}px)`,
          fontSize: 72,
          fontWeight: 700,
          color: GOLD,
          fontFamily: FONT_TITLE,
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
        fontFamily: FONT_BODY,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 36,
      }}>
        Confiez-nous votre bien dès aujourd'hui
      </p>

      {/* CTA button */}
      <div style={{
        opacity: btnOpacity,
        transform: `scale(${btnScale})`,
        border: `1px solid ${GOLD}`,
        padding: '16px 48px',
        borderRadius: 4,
        color: GOLD,
        fontSize: 16,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
        textTransform: 'uppercase',
        background: `${GOLD}15`,
      }}>
        gward-conciergerie.fr
      </div>

      {/* Logo */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: logoOpacity,
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 8,
          overflow: 'hidden',
          background: WHITE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Img
            src={staticFile('image.png')}
            style={{ width: '90%', height: '90%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
