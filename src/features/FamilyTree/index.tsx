import { useLayoutEffect, useRef, useState } from "react";
import { RELATIONSHIP_TYPE_COLOR } from "../../lib/relationshipType";
import { theme } from "../../lib/theme";
import { useFamilyPhotos } from "../../lib/useFamilyPhotos";
import { useWindowSize } from "../../lib/useWindowSize";
import type { FamilyLinkKind, Series } from "../../types";
import { PersonNode } from "./components/PersonNode";

function lineStyle(kind: FamilyLinkKind): { stroke: string; dash?: string } {
  if (kind === "secret-parent")
    return { stroke: RELATIONSHIP_TYPE_COLOR["hidden-truth"], dash: "5 4" };
  if (kind === "adoptive")
    return { stroke: "rgba(243,236,223,0.4)", dash: "5 4" };
  if (kind === "extended") return { stroke: theme.accentSoft };
  return { stroke: "rgba(243,236,223,0.4)" };
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
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
      };
    }

    const next: LineSpec[] = [];
    for (const link of tree.links) {
      const a = center(link.from);
      const b = center(link.to);
      if (!a || !b) continue;
      const style = lineStyle(link.kind);
      next.push({
        key: `${link.from}-${link.to}-${link.kind}`,
        a,
        b,
        stroke: style.stroke,
        dash: style.dash,
      });
    }
    for (const s of tree.spouses) {
      const a = center(s.a);
      const b = center(s.b);
      if (!a || !b) continue;
      next.push({
        key: `spouse-${s.a}-${s.b}`,
        a,
        b,
        stroke: theme.accentSoft,
      });
    }
    setLines(next);
  }, [tree, photos, size]);

  if (!tree) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: theme.bg,
          color: theme.textMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: theme.fontUI,
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

  const generations = [
    ...new Set(connectedPeople.map((p) => p.generation)),
  ].sort((a, b) => a - b);
  const notes = tree.links.filter((l) => l.note);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: theme.bg,
        overflow: "auto",
      }}
    >
      <div style={{ padding: "28px 24px 4px" }}>
        <h1
          style={{
            margin: 0,
            color: theme.text,
            fontFamily: theme.fontDisplay,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 0.3,
          }}
        >
          {series.title}
        </h1>
        <div
          style={{
            color: theme.textMuted,
            fontFamily: theme.fontUI,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Solid = biological parent · dashed gray = raised by (not biological) ·
          solid gold = extended family (uncle, sibling, etc.) · dashed{" "}
          <span style={{ color: RELATIONSHIP_TYPE_COLOR["hidden-truth"] }}>
            gold-violet
          </span>{" "}
          = true parentage kept secret in-story.
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ position: "relative", padding: "28px 24px 40px" }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {lines.map((l) => (
            <line
              key={l.key}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              stroke={l.stroke}
              strokeWidth={2}
              strokeDasharray={l.dash}
            />
          ))}
        </svg>

        {generations.map((gen) => (
          <div
            key={gen}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              marginBottom: 90,
              position: "relative",
              zIndex: 1,
            }}
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
            <div
              style={{
                color: theme.textFaint,
                fontFamily: theme.fontUI,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 0.6,
                marginBottom: 14,
              }}
            >
              No tracked family ties in this dataset
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 40,
                marginBottom: 20,
              }}
            >
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
          <div
            style={{
              marginTop: 20,
              color: theme.textMuted,
              fontFamily: theme.fontUI,
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            {notes.map((l) => (
              <div key={`${l.from}-${l.to}-note`}>
                <strong style={{ color: theme.text, fontWeight: 500 }}>
                  {tree.people.find((p) => p.id === l.from)?.name} →{" "}
                  {tree.people.find((p) => p.id === l.to)?.name}:
                </strong>{" "}
                {l.note}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
