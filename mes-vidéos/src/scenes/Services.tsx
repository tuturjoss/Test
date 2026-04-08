import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, BG_CARD, GOLD, WHITE, GRAY } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

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
      <path d="M12 10 L21 10" />
      <path d="M18 8 L18 12" />
      <path d="M21 8 L21 12" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L14 8.5 L21 9 L16 13.5 L17.5 21 L12 17 L6.5 21 L8 13.5 L3 9 L10 8.5 Z" />
    </svg>
  ),
  bed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20 L2 9 Q6 5 12 5 Q18 5 22 9 L22 20" />
      <path d="M2 15 L22 15" />
      <rect x="6" y="10" width="5" height="5" rx="1" />
      <rect x="13" y="10" width="5" height="5" rx="1" />
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
  { iconKey: 'annonces', label: 'Gestion des annonces',  desc: 'Airbnb, Booking, VRBO' },
  { iconKey: 'key',      label: 'Accueil voyageurs',     desc: 'Check-in & check-out personnalisé' },
  { iconKey: 'sparkle',  label: 'Ménage professionnel',  desc: 'Nettoyage hôtelier 5 étoiles' },
  { iconKey: 'bed',      label: 'Linge hôtelier',        desc: 'Draps & serviettes premium' },
  { iconKey: 'wrench',   label: 'Maintenance',           desc: 'Suivi & interventions rapides' },
  { iconKey: 'chart',    label: 'Optimisation revenus',  desc: 'Tarification dynamique' },
];

const ServiceCard: React.FC<{
  service: (typeof SERVICES)[0];
  index: number;
}> = ({ service, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered spring entrance — snappy config per skill
  const delay = 1.2 * fps + index * 0.15 * fps;
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 }, // snappy, minimal bounce
    delay,
    durationInFrames: 1.2 * fps,
  });
  const opacity = interpolate(frame - delay, [0, 0.5 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity,
      transform: `scale(${cardSpring})`,
      background: BG_CARD,
      border: `1px solid ${GOLD}30`,
      borderRadius: 12,
      padding: '36px 28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${GOLD}, transparent)`,
      }} />
      <div style={{ color: GOLD, width: 40, height: 40 }}>
        {icons[service.iconKey]}
      </div>
      <div style={{
        fontSize: 17,
        fontWeight: 600,
        color: WHITE,
        fontFamily: FONT_TITLE,
        lineHeight: 1.3,
      }}>{service.label}</div>
      <div style={{
        fontSize: 13,
        color: GRAY,
        fontFamily: FONT_BODY,
        lineHeight: 1.5,
      }}>{service.desc}</div>
    </div>
  );
};

export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 1 * fps], [30, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: 'clamp',
  });
  const lineW = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 220], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 100px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 70, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={{
          margin: 0, fontSize: 13, color: GOLD, letterSpacing: 6,
          textTransform: 'uppercase', fontFamily: FONT_BODY,
        }}>Nos prestations</p>
        <h2 style={{
          margin: '14px 0 0', fontSize: 52, fontWeight: 400,
          color: WHITE, fontFamily: FONT_TITLE,
        }}>
          Nos <em style={{ color: GOLD, fontStyle: 'italic' }}>Services</em>
        </h2>
        <div style={{
          width: lineW, height: 1, margin: '20px auto 0',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />
      </div>

      {/* Two rows of 3 services */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%', maxWidth: 1600 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          {SERVICES.slice(0, 3).map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          {SERVICES.slice(3).map((s, i) => <ServiceCard key={i} service={s} index={i + 3} />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
