/** Navy-and-bubblegum palette — a playful, high-contrast register instead of
 *  generic dark-dashboard chrome. Referenced everywhere instead of scattering
 *  hex codes, so the look stays consistent across views. */
export const theme = {
  bg: "#0a0c16",
  bgVignette:
    "radial-gradient(ellipse at 50% 0%, rgba(255,111,174,0.16), transparent 60%)",
  panel: "rgba(15,17,28,0.88)",
  panelBorder: "rgba(255,111,174,0.25)",
  hairline: "rgba(255,255,255,0.08)",

  text: "#f2eef8",
  textMuted: "rgba(242,238,248,0.6)",
  textFaint: "rgba(242,238,248,0.4)",

  accent: "#ff6fae",
  accentSoft: "rgba(255,111,174,0.35)",
  accentDim: "rgba(255,111,174,0.16)",

  fontDisplay: "'Nunito', system-ui, sans-serif",
  fontUI: "'Nunito', system-ui, sans-serif",
} as const;
