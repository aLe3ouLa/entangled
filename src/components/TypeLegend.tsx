import type { CSSProperties } from 'react';
import { RELATIONSHIP_TYPES, RELATIONSHIP_TYPE_COLOR, RELATIONSHIP_TYPE_LABEL } from '../lib/relationshipType';
import { theme } from '../lib/theme';

export function TypeLegend({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        background: theme.panel,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.panelBorder}`,
        borderRadius: 10,
        padding: '12px 16px',
        color: theme.text,
        fontFamily: theme.fontUI,
        fontSize: 11,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        zIndex: 900,
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        ...style,
      }}
    >
      <div style={{ color: theme.accent, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 }}>
        Bond type
      </div>
      {RELATIONSHIP_TYPES.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: RELATIONSHIP_TYPE_COLOR[t], flexShrink: 0 }} />
          <span style={{ color: theme.textMuted }}>{RELATIONSHIP_TYPE_LABEL[t]}</span>
        </div>
      ))}
      <div style={{ color: theme.accent, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6, margin: '8px 0 2px' }}>
        Line style
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width={18} height={9}>
          <line x1={0} y1={4.5} x2={18} y2={4.5} stroke={theme.textMuted} strokeWidth={2} />
        </svg>
        <span style={{ color: theme.textMuted }}>Positive</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width={18} height={9}>
          <line x1={0} y1={4.5} x2={18} y2={4.5} stroke={theme.textMuted} strokeWidth={2} strokeDasharray="4 3" />
        </svg>
        <span style={{ color: theme.textMuted }}>Negative</span>
      </div>
      <div style={{ color: theme.accent, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6, margin: '8px 0 2px' }}>
        Encoding
      </div>
      <div style={{ color: theme.textMuted }}>Node size — screen time</div>
      <div style={{ color: theme.textMuted }}>Line width — tension</div>
      <div style={{ color: theme.textFaint, marginTop: 6 }}>Click a character or line for details</div>
    </div>
  );
}
