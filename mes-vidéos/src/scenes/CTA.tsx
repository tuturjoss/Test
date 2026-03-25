import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';
import { Logo } from '../components/Logo';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  const lineW = interpolate(frame, [20, 65], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word1Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word1Y = interpolate(frame, [40, 70], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word2Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word2Y = interpolate(frame, [60, 90], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const word3Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word3Y = interpolate(frame, [80, 110], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const btnScale = spring({ frame, fps, config: { damping: 20, stiffness: 70 }, delay: 125 });
  const btnOpacity = interpolate(frame, [125, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const logoOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        width: 800,
        height: 800,
        borderRadius: '50%',
        border: `1px solid ${GOLD}14`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        position: 'absolute',
        width: 560,
        height: 560,
        borderRadius: '50%',
        border: `1px solid ${GOLD}0E`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Top separator */}
      <div style={{
        width: lineW,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 56,
      }} />

      {/* Main tagline */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'baseline', marginBottom: 16 }}>
        <span style={{
          opacity: word1Opacity, transform: `translateY(${word1Y}px)`,
          fontSize: 80, fontWeight: 300, color: WHITE, fontFamily: FONT_TITLE, letterSpacing: 2,
        }}>Louez</span>
        <span style={{
          opacity: word2Opacity, transform: `translateY(${word2Y}px)`,
          fontSize: 80, fontWeight: 700, color: GOLD, fontFamily: FONT_TITLE, fontStyle: 'italic', letterSpacing: 2,
        }}>mieux,</span>
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'baseline', marginBottom: 56 }}>
        <span style={{
          opacity: word1Opacity, transform: `translateY(${word1Y}px)`,
          fontSize: 80, fontWeight: 300, color: WHITE, fontFamily: FONT_TITLE, letterSpacing: 2,
        }}>louez</span>
        <span style={{
          opacity: word3Opacity, transform: `translateY(${word3Y}px)`,
          fontSize: 80, fontWeight: 700, color: GOLD, fontFamily: FONT_TITLE, fontStyle: 'italic', letterSpacing: 2,
        }}>plus.</span>
      </div>

      {/* Bottom separator */}
      <div style={{
        width: lineW,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        marginBottom: 44,
      }} />

      {/* Subtitle */}
      <p style={{
        opacity: subOpacity,
        margin: 0,
        fontSize: 19,
        color: GRAY,
        fontFamily: FONT_BODY,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 40,
      }}>
        Confiez-nous votre bien dès aujourd'hui
      </p>

      {/* CTA button */}
      <div style={{
        opacity: btnOpacity,
        transform: `scale(${btnScale})`,
        border: `1px solid ${GOLD}`,
        padding: '18px 56px',
        borderRadius: 4,
        color: GOLD,
        fontSize: 17,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
        textTransform: 'uppercase',
        background: `${GOLD}18`,
      }}>
        gward-conciergerie.fr
      </div>

      {/* Logo SVG at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        opacity: logoOpacity,
      }}>
        <Logo size={200} />
      </div>
    </AbsoluteFill>
  );
};
