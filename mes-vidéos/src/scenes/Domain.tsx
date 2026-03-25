import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY, GRAY_LIGHT } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const PINS = [
  { cx: 390, cy: 170, label: 'Vannes', main: true },
  { cx: 368, cy: 300, label: 'Île aux Moines', main: false },
  { cx: 440, cy: 330, label: 'Île d\'Arz', main: false },
  { cx: 225, cy: 262, label: 'Arradon', main: false },
  { cx: 300, cy: 260, label: 'Baden', main: false },
  { cx: 490, cy: 390, label: 'Rhuys', main: false },
];

const MorbihanMap: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const pulse = 0.85 + 0.15 * Math.sin(frame * 0.1);

  return (
    <svg viewBox="0 0 780 560" width="780" height="560" style={{ display: 'block' }}>
      {/* Sea background */}
      <defs>
        <radialGradient id="seaGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1A3575" />
          <stop offset="100%" stopColor="#12234F" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="780" height="560" fill="url(#seaGrad)" rx="16" />

      {/* Grid */}
      {[80, 160, 240, 320, 400, 480].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="780" y2={y} stroke="#ffffff06" strokeWidth="1" />
      ))}
      {[78, 156, 234, 312, 390, 468, 546, 624, 702].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="560" stroke="#ffffff06" strokeWidth="1" />
      ))}

      {/* Northern land */}
      <path d="M0,95 Q90,72 180,84 Q260,66 350,78 Q430,62 520,74 Q610,58 700,72 Q745,65 780,70 L780,0 L0,0 Z"
        fill="#1F3060" />

      {/* Southern coastline */}
      <path d="M0,560 L0,425 Q70,412 140,428 Q200,412 270,426 Q340,412 420,427 Q500,413 580,426 Q660,412 740,424 L780,418 L780,560 Z"
        fill="#1F3060" />

      {/* Gulf of Morbihan */}
      <ellipse cx="390" cy="298" rx="245" ry="162" fill="#1E3A7A" />

      {/* Gulf inner coastline */}
      <path
        d="M165,228 Q205,192 265,202 Q315,186 368,196 Q425,182 472,200 Q518,186 560,210 Q594,232 602,268 Q612,308 596,340 Q576,374 540,388 Q500,406 455,398 Q410,410 365,402 Q318,412 272,398 Q228,382 200,350 Q168,315 165,280 Z"
        fill="#152C65"
        stroke="#2B4A98"
        strokeWidth="1.5"
      />

      {/* Islands */}
      <ellipse cx="368" cy="300" rx="32" ry="20" fill="#1F3060" stroke="#2B4A98" strokeWidth="1" />
      <ellipse cx="440" cy="330" rx="25" ry="15" fill="#1F3060" stroke="#2B4A98" strokeWidth="1" />
      <ellipse cx="308" cy="318" rx="16" ry="10" fill="#1F3060" />
      <ellipse cx="480" cy="272" rx="14" ry="9" fill="#1F3060" />
      <ellipse cx="500" cy="310" rx="12" ry="8" fill="#1F3060" />

      {/* Gulf opening west */}
      <rect x="136" y="258" width="32" height="82" fill="#12234F" />

      {/* Animated pins */}
      {PINS.map((pin, i) => {
        const delay = (1.5 + i * 0.3) * fps;
        const pinOpacity = interpolate(frame, [delay, delay + 0.5 * fps], [0, 1], {
          easing: Easing.out(Easing.quad),
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const pinScale = spring({ frame, fps, config: { damping: 10 }, delay, durationInFrames: fps });

        return (
          <g key={i} opacity={pinOpacity}>
            {pin.main && (
              <circle cx={pin.cx} cy={pin.cy} r={26 * pulse} fill={GOLD} opacity="0.15" />
            )}
            <circle
              cx={pin.cx} cy={pin.cy}
              r={pin.main ? 10 * pinScale : 6 * pinScale}
              fill={GOLD}
              filter="url(#glow)"
            />
            <circle cx={pin.cx} cy={pin.cy} r={pin.main ? 4 : 2.5} fill="#fff" />
            {pin.main ? (
              <g>
                <rect x={pin.cx + 14} y={pin.cy - 14} width={78} height={26} rx="5" fill={GOLD} />
                <text x={pin.cx + 53} y={pin.cy + 4} textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Arial" fontWeight="700">
                  {pin.label}
                </text>
              </g>
            ) : (
              <text x={pin.cx + 10} y={pin.cy + 4} fill={GRAY_LIGHT} fontSize="11" fontFamily="Arial">
                {pin.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Bottom label */}
      <text x="390" y="540" textAnchor="middle" fill={GOLD} fontSize="12" fontFamily="Arial" letterSpacing="4" opacity="0.65">
        GOLFE DU MORBIHAN · BRETAGNE
      </text>

      {/* North */}
      <g transform="translate(742, 40)">
        <circle cx="0" cy="0" r="18" fill="#ffffff0C" stroke={GOLD} strokeWidth="0.8" opacity="0.7" />
        <text x="0" y="5" textAnchor="middle" fill={GOLD} fontSize="13" fontFamily="Arial" fontWeight="700" opacity="0.9">N</text>
      </g>

      <rect width="780" height="560" fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.28" rx="16" />
    </svg>
  );
};

export const Domain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 1 * fps], [25, 0], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const lineW = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 240], {
    easing: Easing.inOut(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const mapSpring = spring({ frame, fps, config: { damping: 200 }, delay: 0.8 * fps, durationInFrames: 1.8 * fps });
  const mapOpacity = interpolate(frame, [0.8 * fps, 1.6 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, #1E2A55 0%, ${BG} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 80px',
      gap: 40,
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{
          margin: 0, fontSize: 13, color: GOLD, letterSpacing: 6,
          textTransform: 'uppercase', fontFamily: FONT_BODY,
        }}>Zone d'intervention</p>
        <h2 style={{
          margin: '12px 0 4px', fontSize: 54, fontWeight: 400, color: WHITE, fontFamily: FONT_TITLE,
        }}>
          Vannes &amp; <em style={{ color: GOLD, fontStyle: 'italic' }}>Golfe du Morbihan</em>
        </h2>
        <div style={{
          width: lineW, height: 1, margin: '18px auto 0',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />
      </div>

      {/* Map */}
      <div style={{
        opacity: mapOpacity,
        transform: `scale(${mapSpring})`,
        boxShadow: `0 8px 80px ${GOLD}20`,
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        <MorbihanMap frame={frame} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};
