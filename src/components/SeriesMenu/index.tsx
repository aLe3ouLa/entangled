import { useEffect, useRef, useState } from 'react';
import type { Series } from '../../types';
import styles from './styles.module.css';

interface Props {
  series: Series[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SeriesMenu({ series, activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const active = series.find((s) => s.id === activeId);

  return (
    <div className={styles.container} ref={containerRef}>
      {open && (
        <div className={styles.menu} role="menu">
          {series.map((s) => (
            <button
              key={s.id}
              role="menuitemradio"
              aria-checked={s.id === activeId}
              className={s.id === activeId ? styles.itemActive : styles.item}
              onClick={() => {
                onSelect(s.id);
                setOpen(false);
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}
      <button
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Choose series"
      >
        <span className={styles.hamburger} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.triggerLabel}>{active?.title}</span>
      </button>
    </div>
  );
}
