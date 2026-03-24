import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, BG_CARD, GOLD, WHITE, GRAY } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const SERVICES = [
  { icon: '📋', label: 'Gestion des annonces', desc: 'Airbnb, Booking, VRBO' },
  { icon: '🔑', label: 'Accueil voyageurs', desc: 'Check-in & check-out' },
  { icon: '✨', label: 'Ménage professionnel', desc: 'Nettoyage hôtelier 5★' },
  { icon: '🛏️', label: 'Linge hôtelier', desc: 'Draps & serviettes premium' },
  { icon: '🔧', label: 'Maintenance', desc: 'Suivi & interventions rapides' },
  { icon: '📈', label: 'Optimisation revenus', desc: 'Tarification dynamique' },
];

const ServiceCard: React.FC<{
  service: (typeof SERVICES)[0];
  index: number;
  startFrame: number;
}> = ({ service, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = startFrame + index * 18;

  const scale = spring({ frame, fps, config: { damping: 20, stiffness: 100 }, delay });
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity,
      transform: `scale(${scale})`,
      background: BG_CARD,
      border: `1px solid ${GOLD}33`,
      borderRadius: 8,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top orange accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${GOLD}, transparent)`,
      }} />
      <span style={{ fontSize: 32 }}>{service.icon}</span>
      <div style={{
        fontSize: 16,
        fontWeight: 600,
        color: WHITE,
        fontFamily: FONT_TITLE,
        lineHeight: 1.3,
      }}>{service.label}</div>
      <div style={{
        fontSize: 13,
        color: GRAY,
        fontFamily: FONT_BODY,
      }}>{service.desc}</div>
    </div>
  );
};

export const Services: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [20, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [15, 40], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [180, 200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 80px',
        opacity: fadeOut,
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: GOLD,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
          opacity: titleOpacity,
        }}>
          Nos prestations
        </p>
        <h2 style={{
          margin: '10px 0 0',
          fontSize: 44,
          fontWeight: 400,
          color: WHITE,
          fontFamily: FONT_TITLE,
          letterSpacing: 2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          Nos <em style={{ color: GOLD, fontStyle: 'italic' }}>Services</em>
        </h2>
        <div style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          margin: '16px auto 0',
        }} />
      </div>

      {/* Services grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        width: '100%',
        maxWidth: 1400,
      }}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} startFrame={30} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
