import { useLayoutEffect, useRef, useState } from 'react';
import { CharacterAvatar } from './components/CharacterAvatar';
import { RELATIONSHIP_TYPE_COLOR } from './lib/relationshipType';
import { useFamilyPhotos } from './lib/useFamilyPhotos';
import { useWindowSize } from './lib/useWindowSize';
import type { Character, FamilyLinkKind, FamilyPerson, Series } from './types';

const AVATAR_SIZE = 48;

function personCharacter(p: FamilyPerson, characters: Character[]): Character {
  return characters.find((c) => c.id === p.id) ?? { id: p.id, name: p.name, house: '', color: p.color ?? '#6b7280', aliveUntil: 1, prominence: [100] };
}

function lineStyle(kind: FamilyLinkKind): { stroke: string; dash?: string } {
  if (kind === 'secret-parent') return { stroke: RELATIONSHIP_TYPE_COLOR['hidden-truth'], dash: '5 4' };
  if (kind === 'adoptive') return { stroke: '#9ca3af', dash: '5 4' };
  return { stroke: '#9ca3af' };
}

interface Point {
  x: number;
  y: number;
}

interface LineSpec {
  key: string;
  a: Point;
  b: Point;
  stroke: string;
  dash?: string;
}

function PersonNode({
  person,
  characters,
  photoUrl,
  nodeRef,
}: {
  person: FamilyPerson;
  characters: Character[];
  photoUrl: string | null | undefined;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const character = personCharacter(person, characters);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 96 }}>
      <div ref={nodeRef} style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
        <svg width={AVATAR_SIZE} height={AVATAR_SIZE}>
          <g transform={`translate(${AVATAR_SIZE / 2},${AVATAR_SIZE / 2})`}>
            <CharacterAvatar character={character} radius={AVATAR_SIZE / 2 - 2} photoUrl={photoUrl} />
          </g>
        </svg>
      </div>
      <div style={{ fontSize: 12, color: '#e5e7eb', marginTop: 6, textAlign: 'center' }}>{person.name}</div>
    </div>
  );
}

/** Static genealogy view — no seasons, no scores, just who's related to whom. */
export function FamilyTreeView({ series }: { series: Series }) {
  const tree = series.familyTree;
  const photos = useFamilyPhotos(series);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<LineSpec[]>([]);
  const size = useWindowSize();

  useLayoutEffect(() => {
    if (!tree) return;
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    function center(id: string): Point | null {
      const el = nodeRefs.current[id];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - containerRect.left, y: r.top + r.height / 2 - containerRect.top };
    }

    const next: LineSpec[] = [];
    for (const link of tree.links) {
      const a = center(link.from);
      const b = center(link.to);
      if (!a || !b) continue;
      const style = lineStyle(link.kind);
      next.push({ key: `${link.from}-${link.to}-${link.kind}`, a, b, stroke: style.stroke, dash: style.dash });
    }
    for (const s of tree.spouses) {
      const a = center(s.a);
      const b = center(s.b);
      if (!a || !b) continue;
      next.push({ key: `spouse-${s.a}-${s.b}`, a, b, stroke: '#6b7280' });
    }
    setLines(next);
  }, [tree, photos, size]);

  if (!tree) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0b0f14',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        No family tree data for this series yet.
      </div>
    );
  }

  const connectedIds = new Set<string>();
  for (const l of tree.links) {
    connectedIds.add(l.from);
    connectedIds.add(l.to);
  }
  for (const s of tree.spouses) {
    connectedIds.add(s.a);
    connectedIds.add(s.b);
  }
  const connectedPeople = tree.people.filter((p) => connectedIds.has(p.id));
  const isolatedPeople = tree.people.filter((p) => !connectedIds.has(p.id));

  const generations = [...new Set(connectedPeople.map((p) => p.generation))].sort((a, b) => a - b);
  const notes = tree.links.filter((l) => l.note);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b0f14', overflow: 'auto' }}>
      <div
        style={{
          padding: '32px 24px 16px',
          color: '#e5e7eb',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 13,
          opacity: 0.7,
        }}
      >
        {series.title} — family tree. Solid = biological parent, dashed gray = raised by (not
        biological), dashed purple = true parentage kept secret in-story.
      </div>

      <div ref={containerRef} style={{ position: 'relative', padding: '20px 24px 40px' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {lines.map((l) => (
            <line key={l.key} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={l.stroke} strokeWidth={2} strokeDasharray={l.dash} />
          ))}
        </svg>

        {generations.map((gen) => (
          <div
            key={gen}
            style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 90, position: 'relative', zIndex: 1 }}
          >
            {connectedPeople
              .filter((p) => p.generation === gen)
              .map((p) => (
                <PersonNode
                  key={p.id}
                  person={p}
                  characters={series.characters}
                  photoUrl={photos[p.id]}
                  nodeRef={(el) => {
                    nodeRefs.current[p.id] = el;
                  }}
                />
              ))}
          </div>
        ))}

        {isolatedPeople.length > 0 && (
          <>
            <div style={{ color: '#6b7280', fontFamily: 'system-ui, sans-serif', fontSize: 11, textTransform: 'uppercase', marginBottom: 14 }}>
              No tracked family ties in this dataset
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 20 }}>
              {isolatedPeople.map((p) => (
                <PersonNode
                  key={p.id}
                  person={p}
                  characters={series.characters}
                  photoUrl={photos[p.id]}
                  nodeRef={() => {}}
                />
              ))}
            </div>
          </>
        )}

        {notes.length > 0 && (
          <div style={{ marginTop: 20, color: '#9ca3af', fontFamily: 'system-ui, sans-serif', fontSize: 12, lineHeight: 1.7 }}>
            {notes.map((l) => (
              <div key={`${l.from}-${l.to}-note`}>
                <strong style={{ color: '#e5e7eb', fontWeight: 500 }}>
                  {tree.people.find((p) => p.id === l.from)?.name} → {tree.people.find((p) => p.id === l.to)?.name}:
                </strong>{' '}
                {l.note}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
