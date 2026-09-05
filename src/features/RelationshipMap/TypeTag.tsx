import {
  RELATIONSHIP_TYPE_COLOR,
  RELATIONSHIP_TYPE_LABEL,
} from "../../lib/relationshipType";
import { theme } from "../../lib/theme";
import type { Relationship } from "../../types";

interface TypeTagProps {
  type: Relationship["type"];
  label: string;
}
export const TypeTag = ({ type, label }: TypeTagProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: theme.textMuted,
        marginBottom: 6,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: RELATIONSHIP_TYPE_COLOR[type],
          flexShrink: 0,
        }}
      />
      <span>
        {label}{" "}
        <span style={{ color: theme.textFaint }}>
          · {RELATIONSHIP_TYPE_LABEL[type]}
        </span>
      </span>
    </div>
  );
};
