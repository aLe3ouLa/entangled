import styles from "./Bar.module.css";

interface BarProps {
  label: string;
  value: number;
}

export const Bar = ({ label, value }: BarProps) => {
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
