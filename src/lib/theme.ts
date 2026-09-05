/** Gold-and-ink palette — an editorial, "prestige drama" register instead of
 *  generic dark-dashboard chrome. Referenced everywhere instead of scattering
 *  hex codes, so the look stays consistent across views. */
export const theme = {
  bg: '#0b0908',
  bgVignette: 'radial-gradient(ellipse at 50% 0%, rgba(60,45,20,0.16), transparent 60%)',
  panel: 'rgba(21,18,15,0.88)',
  panelBorder: 'rgba(201,165,74,0.22)',
  hairline: 'rgba(255,255,255,0.08)',

  text: '#f3ecdf',
  textMuted: 'rgba(243,236,223,0.6)',
  textFaint: 'rgba(243,236,223,0.4)',

  accent: '#c9a35a',
  accentSoft: 'rgba(201,163,90,0.35)',
  accentDim: 'rgba(201,163,90,0.16)',

  fontDisplay: "'Cormorant Garamond', Georgia, serif",
  fontUI: "'Inter', system-ui, sans-serif",
} as const;
