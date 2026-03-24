import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, GOLD, WHITE, GRAY, GRAY_LIGHT } from '../constants';

const ZONES = [
  'Paris & Île-de-France',
  'Côte d\'Azur',
  'Alpes & Montagne',
  'Bretagne & Normandie',
  'Bordeaux & Aquitaine',
];

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
        background: `linear-gradient(135deg, #0f0f0f 0%, #0d0a05 100%)`,
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
          fontFamily: 'Arial, sans-serif',
          opacity: titleOpacity,
        }}>Notre présence</p>

        <h2 style={{
          margin: '12px 0 0',
          fontSize: 48,
          fontWeight: 300,
          color: WHITE,
          fontFamily: 'Georgia, serif',
          letterSpacing: 1,
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
        }}>
          Notre <em style={{ color: GOLD, fontStyle: 'italic' }}>Domaine</em><br />
          d'Intervention
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
          fontFamily: 'Arial, sans-serif',
          lineHeight: 1.7,
          opacity: titleOpacity,
        }}>
          Nous intervenons dans les destinations<br />
          les plus prisées de France, partout où<br />
          votre bien mérite une gestion d'excellence.
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
                  fontFamily: 'Arial, sans-serif',
                }}>{zone}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Visual map placeholder */}
      <div style={{
        opacity: mapOpacity,
        transform: `scale(${mapScale})`,
        width: 380,
        height: 420,
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* France silhouette abstract representation */}
        <div style={{
          width: '100%',
          height: '100%',
          border: `1px solid ${GOLD}44`,
          borderRadius: 12,
          background: `${GOLD}08`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: 0, right: 0,
              height: 1,
              background: `${GOLD}15`,
            }} />
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${20 + i * 15}%`,
              top: 0, bottom: 0,
              width: 1,
              background: `${GOLD}15`,
            }} />
          ))}

          {/* Pin points */}
          {[
            { top: '18%', left: '52%' },
            { top: '72%', left: '68%' },
            { top: '82%', left: '38%' },
            { top: '32%', left: '20%' },
            { top: '22%', left: '32%' },
          ].map((pos, i) => {
            const pinOpacity = interpolate(frame, [50 + i * 10, 65 + i * 10], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div key={i} style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                opacity: pinOpacity,
                transform: 'translate(-50%, -50%)',
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: GOLD,
                  boxShadow: `0 0 12px ${GOLD}88`,
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: `1px solid ${GOLD}55`,
                  animation: 'none',
                }} />
              </div>
            );
          })}

          <div style={{
            fontSize: 64,
            opacity: 0.15,
          }}>🗺️</div>

          {/* Label */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 0, right: 0,
            textAlign: 'center',
            fontSize: 12,
            color: GOLD,
            letterSpacing: 3,
            fontFamily: 'Arial, sans-serif',
          }}>FRANCE</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
