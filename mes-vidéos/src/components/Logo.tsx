import React from 'react';
import { GOLD } from '../constants';
import { FONT_TITLE } from '../fonts';

// SVG recreation of GWARD Conciergerie logo (white text, transparent bg — for dark backgrounds)
export const Logo: React.FC<{ size?: number }> = ({ size = 280 }) => {
  const h = Math.round(size * 0.62);
  return (
    <svg width={size} height={h} viewBox="0 0 280 174" style={{ display: 'block' }}>
      <text x="0" y="106" fontFamily={FONT_TITLE} fontWeight="700" fontSize="98" fill="#FFFFFF" letterSpacing="-2">
        GWARD
      </text>
      <circle cx="262" cy="80" r="14" fill={GOLD} />
      <text x="2" y="160" fontFamily={FONT_TITLE} fontWeight="400" fontSize="46" fill="#FFFFFF" letterSpacing="0">
        conciergerie
      </text>
    </svg>
  );
};
