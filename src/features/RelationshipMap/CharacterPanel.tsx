import { CharacterAvatar } from "../../components/CharacterAvatar";
import { theme } from "../../lib/theme";
import type { Character } from "../../types";
import { Bar } from "./Bar";
import { closeButtonStyle } from "./styles";
import { TypeTag } from "./TypeTag";
import type { RelationshipRow } from "./useRelationshipMapState";

interface CharacterPanelProps {
  character: Character;
  alive: boolean;
  prominence: number;
  rows: RelationshipRow[];
  photos: Record<string, string | null>;
  onSelectRelationship: (id: string) => void;
  onClose: () => void;
}

export function CharacterPanel({
  character,
  alive,
  prominence,
  rows,
  photos,
  onSelectRelationship,
  onClose,
}: CharacterPanelProps) {
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
      <button onClick={onClose} style={closeButtonStyle}>
        ✕ close
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 10,
        }}
      >
        <svg width={72} height={72}>
          <g transform="translate(36,36)">
            <CharacterAvatar
              character={character}
              radius={35}
              photoUrl={photos[character.id]}
            />
          </g>
        </svg>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: theme.fontDisplay,
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            {character.name}
          </h2>
          <div style={{ fontSize: 12, color: theme.textMuted }}>
            House {character.house}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: alive ? "#4ade80" : "#6b7280",
            flexShrink: 0,
          }}
        />
        <span style={{ color: theme.textMuted }}>
          {alive
            ? "Alive"
            : `Deceased — last seen Season ${character.aliveUntil}`}
        </span>
      </div>
      <p
        style={{
          margin: "0 0 14px",
          fontFamily: theme.fontDisplay,
          fontStyle: "italic",
          fontSize: 14,
          lineHeight: 1.55,
          color: theme.text,
          opacity: 0.9,
        }}
      >
        {character.bio}
      </p>
      <Bar label="importance" value={prominence} />
      <div
        style={{
          color: theme.accent,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          margin: "20px 0 4px",
        }}
      >
        Relationships
      </div>
      {rows.map(({ rel, other, frame, type }) => (
        <button
          key={rel.id}
          onClick={() => onSelectRelationship(rel.id)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            borderTop: `1px solid ${theme.hairline}`,
            color: "inherit",
            cursor: "pointer",
            padding: "10px 0",
          }}
        >
          <div
            style={{
              fontFamily: theme.fontDisplay,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {other.name}
          </div>
          <TypeTag type={type} label={rel.label} />
          <Bar label="trust" value={frame.trust} />
          <Bar label="affection" value={frame.affection} />
          <Bar label="power" value={frame.power} />
          <Bar label="tension" value={frame.tension} />
        </button>
      ))}
    </div>
  );
}
