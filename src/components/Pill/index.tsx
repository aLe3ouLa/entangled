import type { ReactNode } from "react";

import styles from "./styles.module.css";

export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className={`${styles.pill} ${active ? styles.pillActive : styles.pillBase}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
