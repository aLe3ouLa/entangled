import styles from "./styles.module.css";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: Props) {
  const buttons: { label: string; onClick: () => void; aria: string }[] = [
    { label: "+", onClick: onZoomIn, aria: "zoom in" },
    { label: "−", onClick: onZoomOut, aria: "zoom out" },
    { label: "⟲", onClick: onReset, aria: "reset zoom" },
  ];

  return (
    <div className={styles.buttonGroup}>
      {buttons.map((b) => (
        <button
          key={b.aria}
          onClick={b.onClick}
          aria-label={b.aria}
          className={styles.button}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
