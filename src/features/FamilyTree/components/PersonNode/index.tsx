import type { Character } from "@/components/Character/types";
import type { FamilyPerson } from "@/types";

import styles from "./styles.module.css";
import { AvatarIcon } from "@/components/Character/AvatarIcon";

const AVATAR_SIZE = 48;

function personCharacter(
  person: FamilyPerson,
  characters: Character[],
): Character {
  return (
    characters.find((character) => character.id === person.id) ?? {
      id: person.id,
      name: person.name,
      house: "",
      color: person.color ?? "#6b7280",
      bio: "",
      aliveUntil: 1,
      prominence: [100],
    }
  );
}

export const PersonNode = ({
  person,
  characters,
  photoUrl,
  nodeRef,
}: {
  person: FamilyPerson;
  characters: Character[];
  photoUrl: string | null | undefined;
  nodeRef: (el: HTMLDivElement | null) => void;
}) => {
  const character = personCharacter(person, characters);
  return (
    <div className={styles.personContainer}>
      <div ref={nodeRef}>
        <AvatarIcon
          character={character}
          size={AVATAR_SIZE}
          padding={2}
          photoUrl={photoUrl}
        />
      </div>
      <div className={styles.personName}>{person.name}</div>
    </div>
  );
};
