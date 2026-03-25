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
import { FONT_TITLE, FONT_BODY } from '../fonts';
import { Logo } from '../components/Logo';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineW = interpolate(frame, [0.3 * fps, 1.2 * fps], [0, 360], {
    easing: Easing.inOut(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Words appear one by one with spring
  const word = (delay: number) => ({
    opacity: interpolate(frame, [delay, delay + 0.5 * fps], [0, 1], {
      easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
    y: interpolate(frame - delay, [0, 0.7 * fps], [60, 0], {
      easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
  });

  const w1 = word(1 * fps);
  const w2 = word(1.5 * fps);
  const w3 = word(2.1 * fps);
  const w4 = word(2.7 * fps);

  const subOpacity = interpolate(frame, [3 * fps, 4 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const btnSpring = spring({ frame, fps, config: { damping: 20, stiffness: 200 }, delay: 3.8 * fps });
  const btnOpacity = interpolate(frame, [3.8 * fps, 4.5 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const logoOpacity = interpolate(frame, [4.5 * fps, 5.5 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Subtle ring pulse
  const ringPulse = 0.97 + 0.03 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 45%, #232D5A 0%, ${BG} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Rings */}
      {[800, 580].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size * ringPulse, height: size * ringPulse,
          borderRadius: '50%',
          border: `1px solid ${GOLD}${i === 0 ? '12' : '0C'}`,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />
      ))}

      {/* Top separator */}
      <div style={{
        width: lineW, height: 1, marginBottom: 56,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />

      {/* Tagline — word by word with spring */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'baseline', marginBottom: 14 }}>
        <span style={{ opacity: w1.opacity, transform: `translateY(${w1.y}px)`, fontSize: 84, fontWeight: 300, color: WHITE, fontFamily: FONT_TITLE }}>
          Louez
        </span>
        <span style={{ opacity: w2.opacity, transform: `translateY(${w2.y}px)`, fontSize: 84, fontWeight: 700, color: GOLD, fontFamily: FONT_TITLE, fontStyle: 'italic' }}>
          mieux,
        </span>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'baseline', marginBottom: 56 }}>
        <span style={{ opacity: w3.opacity, transform: `translateY(${w3.y}px)`, fontSize: 84, fontWeight: 300, color: WHITE, fontFamily: FONT_TITLE }}>
          louez
        </span>
        <span style={{ opacity: w4.opacity, transform: `translateY(${w4.y}px)`, fontSize: 84, fontWeight: 700, color: GOLD, fontFamily: FONT_TITLE, fontStyle: 'italic' }}>
          plus.
        </span>
      </div>

      {/* Bottom separator */}
      <div style={{
        width: lineW, height: 1, marginBottom: 44,
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      }} />

      {/* Subtitle */}
      <p style={{
        opacity: subOpacity,
        margin: '0 0 40px',
        fontSize: 20, color: GRAY, fontFamily: FONT_BODY,
        letterSpacing: 4, textTransform: 'uppercase',
      }}>
        Confiez-nous votre bien dès aujourd'hui
      </p>

      {/* CTA Button */}
      <div style={{
        opacity: btnOpacity,
        transform: `scale(${btnSpring})`,
        border: `1px solid ${GOLD}`,
        padding: '20px 60px',
        borderRadius: 4,
        color: GOLD,
        fontSize: 18,
        fontFamily: FONT_BODY,
        letterSpacing: 3,
        textTransform: 'uppercase',
        background: `${GOLD}18`,
      }}>
        gward-conciergerie.fr
      </div>

      {/* Logo at bottom */}
      <div style={{ position: 'absolute', bottom: 44, opacity: logoOpacity }}>
        <Logo size={240} />
      </div>
    </AbsoluteFill>
  );
};
