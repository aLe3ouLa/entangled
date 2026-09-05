import {
  RELATIONSHIP_TYPE_COLOR,
  RELATIONSHIP_TYPE_LABEL,
} from "../../lib/relationshipType";
import type { Relationship } from "../../types";

import styles from "./TypeTag.module.css";

interface TypeTagProps {
  type: Relationship["type"];
  label: string;
}
export const TypeTag = ({ type, label }: TypeTagProps) => {
  return (
    <div className={styles.tagContainer}>
      <span
        className={styles.tagDot}
        style={{ background: RELATIONSHIP_TYPE_COLOR[type] }}
      />
      <span>
        {label}{" "}
        <span className={styles.tagLabel}>
          · {RELATIONSHIP_TYPE_LABEL[type]}
        </span>
      </span>
    </div>
  );
};
