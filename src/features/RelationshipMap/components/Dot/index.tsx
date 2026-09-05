import styles from "./styles.module.css";

export const Dot = ({ color }: { color: string }) => (
  <span className={styles.dot} style={{ background: color }} />
);
