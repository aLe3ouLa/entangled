import { theme } from '../lib/theme';

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: Props) {
  const buttons: { label: string; onClick: () => void; aria: string }[] = [
    { label: '+', onClick: onZoomIn, aria: 'zoom in' },
    { label: '−', onClick: onZoomOut, aria: 'zoom out' },
    { label: '⟲', onClick: onReset, aria: 'reset zoom' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 170,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        zIndex: 900,
      }}
    >
      {buttons.map((b) => (
        <button
          key={b.aria}
          onClick={b.onClick}
          aria-label={b.aria}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: theme.panel,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.panelBorder}`,
            color: theme.text,
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: '32px',
            padding: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
