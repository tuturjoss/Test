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

const ZONES = [
  'Vannes & Centre-ville',
  'Golfe du Morbihan',
  "Presqu'île de Rhuys",
  'Île aux Moines',
  'Baden & Arradon',
];

// Stylized SVG map of Golfe du Morbihan
const MorbihanMap: React.FC<{ frame: number }> = ({ frame }) => {
  const pin1 = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pin2 = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pin3 = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <svg viewBox="0 0 420 380" width="420" height="380" style={{ display: 'block' }}>
      {/* Background sea */}
      <rect width="420" height="380" fill="#1A2748" rx="12" />

      {/* Land - main coastline simplified */}
      <path
        d="M 0 80 L 60 70 L 90 50 L 130 40 L 170 55 L 200 45 L 240 55 L 280 48 L 320 60 L 360 55 L 420 65 L 420 0 L 0 0 Z"
        fill="#243260"
      />
      {/* Land - south shore */}
      <path
        d="M 0 380 L 0 280 L 30 270 L 70 285 L 100 265 L 130 275 L 160 260 L 200 270 L 230 260 L 260 270 L 290 255 L 330 265 L 370 255 L 420 265 L 420 380 Z"
        fill="#243260"
      />
      {/* Gulf water area */}
      <ellipse cx="210" cy="190" rx="140" ry="110" fill="#1E3A7A" opacity="0.7" />

      {/* Gulf coastline detail */}
      <path
        d="M 90 150 Q 120 120 160 130 Q 195 115 230 125 Q 270 120 305 145 Q 330 165 335 195 Q 330 230 305 250 Q 270 270 235 265 Q 200 275 170 265 Q 135 255 110 235 Q 80 210 90 150 Z"
        fill="#192D5E"
        stroke="#2A4490"
        strokeWidth="1.5"
      />

      {/* Islands in the gulf */}
      <ellipse cx="200" cy="195" rx="18" ry="12" fill="#243260" />
      <ellipse cx="245" cy="220" rx="12" ry="8" fill="#243260" />
      <ellipse cx="175" cy="215" rx="10" ry="7" fill="#243260" />

      {/* Gulf opening (west) */}
      <path
        d="M 75 175 Q 82 195 75 215"
        stroke="#1E3A7A"
        strokeWidth="8"
        fill="none"
      />

      {/* Roads / grid lines subtle */}
      <line x1="200" y1="60" x2="200" y2="140" stroke="#2A3870" strokeWidth="1" opacity="0.5" />
      <line x1="200" y1="140" x2="200" y2="125" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />

      {/* Pin: Vannes */}
      <g opacity={pin1} transform="translate(200, 125)">
        <circle cx="0" cy="0" r="10" fill={GOLD} opacity="0.2" />
        <circle cx="0" cy="0" r="6" fill={GOLD} />
        <circle cx="0" cy="0" r="18" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
        <text x="14" y="4" fill={WHITE} fontSize="11" fontFamily="Arial" fontWeight="600">Vannes</text>
      </g>

      {/* Pin: Île aux Moines */}
      <g opacity={pin2} transform="translate(200, 195)">
        <circle cx="0" cy="0" r="5" fill={GOLD} opacity="0.8" />
        <text x="10" y="4" fill={GRAY_LIGHT} fontSize="9" fontFamily="Arial">Île aux Moines</text>
      </g>

      {/* Pin: Presqu'île de Rhuys */}
      <g opacity={pin3} transform="translate(280, 255)">
        <circle cx="0" cy="0" r="5" fill={GOLD} opacity="0.8" />
        <text x="8" y="-5" fill={GRAY_LIGHT} fontSize="9" fontFamily="Arial">Rhuys</text>
      </g>

      {/* Label */}
      <text x="210" y="360" textAnchor="middle" fill={GOLD} fontSize="10" fontFamily="Arial" letterSpacing="3" opacity="0.8">
        GOLFE DU MORBIHAN
      </text>

      {/* North indicator */}
      <g transform="translate(390, 30)">
        <text x="0" y="0" textAnchor="middle" fill={GOLD} fontSize="10" fontFamily="Arial" opacity="0.6">N</text>
        <line x1="0" y1="4" x2="0" y2="14" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      </g>

      {/* Border */}
      <rect width="420" height="380" fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.35" rx="12" />
    </svg>
  );
};

export const Domain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleX = interpolate(frame, [0, 25], [-40, 0], { extrapolateRight: 'clamp' });

  const lineW = interpolate(frame, [15, 45], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const mapScale = spring({ frame, fps, config: { damping: 22, stiffness: 80 }, delay: 20 });
  const mapOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [100, 120], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1E2A55 0%, ${BG} 100%)`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 120px',
        gap: 100,
        opacity: fadeOut,
      }}
    >
      {/* Left: Text content */}
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: GOLD,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
          opacity: titleOpacity,
        }}>Notre présence</p>

        <h2 style={{
          margin: '12px 0 0',
          fontSize: 48,
          fontWeight: 400,
          color: WHITE,
          fontFamily: FONT_TITLE,
          letterSpacing: 1,
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
        }}>
          Zone <em style={{ color: GOLD, fontStyle: 'italic' }}>d'Intervention</em>
        </h2>

        <div style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, ${GOLD}, transparent)`,
          margin: '20px 0',
        }} />

        <p style={{
          margin: '0 0 30px',
          fontSize: 16,
          color: GRAY,
          fontFamily: FONT_BODY,
          lineHeight: 1.7,
          opacity: titleOpacity,
        }}>
          Nous gérons votre bien à Vannes<br />
          et dans tout le Golfe du Morbihan,<br />
          l'une des plus belles destinations de Bretagne.
        </p>

        {/* Zones list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ZONES.map((zone, i) => {
            const zoneOpacity = interpolate(frame, [40 + i * 12, 55 + i * 12], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const zoneX = interpolate(frame, [40 + i * 12, 60 + i * 12], [-20, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: zoneOpacity,
                transform: `translateX(${zoneX}px)`,
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: GOLD,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 15,
                  color: GRAY_LIGHT,
                  fontFamily: FONT_BODY,
                }}>{zone}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: SVG Map */}
      <div style={{
        opacity: mapOpacity,
        transform: `scale(${mapScale})`,
        flexShrink: 0,
        boxShadow: `0 0 40px ${GOLD}22`,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <MorbihanMap frame={frame} />
      </div>
    </AbsoluteFill>
  );
};
