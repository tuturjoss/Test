import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, BG_CARD, GOLD, WHITE, GRAY, GRAY_LIGHT } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const REVIEWS = [
  {
    text: '"Depuis que Gward gère mon appartement à Vannes, mes revenus ont augmenté de 40%. Un service irréprochable, une équipe ultra-réactive."',
    author: 'Marie-Claire D.',
    location: 'Vannes, Morbihan',
    stars: 5,
  },
  {
    text: '"Professionnalisme, rigueur et disponibilité 24h/24. Je recommande Gward Conciergerie à tous les propriétaires du Golfe du Morbihan."',
    author: 'Thomas R.',
    location: 'Arradon, Morbihan',
    stars: 5,
  },
  {
    text: '"La meilleure décision pour mon bien sur l\'Île aux Moines. Gestion complète, voyageurs ravis, et moi je profite sans stress."',
    author: 'Sophie M.',
    location: 'Île aux Moines',
    stars: 5,
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: 'flex', gap: 5, marginBottom: 18 }}>
    {[...Array(count)].map((_, i) => (
      <span key={i} style={{ color: GOLD, fontSize: 20 }}>★</span>
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: (typeof REVIEWS)[0]; index: number }> = ({ review, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 1 * fps + index * 0.5 * fps;
  const cardSpring = spring({ frame, fps, config: { damping: 200 }, delay, durationInFrames: 1.5 * fps });
  const opacity = interpolate(frame - delay, [0, 0.6 * fps], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity,
      transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])})`,
      background: BG_CARD,
      border: `1px solid ${GOLD}28`,
      borderRadius: 12,
      padding: '36px 32px',
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Quote mark */}
      <div style={{
        position: 'absolute', top: 18, right: 24,
        fontSize: 72, color: `${GOLD}18`, fontFamily: FONT_TITLE, lineHeight: 1,
      }}>"</div>

      <Stars count={review.stars} />

      <p style={{
        margin: '0 0 24px', fontSize: 15, color: GRAY_LIGHT,
        fontFamily: FONT_BODY, lineHeight: 1.9, fontStyle: 'italic', flex: 1,
      }}>
        {review.text}
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        borderTop: `1px solid ${GOLD}20`, paddingTop: 20,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `${GOLD}28`, border: `1px solid ${GOLD}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: GOLD, fontFamily: FONT_TITLE, fontWeight: 700,
        }}>
          {review.author[0]}
        </div>
        <div>
          <div style={{ fontSize: 15, color: WHITE, fontFamily: FONT_BODY, fontWeight: 600 }}>
            {review.author}
          </div>
          <div style={{ fontSize: 12, color: GRAY, fontFamily: FONT_BODY, marginTop: 2 }}>
            {review.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 1 * fps], [25, 0], {
    easing: Easing.out(Easing.quad), extrapolateRight: 'clamp',
  });
  const lineW = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 200], {
    easing: Easing.inOut(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ratingOpacity = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 1], {
    easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 90px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{
          margin: 0, fontSize: 13, color: GOLD, letterSpacing: 6,
          textTransform: 'uppercase', fontFamily: FONT_BODY, opacity: titleOpacity,
        }}>Ils nous font confiance</p>
        <h2 style={{
          margin: '14px 0 0', fontSize: 52, fontWeight: 400, color: WHITE,
          fontFamily: FONT_TITLE, opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        }}>
          Avis <em style={{ color: GOLD, fontStyle: 'italic' }}>Clients</em>
        </h2>
        <div style={{
          width: lineW, height: 1, margin: '20px auto 0',
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, opacity: ratingOpacity }}>
          {[...Array(5)].map((_, i) => <span key={i} style={{ color: GOLD, fontSize: 22 }}>★</span>)}
          <span style={{ color: GRAY, fontSize: 14, fontFamily: FONT_BODY, marginLeft: 8 }}>
            5.0 · Note moyenne
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 28, width: '100%', maxWidth: 1600 }}>
        {REVIEWS.map((review, i) => <ReviewCard key={i} review={review} index={i} />)}
      </div>
    </AbsoluteFill>
  );
};
