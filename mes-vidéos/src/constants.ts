export const GOLD = '#DB651B';
export const GOLD_LIGHT = '#E8873A';
export const BG = '#181F3D';
export const BG_CARD = '#1E2647';
export const WHITE = '#FFFFFF';
export const GRAY = '#9BA8C8';
export const GRAY_LIGHT = '#C8D0E4';

export const FPS = 30;

// Scene durations in frames
export const SCENE_DURATIONS = {
  intro:    6  * 30, // 180
  services: 10 * 30, // 300
  domain:   6  * 30, // 180
  stats:    6  * 30, // 180
  reviews:  7  * 30, // 210
  cta:      7  * 30, // 210
};

// Fade transition duration between scenes (frames)
export const FADE = 20;

// Total frames = sum of scenes - (n-1) × FADE
export const TOTAL_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) -
  (Object.keys(SCENE_DURATIONS).length - 1) * FADE;
// = 1260 - 100 = 1160 frames ≈ 38.7 seconds
