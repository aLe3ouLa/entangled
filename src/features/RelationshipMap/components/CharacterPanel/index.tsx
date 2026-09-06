import { AvatarIcon } from "../../../../components/Character/AvatarIcon";
import { Bar } from "../Bar";
import { PanelCloseButton } from "../PanelCloseButton";
import { TypeTag } from "../TypeTag";
import type { RelationshipRow } from "../../hooks/useRelationshipMapState";

import style from "./styles.module.css";
import { Dot } from "../Dot";
import type { Character } from "@/components/Character/types";

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
    <div className={style.characterPanel}>
      <PanelCloseButton onClick={onClose}>✕ close</PanelCloseButton>
      <div className={style.characterHeader}>
        <AvatarIcon
          character={character}
          size={72}
          padding={1}
          photoUrl={photos[character.id]}
        />
        <div>
          <h2 className={style.characterName}>{character.name}</h2>
          <div className={style.characterHouse}>House {character.house}</div>
        </div>
      </div>
      <div className={style.characterStatus}>
        <Dot color={alive ? "#4ade80" : "#6b7280"} />
        <span className={style.statusText}>
          {alive
            ? "Alive"
            : `Deceased — last seen Season ${character.aliveUntil}`}
        </span>
      </div>
      <p className={style.characterBio}>{character.bio}</p>
      <Bar label="importance" value={prominence} />
      <div className={style.relationshipsHeader}>Relationships</div>
      {rows.map(({ rel, other, frame, type }) => (
        <button
          key={rel.id}
          onClick={() => onSelectRelationship(rel.id)}
          className={style.relationshipRow}
        >
          <div className={style.otherName}>{other.name}</div>
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
