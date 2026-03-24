import { staticFile } from 'remotion';

export const FONT_TITLE = '"Playfair Display", Georgia, serif';
export const FONT_BODY = '"Montserrat", Arial, sans-serif';

// Inject @font-face CSS without blocking render
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Playfair Display';
      font-style: normal;
      font-weight: 100 900;
      src: url('${staticFile('fonts/PlayfairDisplay.woff2')}') format('woff2');
    }
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 100 900;
      src: url('${staticFile('fonts/Montserrat.woff2')}') format('woff2');
    }
  `;
  document.head.appendChild(style);
}
