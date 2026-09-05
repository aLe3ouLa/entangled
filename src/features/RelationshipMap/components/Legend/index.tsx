import { useState } from "react";
import { Dot } from "@/features/RelationshipMap/components/Dot";
import {
  RELATIONSHIP_TYPES,
  RELATIONSHIP_TYPE_COLOR,
  RELATIONSHIP_TYPE_LABEL,
} from "../../../../lib/relationshipType";
import { theme } from "../../../../lib/theme";

import styles from "./styles.module.css";

export function Legend() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.legendContainer}>
      <button
        className={styles.legendHeader}
        onClick={() => setCollapsed((prev) => !prev)}
        aria-expanded={!collapsed}
      >
        <span className={styles.legendHeaderTitle}>Legend</span>
        <span className={styles.legendToggle}>{collapsed ? "+" : "−"}</span>
      </button>
      {!collapsed && (
        <>
          <div className={styles.legendTitle}>Bond type</div>
          {RELATIONSHIP_TYPES.map((t) => (
            <div key={t} className={styles.legendItem}>
              <Dot color={RELATIONSHIP_TYPE_COLOR[t]} />
              <span style={{ color: theme.textMuted }}>
                {RELATIONSHIP_TYPE_LABEL[t]}
              </span>
            </div>
          ))}
          <div className={styles.legendTitle}>Line style</div>
          <div className={styles.legendItem}>
            <svg width={18} height={9}>
              <line
                x1={0}
                y1={4.5}
                x2={18}
                y2={4.5}
                stroke={theme.textMuted}
                strokeWidth={2}
              />
            </svg>
            <span className={styles.legendText}>Positive</span>
          </div>
          <div className={styles.legendItem}>
            <svg width={18} height={9}>
              <line
                x1={0}
                y1={4.5}
                x2={18}
                y2={4.5}
                stroke={theme.textMuted}
                strokeWidth={2}
                strokeDasharray="4 3"
              />
            </svg>
            <span className={styles.legendText}>Negative</span>
          </div>
          <div className={styles.legendTitle}>Encoding</div>
          <div className={styles.legendText}>Node size — screen time</div>
          <div className={styles.legendText}>Line width — tension</div>
          <div className={styles.legendAction}>
            Click a character or line for details
          </div>
        </>
      )}
    </div>
  );
}
