import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BG, BG_CARD, GOLD, WHITE, GRAY, GRAY_LIGHT } from '../constants';
import { FONT_TITLE, FONT_BODY } from '../fonts';

const REVIEWS = [
  {
    text: '\"Mes revenus locatifs ont augmenté de 45% depuis que Gward gère mon appartement. Un service irréprochable et une équipe ultra-réactive.\"',
    author: 'Marc T.',
    location: 'Paris 7ème',
    stars: 5,
  },
  {
    text: '\"Professionnalisme, rigueur et disponibilité 24h/24. Je recommande Gward Conciergerie à tous les propriétaires qui souhaitent louer sereinement.\"',
    author: 'Sophie L.',
    location: 'Nice',
    stars: 5,
  },
  {
    text: '\"La meilleure décision pour mon bien. Gestion complète, voyageurs satisfaits, et moi je n\'ai plus rien à gérer. Parfait !\"',
    author: 'Pierre M.',
    location: 'Bordeaux',
    stars: 5,
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
    {[...Array(count)].map((_, i) => (
      <span key={i} style={{ color: GOLD, fontSize: 18 }}>★</span>
    ))}
  </div>
);

const ReviewCard: React.FC<{
  review: (typeof REVIEWS)[0];
  index: number;
}> = ({ review, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 20 + index * 25;

  const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const cardX = interpolate(frame, [delay, delay + 30], [40, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      opacity: cardOpacity,
      transform: `translateX(${cardX}px)`,
      background: BG_CARD,
      border: `1px solid ${GOLD}33`,
      borderRadius: 10,
      padding: '32px 28px',
      position: 'relative',
    }}>
      {/* Quote mark */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 20,
        fontSize: 60,
        color: `${GOLD}22`,
        fontFamily: FONT_TITLE,
        lineHeight: 1,
      }}>"</div>

      <Stars count={review.stars} />

      <p style={{
        margin: '0 0 20px',
        fontSize: 14,
        color: GRAY_LIGHT,
        fontFamily: FONT_BODY,
        lineHeight: 1.8,
        fontStyle: 'italic',
      }}>
        {review.text}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderTop: `1px solid ${GOLD}22`,
        paddingTop: 16,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `${GOLD}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          color: GOLD,
          fontFamily: FONT_TITLE,
          fontWeight: 700,
        }}>
          {review.author[0]}
        </div>
        <div>
          <div style={{ fontSize: 14, color: WHITE, fontFamily: FONT_BODY, fontWeight: 600 }}>
            {review.author}
          </div>
          <div style={{ fontSize: 12, color: GRAY, fontFamily: 'Arial, sans-serif' }}>
            {review.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 35], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 40], [25, 0], { extrapolateRight: 'clamp' });
  const lineW = interpolate(frame, [25, 65], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fadeOut = interpolate(frame, [210, 240], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ratingOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: GOLD,
          letterSpacing: 5,
          textTransform: 'uppercase',
          fontFamily: FONT_BODY,
          opacity: titleOpacity,
        }}>Ils nous font confiance</p>
        <h2 style={{
          margin: '10px 0 0',
          fontSize: 44,
          fontWeight: 300,
          color: WHITE,
          fontFamily: FONT_TITLE,
          letterSpacing: 2,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          Avis <em style={{ color: GOLD, fontStyle: 'italic' }}>Clients</em>
        </h2>
        <div style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          margin: '16px auto 0',
        }} />
        {/* Overall rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
          opacity: ratingOpacity,
        }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: GOLD, fontSize: 20 }}>★</span>
          ))}
          <span style={{ color: GRAY, fontSize: 14, fontFamily: FONT_BODY, marginLeft: 8 }}>
            5.0 · Note moyenne Google
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        width: '100%',
        maxWidth: 1400,
      }}>
        {REVIEWS.map((review, i) => (
          <ReviewCard key={i} review={review} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
