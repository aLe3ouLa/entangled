import { CharacterAvatar } from "../../components/CharacterAvatar";
import {
  RELATIONSHIP_TYPE_COLOR,
  RELATIONSHIP_TYPE_LABEL,
} from "../../lib/relationshipType";
import { theme } from "../../lib/theme";
import type { frameAt } from "../../lib/timeline";
import type { Character, Relationship } from "../../types";
import { MiniBar } from "./MiniBar";
import { closeButtonStyle } from "./styles";

interface RelationshipPanelProps {
  rel: Relationship;
  frame: ReturnType<typeof frameAt>;
  type: Relationship["type"];
  characters: Character[];
  photos: Record<string, string | null>;
  onBack?: () => void;
  onClose: () => void;
}

export const RelationshipPanel = ({
  rel,
  frame,
  type,
  characters,
  photos,
  onBack,
  onClose,
}: RelationshipPanelProps) => {
  const source = characters.find((c) => c.id === rel.source)!;
  const target = characters.find((c) => c.id === rel.target)!;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 300,
        zIndex: 950,
        background: theme.panel,
        backdropFilter: "blur(10px)",
        color: theme.text,
        padding: 20,
        fontFamily: theme.fontUI,
        overflowY: "auto",
        borderLeft: `1px solid ${theme.panelBorder}`,
        boxShadow: "-16px 0 40px rgba(0,0,0,0.4)",
      }}
    >
      <button onClick={onBack ?? onClose} style={closeButtonStyle}>
        {onBack ? "← back" : "✕ close"}
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <svg width={40} height={40}>
          <g transform="translate(20,20)">
            <CharacterAvatar
              character={source}
              radius={20}
              photoUrl={photos[source.id]}
            />
          </g>
        </svg>
        <span style={{ color: theme.textFaint }}>—</span>
        <svg width={40} height={40}>
          <g transform="translate(20,20)">
            <CharacterAvatar
              character={target}
              radius={20}
              photoUrl={photos[target.id]}
            />
          </g>
        </svg>
      </div>
      <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
        {source.name.split(" ")[0]} &amp; {target.name.split(" ")[0]}
      </div>
      <h2
        style={{
          margin: "0 0 8px",
          fontFamily: theme.fontDisplay,
          fontWeight: 600,
          fontSize: 22,
        }}
      >
        {rel.label}
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: theme.textMuted,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: RELATIONSHIP_TYPE_COLOR[type],
          }}
        />
        {RELATIONSHIP_TYPE_LABEL[type]}
      </div>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: theme.text,
          opacity: 0.9,
          marginBottom: 20,
        }}
      >
        {rel.summary}
      </p>
      <MiniBar label="trust" value={frame.trust} />
      <MiniBar label="affection" value={frame.affection} />
      <MiniBar label="power" value={frame.power} />
      <MiniBar label="tension" value={frame.tension} />
    </div>
  );
};
