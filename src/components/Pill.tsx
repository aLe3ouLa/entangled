import type { ReactNode } from 'react';
import { theme } from '../lib/theme';

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? theme.accentDim : 'rgba(21,18,15,0.7)',
        border: `1px solid ${active ? theme.accentSoft : theme.hairline}`,
        borderRadius: 999,
        padding: '7px 16px',
        color: active ? theme.accent : theme.textMuted,
        cursor: 'pointer',
        fontSize: 12,
        fontFamily: theme.fontUI,
        fontWeight: active ? 600 : 500,
        letterSpacing: 0.2,
        transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}
