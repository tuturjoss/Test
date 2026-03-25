import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY, GRAY_LIGHT } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

// Stylized SVG map of Golfe du Morbihan — standalone, larger
const MorbihanMap: React.FC<{ frame: number }> = ({ frame }) => {
  const pin1 = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pin2 = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pin3 = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pin4 = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  return (
    <svg viewBox="0 0 780 560" width="780" height="560" style={{ display: 'block' }}>
      {/* Background sea */}
      <rect width="780" height="560" fill="#16244A" rx="16" />

      {/* Subtle grid */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 80} x2="780" y2={i * 80} stroke="#ffffff08" strokeWidth="1" />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line key={`v${i}`} x1={i * 78} y1="0" x2={i * 78} y2="560" stroke="#ffffff08" strokeWidth="1" />
      ))}

      {/* Northern land (top) */}
      <path d="M 0 90 Q 80 70 160 80 Q 220 65 280 75 Q 340 60 400 72 Q 460 58 520 68 Q 580 55 640 70 Q 700 60 780 75 L 780 0 L 0 0 Z" fill="#1F3060" />

      {/* Southern land */}
      <path d="M 0 560 L 0 420 Q 60 410 120 425 Q 170 415 220 430 Q 270 415 330 425 Q 390 410 450 430 Q 510 415 570 428 Q 630 413 700 428 Q 740 420 780 430 L 780 560 Z" fill="#1F3060" />

      {/* Gulf of Morbihan — the inland sea */}
      <ellipse cx="390" cy="295" rx="240" ry="165" fill="#1A3575" />

      {/* Gulf coastline (detailed inner shore) */}
      <path
        d="M 175 230 Q 210 195 265 205 Q 310 190 360 198 Q 415 185 465 200 Q 510 188 555 210 Q 590 230 600 265 Q 610 300 595 335 Q 575 370 540 385 Q 500 400 455 395 Q 410 405 365 398 Q 315 408 270 395 Q 225 380 200 350 Q 175 315 175 280 Z"
        fill="#142D68"
        stroke="#2A4898"
        strokeWidth="2"
      />

      {/* Île aux Moines */}
      <ellipse cx="370" cy="300" rx="28" ry="18" fill="#1F3060" />
      {/* Île d'Arz */}
      <ellipse cx="440" cy="330" rx="22" ry="13" fill="#1F3060" />
      {/* Smaller islands */}
      <ellipse cx="310" cy="320" rx="14" ry="9" fill="#1F3060" />
      <ellipse cx="480" cy="270" rx="12" ry="8" fill="#1F3060" />

      {/* Gulf opening (west passage) */}
      <rect x="140" y="260" width="38" height="70" fill="#16244A" />

      {/* Road from Vannes south */}
      <line x1="390" y1="120" x2="390" y2="200" stroke="#2A4090" strokeWidth="3" opacity="0.5" />

      {/* ---- Animated pins ---- */}

      {/* Pin: Vannes (north shore) */}
      <g opacity={pin1}>
        <circle cx="390" cy="175" r={20 * pulse} fill={GOLD} opacity="0.18" />
        <circle cx="390" cy="175" r="9" fill={GOLD} />
        <circle cx="390" cy="175" r="4" fill="#fff" />
        {/* Label */}
        <rect x="404" y="162" width="72" height="24" rx="4" fill={GOLD} opacity="0.9" />
        <text x="440" y="178" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Arial" fontWeight="700">Vannes</text>
      </g>

      {/* Pin: Île aux Moines */}
      <g opacity={pin2}>
        <circle cx="370" cy="300" r="6" fill={GOLD} opacity="0.9" />
        <circle cx="370" cy="300" r="2.5" fill="#fff" />
        <text x="385" y="304" fill={GRAY_LIGHT} fontSize="11" fontFamily="Arial">Île aux Moines</text>
      </g>

      {/* Pin: Presqu'île de Rhuys */}
      <g opacity={pin3}>
        <circle cx="480" cy="398" r="6" fill={GOLD} opacity="0.9" />
        <circle cx="480" cy="398" r="2.5" fill="#fff" />
        <text x="495" y="402" fill={GRAY_LIGHT} fontSize="11" fontFamily="Arial">Presqu'île de Rhuys</text>
      </g>

      {/* Pin: Baden / Arradon (west shore) */}
      <g opacity={pin4}>
        <circle cx="230" cy="265" r="6" fill={GOLD} opacity="0.9" />
        <circle cx="230" cy="265" r="2.5" fill="#fff" />
        <text x="245" y="269" fill={GRAY_LIGHT} fontSize="11" fontFamily="Arial">Baden · Arradon</text>
      </g>

      {/* Label overlay */}
      <text x="390" y="538" textAnchor="middle" fill={GOLD} fontSize="13" fontFamily="Arial" letterSpacing="4" opacity="0.7">
        GOLFE DU MORBIHAN · BRETAGNE
      </text>

      {/* North arrow */}
      <g transform="translate(740, 40)">
        <circle cx="0" cy="0" r="16" fill="#ffffff10" stroke={GOLD} strokeWidth="0.8" opacity="0.6" />
        <text x="0" y="5" textAnchor="middle" fill={GOLD} fontSize="12" fontFamily="Arial" fontWeight="700" opacity="0.8">N</text>
      </g>

      {/* Border */}
      <rect width="780" height="560" fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.3" rx="16" />
    </svg>
  );
};

export const Domain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 35], [20, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [20, 55], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const mapScale = spring({ frame, fps, config: { damping: 24, stiffness: 70 }, delay: 25 });
  const mapOpacity = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [155, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #1E2A55 0%, ${BG} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 80px',
        gap: 40,
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: GOLD,
          letterSpacing: 6,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
        }}>Zone d'intervention</p>
        <h2 style={{
          margin: '10px 0 4px',
          fontSize: 52,
          fontWeight: 400,
          color: WHITE,
          fontFamily: FONT_TITLE,
        }}>
          Vannes &amp; <em style={{ color: GOLD, fontStyle: 'italic' }}>Golfe du Morbihan</em>
        </h2>
        <div style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          margin: '16px auto 0',
        }} />
      </div>

      {/* Map — centered, large */}
      <div style={{
        opacity: mapOpacity,
        transform: `scale(${mapScale})`,
        boxShadow: `0 0 60px ${GOLD}22`,
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        <MorbihanMap frame={frame} />
      </div>
    </AbsoluteFill>
  );
};
