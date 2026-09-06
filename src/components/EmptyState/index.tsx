import styles from "./styles.module.css";

export const EmptyState = () => {
  return (
    <p className={styles.emptyState}>
      No family tree data for this series yet.
    </p>
  );
};
