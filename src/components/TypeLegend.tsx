import type { CSSProperties } from 'react';
import { RELATIONSHIP_TYPES, RELATIONSHIP_TYPE_COLOR, RELATIONSHIP_TYPE_LABEL } from '../lib/relationshipType';

export function TypeLegend({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        background: 'rgba(17,24,39,0.85)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '10px 14px',
        color: '#e5e7eb',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 11,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        zIndex: 900,
        ...style,
      }}
    >
      <div style={{ opacity: 0.5, fontSize: 10, textTransform: 'uppercase', marginBottom: 2 }}>Bond type</div>
      {RELATIONSHIP_TYPES.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: RELATIONSHIP_TYPE_COLOR[t], flexShrink: 0 }} />
          <span style={{ opacity: 0.85 }}>{RELATIONSHIP_TYPE_LABEL[t]}</span>
        </div>
      ))}
    </div>
  );
}
