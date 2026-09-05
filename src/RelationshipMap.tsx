import { useMemo, useState } from 'react';
import { CharacterAvatar } from './components/CharacterAvatar';
import { TypeLegend } from './components/TypeLegend';
import { useForceGraph } from './lib/forceLayout';
import { edgeColor, edgeDash, edgeDistance, edgeOpacity, edgeWidth, nodeRadius } from './lib/encode';
import { RELATIONSHIP_TYPE_COLOR, RELATIONSHIP_TYPE_LABEL } from './lib/relationshipType';
import { theme } from './lib/theme';
import { frameAt, isAlive, valueAt } from './lib/timeline';
import { useSeriesCast } from './lib/useSeriesCast';
import { useWindowSize } from './lib/useWindowSize';
import type { Character, Relationship, Series } from './types';

/**
 * One big force graph with a bottom scrubber you drag continuously across
 * a series' seasons — edges morph smoothly instead of jumping between states.
 */
export function RelationshipMap({ series }: { series: Series }) {
  const { characters, relationships, seasonCount } = series;
  const size = useWindowSize();
  const [t, setT] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedRel, setSelectedRel] = useState<string | null>(null);
  const { photos, loading: photosLoading } = useSeriesCast(series);

  const nodeIds = useMemo(() => characters.map((c) => c.id), [characters]);
  const linkDefs = useMemo(
    () => relationships.map((r) => ({ id: r.id, source: r.source, target: r.target })),
    [relationships],
  );

  const frames = useMemo(() => {
    const map: Record<string, ReturnType<typeof frameAt>> = {};
    for (const r of relationships) map[r.id] = frameAt(r.seasons, t);
    return map;
  }, [relationships, t]);

  const distances = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of relationships) map[r.id] = edgeDistance(frames[r.id]);
    return map;
  }, [relationships, frames]);

  const positions = useForceGraph(nodeIds, linkDefs, distances, size);

  const selectedChar = characters.find((c) => c.id === selected) ?? null;
  const selectedRels = selectedChar
    ? relationships.filter((r) => r.source === selectedChar.id || r.target === selectedChar.id)
    : [];
  const relDetail = relationships.find((r) => r.id === selectedRel) ?? null;

  function openCharacter(id: string) {
    setSelected(id);
    setSelectedRel(null);
  }

  function openRelationship(id: string) {
    setSelectedRel(id);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: theme.bg, overflow: 'hidden' }}>
      <svg width={size.width} height={size.height}>
        <defs>
          <filter id="edge-glow" x="-75%" y="-75%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {relationships.map((r) => {
          const a = positions[r.source];
          const b = positions[r.target];
          if (!a || !b) return null;
          const frame = frames[r.id];
          const isSelected = selectedRel === r.id;
          return (
            <line
              key={r.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={edgeColor(r.type)}
              strokeWidth={isSelected ? edgeWidth(frame) + 2.5 : edgeWidth(frame)}
              strokeOpacity={isSelected ? 1 : edgeOpacity(frame)}
              strokeDasharray={edgeDash(frame)}
              strokeLinecap="round"
              filter={isSelected ? 'url(#edge-glow)' : undefined}
              onClick={() => openRelationship(r.id)}
              style={{ cursor: 'pointer', transition: 'stroke-width 0.15s ease' }}
            />
          );
        })}
        {characters.map((c) => {
          const p = positions[c.id];
          if (!p) return null;
          const alive = isAlive(c.aliveUntil, t);
          const radius = nodeRadius(valueAt(c.prominence, t)) + (selected === c.id ? 4 : 0);
          return (
            <g
              key={c.id}
              transform={`translate(${p.x},${p.y})`}
              onClick={() => openCharacter(c.id)}
              style={{ cursor: 'pointer' }}
              opacity={alive ? 1 : 0.25}
            >
              <CharacterAvatar character={c} radius={radius} highlight={selected === c.id} photoUrl={photos[c.id]} />
              <text
                y={radius + 15}
                textAnchor="middle"
                fill={theme.text}
                fontSize={11}
                fontFamily={theme.fontUI}
                fontWeight={500}
              >
                {c.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ position: 'fixed', top: 20, left: 24 }}>
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
        <div style={{ color: theme.textMuted, fontFamily: theme.fontUI, fontSize: 12, marginTop: 4, maxWidth: 320 }}>
          Drag the scrubber below. Click a character or a line for details.
          <br />
          Node size = how much the season is about them. Line width = tension.
          {photosLoading && <div style={{ marginTop: 4, color: theme.textFaint }}>Loading cast photos…</div>}
        </div>
      </div>

      <TypeLegend />

      {relDetail ? (
        <RelationshipPanel
          rel={relDetail}
          frame={frames[relDetail.id]}
          characters={characters}
          photos={photos}
          onBack={selected ? () => setSelectedRel(null) : undefined}
          onClose={() => {
            setSelectedRel(null);
            setSelected(null);
          }}
        />
      ) : (
        selectedChar && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 300,
              zIndex: 950,
              background: theme.panel,
              backdropFilter: 'blur(10px)',
              color: theme.text,
              padding: 20,
              fontFamily: theme.fontUI,
              overflowY: 'auto',
              borderLeft: `1px solid ${theme.panelBorder}`,
              boxShadow: '-16px 0 40px rgba(0,0,0,0.4)',
            }}
          >
            <button onClick={() => setSelected(null)} style={closeButtonStyle}>
              ✕ close
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <svg width={48} height={48}>
                <g transform="translate(24,24)">
                  <CharacterAvatar character={selectedChar} radius={24} photoUrl={photos[selectedChar.id]} />
                </g>
              </svg>
              <div>
                <h2 style={{ margin: 0, fontFamily: theme.fontDisplay, fontWeight: 600, fontSize: 20 }}>{selectedChar.name}</h2>
                <div style={{ fontSize: 12, color: theme.textMuted }}>House {selectedChar.house}</div>
              </div>
            </div>
            {selectedRels.map((r) => {
              const other = characters.find((c) => c.id === (r.source === selectedChar.id ? r.target : r.source))!;
              const frame = frames[r.id];
              return (
                <button
                  key={r.id}
                  onClick={() => openRelationship(r.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderTop: `1px solid ${theme.hairline}`,
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '10px 0',
                  }}
                >
                  <div style={{ fontFamily: theme.fontDisplay, fontSize: 16, marginBottom: 4 }}>{other.name}</div>
                  <TypeTag type={r.type} label={r.label} />
                  <MiniBar label="trust" value={frame.trust} />
                  <MiniBar label="affection" value={frame.affection} />
                  <MiniBar label="power" value={frame.power} />
                  <MiniBar label="tension" value={frame.tension} />
                </button>
              );
            })}
          </div>
        )
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 68,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(600px, 80vw)',
          color: theme.text,
          fontFamily: theme.fontUI,
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8, fontFamily: theme.fontDisplay, fontSize: 18, color: theme.accent, letterSpacing: 0.5 }}>
          Season {t.toFixed(1)}
        </div>
        <input
          type="range"
          min={1}
          max={seasonCount}
          step={0.02}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: theme.textFaint, marginTop: 6 }}>
          {Array.from({ length: seasonCount }, (_, i) => (
            <span key={i}>S{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  color: theme.textMuted,
  cursor: 'pointer',
  marginBottom: 12,
  fontFamily: theme.fontUI,
  fontSize: 12,
  padding: 0,
};

function TypeTag({ type, label }: { type: Relationship['type']; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: theme.textMuted, marginBottom: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: RELATIONSHIP_TYPE_COLOR[type], flexShrink: 0 }} />
      <span>
        {label} <span style={{ color: theme.textFaint }}>· {RELATIONSHIP_TYPE_LABEL[type]}</span>
      </span>
    </div>
  );
}

function RelationshipPanel({
  rel,
  frame,
  characters,
  photos,
  onBack,
  onClose,
}: {
  rel: Relationship;
  frame: ReturnType<typeof frameAt>;
  characters: Character[];
  photos: Record<string, string | null>;
  onBack?: () => void;
  onClose: () => void;
}) {
  const source = characters.find((c) => c.id === rel.source)!;
  const target = characters.find((c) => c.id === rel.target)!;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 300,
        zIndex: 950,
        background: theme.panel,
        backdropFilter: 'blur(10px)',
        color: theme.text,
        padding: 20,
        fontFamily: theme.fontUI,
        overflowY: 'auto',
        borderLeft: `1px solid ${theme.panelBorder}`,
        boxShadow: '-16px 0 40px rgba(0,0,0,0.4)',
      }}
    >
      <button onClick={onBack ?? onClose} style={closeButtonStyle}>
        {onBack ? '← back' : '✕ close'}
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <svg width={40} height={40}>
          <g transform="translate(20,20)">
            <CharacterAvatar character={source} radius={20} photoUrl={photos[source.id]} />
          </g>
        </svg>
        <span style={{ color: theme.textFaint }}>—</span>
        <svg width={40} height={40}>
          <g transform="translate(20,20)">
            <CharacterAvatar character={target} radius={20} photoUrl={photos[target.id]} />
          </g>
        </svg>
      </div>
      <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
        {source.name.split(' ')[0]} &amp; {target.name.split(' ')[0]}
      </div>
      <h2 style={{ margin: '0 0 8px', fontFamily: theme.fontDisplay, fontWeight: 600, fontSize: 22 }}>{rel.label}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: theme.textMuted, marginBottom: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: RELATIONSHIP_TYPE_COLOR[rel.type] }} />
        {RELATIONSHIP_TYPE_LABEL[rel.type]}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: theme.text, opacity: 0.9, marginBottom: 20 }}>{rel.summary}</p>
      <MiniBar label="trust" value={frame.trust} />
      <MiniBar label="affection" value={frame.affection} />
      <MiniBar label="power" value={frame.power} />
      <MiniBar label="tension" value={frame.tension} />
    </div>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
      <span style={{ width: 56, fontSize: 10, color: theme.textMuted }}>{label}</span>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${theme.accent}, #e8c887)`,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
