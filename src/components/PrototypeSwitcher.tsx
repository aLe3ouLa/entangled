import { useEffect, type CSSProperties } from 'react';

export interface VariantMeta {
  key: string;
  label: string;
}

interface Props {
  variants: VariantMeta[];
  current: string;
  onChange: (key: string) => void;
}

export function PrototypeSwitcher({ variants, current, onChange }: Props) {
  const index = variants.findIndex((v) => v.key === current);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === 'ArrowLeft') cycle(-1);
      if (e.key === 'ArrowRight') cycle(1);
    }
    function cycle(dir: number) {
      const next = (index + dir + variants.length) % variants.length;
      onChange(variants[next].key);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, variants, onChange]);

  const meta = variants[index];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: '#111827',
        color: '#f9fafb',
        borderRadius: 999,
        padding: '8px 16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 13,
        zIndex: 1000,
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <button
        onClick={() => onChange(variants[(index - 1 + variants.length) % variants.length].key)}
        style={arrowStyle}
        aria-label="previous variant"
      >
        ←
      </button>
      <span style={{ minWidth: 170, textAlign: 'center' }}>
        <strong>{meta.key}</strong> — {meta.label}
      </span>
      <button
        onClick={() => onChange(variants[(index + 1) % variants.length].key)}
        style={arrowStyle}
        aria-label="next variant"
      >
        →
      </button>
    </div>
  );
}

const arrowStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  color: 'inherit',
  width: 28,
  height: 28,
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: 14,
  lineHeight: '28px',
};
