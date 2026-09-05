import styles from "./MiniBar.module.css";

interface MiniBarProps {
  label: string;
  value: number;
}

export const MiniBar = ({ label, value }: MiniBarProps) => {
  return (
    <div className={styles.barContainer}>
      <span className={styles.barLabel}>{label}</span>
      <div className={styles.barBackground}>
        <div
          className={styles.barFill}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
};
