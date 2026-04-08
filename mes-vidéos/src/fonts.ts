import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

export const FONT_TITLE = '"Playfair Display", Georgia, serif';
export const FONT_BODY = '"Montserrat", Arial, sans-serif';

// Load fonts properly using @remotion/fonts (blocks rendering until ready)
const loadFonts = async () => {
  await Promise.all([
    loadFont({
      family: 'Playfair Display',
      url: staticFile('fonts/PlayfairDisplay.woff2'),
      weight: '400',
      style: 'normal',
    }),
    loadFont({
      family: 'Playfair Display',
      url: staticFile('fonts/PlayfairDisplay.woff2'),
      weight: '700',
      style: 'normal',
    }),
    loadFont({
      family: 'Montserrat',
      url: staticFile('fonts/Montserrat.woff2'),
      weight: '300',
      style: 'normal',
    }),
    loadFont({
      family: 'Montserrat',
      url: staticFile('fonts/Montserrat.woff2'),
      weight: '400',
      style: 'normal',
    }),
    loadFont({
      family: 'Montserrat',
      url: staticFile('fonts/Montserrat.woff2'),
      weight: '600',
      style: 'normal',
    }),
  ]);
};

loadFonts();
