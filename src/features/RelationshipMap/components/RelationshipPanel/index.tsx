import { AvatarIcon } from "../../../../components/Character/AvatarIcon";
import {
  RELATIONSHIP_TYPE_COLOR,
  RELATIONSHIP_TYPE_LABEL,
} from "@/lib/relationshipType";
import { theme } from "../../../../lib/theme";
import type { frameAt } from "../../../../lib/timeline";
import type { Relationship } from "../../../../types";
import { Bar } from "../Bar";
import { PanelCloseButton } from "../PanelCloseButton";

import styles from "./styles.module.css";
import { Dot } from "../Dot";
import type { Character } from "@/components/Character/types";

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
    <div className={styles.panel}>
      <PanelCloseButton onClick={onBack ?? onClose}>
        {onBack ? "← back" : "✕ close"}
      </PanelCloseButton>
      <div className={styles.characterRow}>
        <AvatarIcon character={source} size={40} photoUrl={photos[source.id]} />
        <span style={{ color: theme.textFaint }}>—</span>
        <AvatarIcon character={target} size={40} photoUrl={photos[target.id]} />
      </div>
      <div className={styles.relationshipName}>
        {source.name.split(" ")[0]} &amp; {target.name.split(" ")[0]}
      </div>
      <h2 className={styles.relationshipLabel}>{rel.label}</h2>
      <div className={styles.relationshipTypeRow}>
        <Dot color={RELATIONSHIP_TYPE_COLOR[type]} />
        {RELATIONSHIP_TYPE_LABEL[type]}
      </div>
      <p className={styles.relationshipSummary}>{rel.summary}</p>
      <Bar label="trust" value={frame.trust} />
      <Bar label="affection" value={frame.affection} />
      <Bar label="power" value={frame.power} />
      <Bar label="tension" value={frame.tension} />
    </div>
  );
};
