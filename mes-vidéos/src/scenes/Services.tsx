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

// Inline SVG icons (24×24 viewBox, stroke-based)
const icons: Record<string, React.ReactNode> = {
  annonces: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="10" r="4" />
      <path d="M12 10 L21 10 M18 10 L18 13 M21 10 L21 13" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L13.8 8.2 L20 10 L13.8 11.8 L12 18 L10.2 11.8 L4 10 L10.2 8.2 Z" />
      <path d="M5 3 L5.6 5 M19 3 L18.4 5 M5 21 L5.6 19 M19 21 L18.4 19" />
    </svg>
  ),
  bed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20 L2 8 A4 4 0 0 1 6 4 L18 4 A4 4 0 0 1 22 8 L22 20" />
      <path d="M2 14 L22 14" />
      <rect x="6" y="9" width="4" height="5" rx="1" />
      <rect x="14" y="9" width="4" height="5" rx="1" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

const SERVICES = [
  { iconKey: 'annonces', label: 'Gestion des annonces', desc: 'Airbnb, Booking, VRBO' },
  { iconKey: 'key',      label: 'Accueil voyageurs',    desc: 'Check-in & check-out' },
  { iconKey: 'sparkle',  label: 'Ménage professionnel', desc: 'Nettoyage hôtelier 5★' },
  { iconKey: 'bed',      label: 'Linge hôtelier',       desc: 'Draps & serviettes premium' },
  { iconKey: 'wrench',   label: 'Maintenance',          desc: 'Interventions rapides' },
  { iconKey: 'chart',    label: 'Optimisation revenus', desc: 'Tarification dynamique' },
];

const ServiceCard: React.FC<{
  service: (typeof SERVICES)[0];
  index: number;
  startFrame: number;
}> = ({ service, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = startFrame + index * 22;

  const scale = spring({ frame, fps, config: { damping: 22, stiffness: 80 }, delay });
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity,
      transform: `scale(${scale})`,
      background: BG_CARD,
      border: `1px solid ${GOLD}33`,
      borderRadius: 10,
      padding: '28px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
    }}>
      {/* Top orange accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${GOLD}, transparent)`,
      }} />

      {/* Icon */}
      <div style={{ color: GOLD, width: 36, height: 36 }}>
        {icons[service.iconKey]}
      </div>

      <div style={{
        fontSize: 15,
        fontWeight: 600,
        color: WHITE,
        fontFamily: FONT_TITLE,
        lineHeight: 1.3,
      }}>{service.label}</div>

      <div style={{
        fontSize: 12,
        color: GRAY,
        fontFamily: FONT_BODY,
        lineHeight: 1.4,
      }}>{service.desc}</div>
    </div>
  );
};

export const Services: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 35], [25, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [20, 55], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [300, 330], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: GOLD,
          letterSpacing: 6,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
          opacity: titleOpacity,
        }}>
          Nos prestations
        </p>
        <h2 style={{
          margin: '12px 0 0',
          fontSize: 50,
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
          margin: '20px auto 0',
        }} />
      </div>

      {/* Services — 6 cards in one row */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 18,
        width: '100%',
        maxWidth: 1700,
      }}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} startFrame={40} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
