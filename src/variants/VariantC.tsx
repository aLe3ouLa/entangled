import { useMemo, useState } from 'react';
import { characters, relationships } from '../data/got';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { TypeLegend } from '../components/TypeLegend';
import { edgeColor, edgeDistance, edgeOpacity, edgeWidth, nodeRadius } from '../lib/encode';
import { RELATIONSHIP_TYPE_COLOR, RELATIONSHIP_TYPE_LABEL } from '../lib/relationshipType';
import { discreteFrame, discreteValue, isAlive, SEASON_COUNT } from '../lib/timeline';
import type { RelationshipFrame } from '../types';

const CENTER = 300;

interface Neighbor {
  charId: string;
  relId: string;
  angle: number;
}

function neighborsOf(charId: string): Neighbor[] {
  const rels = relationships.filter((r) => r.source === charId || r.target === charId);
  return rels.map((r, i) => ({
    charId: r.source === charId ? r.target : r.source,
    relId: r.id,
    angle: (i / rels.length) * Math.PI * 2 - Math.PI / 2,
  }));
}

/**
 * Variant C — pick a character first, see only *their* relationships as a
 * radial ego-network, and scrub seasons via a filmstrip of thumbnails
 * instead of a slider or list. No whole-cast force layout at all.
 */
export function VariantC() {
  const [selectedId, setSelectedId] = useState('jon');
  const [season, setSeason] = useState(1);
  const [hoverSeason, setHoverSeason] = useState<number | null>(null);
  const [focusRelId, setFocusRelId] = useState<string | null>(null);

  const activeSeason = hoverSeason ?? season;
  const neighbors = useMemo(() => neighborsOf(selectedId), [selectedId]);
  const selectedChar = characters.find((c) => c.id === selectedId)!;
  const focusRel = relationships.find((r) => r.id === focusRelId) ?? null;

  function frameFor(relId: string, s: number): RelationshipFrame {
    const rel = relationships.find((r) => r.id === relId)!;
    return discreteFrame(rel.seasons, s);
  }

  function selectCharacter(id: string) {
    setSelectedId(id);
    setFocusRelId(null);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b0f14', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          padding: '20px 24px 12px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {characters.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCharacter(c.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: c.id === selectedId ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999,
              padding: '5px 12px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: 12,
              opacity: isAlive(c.aliveUntil, activeSeason) ? 1 : 0.35,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <svg
          width={CENTER * 2}
          height={CENTER * 2}
          viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
          style={{ display: 'block', maxWidth: '70%', maxHeight: '100%' }}
        >
          {neighbors.map((n) => {
            const rel = relationships.find((r) => r.id === n.relId)!;
            const frame = frameFor(n.relId, activeSeason);
            const r = edgeDistance(frame);
            const x = CENTER + Math.cos(n.angle) * r;
            const y = CENTER + Math.sin(n.angle) * r;
            return (
              <line
                key={n.relId}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke={edgeColor(rel.type)}
                strokeWidth={focusRelId === n.relId ? edgeWidth(frame) + 3 : edgeWidth(frame)}
                strokeOpacity={focusRelId === n.relId ? 1 : edgeOpacity(frame)}
                strokeLinecap="round"
                onClick={() => setFocusRelId(focusRelId === n.relId ? null : n.relId)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
          {neighbors.map((n) => {
            const char = characters.find((c) => c.id === n.charId)!;
            const frame = frameFor(n.relId, activeSeason);
            const r = edgeDistance(frame);
            const x = CENTER + Math.cos(n.angle) * r;
            const y = CENTER + Math.sin(n.angle) * r;
            const alive = isAlive(char.aliveUntil, activeSeason);
            const radius = nodeRadius(discreteValue(char.prominence, activeSeason));
            return (
              <g
                key={n.charId}
                transform={`translate(${x},${y})`}
                opacity={alive ? 1 : 0.25}
                onClick={() => setFocusRelId(focusRelId === n.relId ? null : n.relId)}
                style={{ cursor: 'pointer' }}
              >
                <CharacterAvatar character={char} radius={radius} highlight={focusRelId === n.relId} />
                <text y={radius + 14} textAnchor="middle" fill="#e5e7eb" fontSize={11} fontFamily="system-ui, sans-serif">
                  {char.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
          <g opacity={isAlive(selectedChar.aliveUntil, activeSeason) ? 1 : 0.25}>
            <g transform={`translate(${CENTER},${CENTER})`}>
              <CharacterAvatar
                character={selectedChar}
                radius={nodeRadius(discreteValue(selectedChar.prominence, activeSeason)) + 4}
                highlight
              />
            </g>
            <text
              x={CENTER}
              y={CENTER + nodeRadius(discreteValue(selectedChar.prominence, activeSeason)) + 20}
              textAnchor="middle"
              fill="#f9fafb"
              fontSize={13}
              fontFamily="system-ui, sans-serif"
            >
              {selectedChar.name}
            </text>
          </g>
        </svg>

        {focusRel && (
          <RelationshipCard rel={focusRel} frame={frameFor(focusRel.id, activeSeason)} onClose={() => setFocusRelId(null)} />
        )}
      </div>

      <TypeLegend style={{ top: 'auto', bottom: 150 }} />

      <div style={{ padding: '12px 24px 24px' }}>
        <div style={{ color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Season {activeSeason} — hover a thumbnail to preview, click to jump. Click a neighbor for what the bond means.
          <br />
          Node size = how much the season is about them. Line width = tension.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: SEASON_COUNT }, (_, i) => i + 1).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              onMouseEnter={() => setHoverSeason(s)}
              onMouseLeave={() => setHoverSeason(null)}
              style={{
                background: 'none',
                border: s === season ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <Thumbnail neighbors={neighbors} selected={selectedChar} season={s} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelationshipCard({
  rel,
  frame,
  onClose,
}: {
  rel: (typeof relationships)[number];
  frame: RelationshipFrame;
  onClose: () => void;
}) {
  const source = characters.find((c) => c.id === rel.source)!;
  const target = characters.find((c) => c.id === rel.target)!;
  return (
    <div
      style={{
        width: 240,
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 16,
        color: '#e5e7eb',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', marginBottom: 8, padding: 0 }}
      >
        ✕ close
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <svg width={32} height={32}>
          <g transform="translate(16,16)">
            <CharacterAvatar character={source} radius={16} />
          </g>
        </svg>
        <span style={{ opacity: 0.4, fontSize: 12 }}>—</span>
        <svg width={32} height={32}>
          <g transform="translate(16,16)">
            <CharacterAvatar character={target} radius={16} />
          </g>
        </svg>
      </div>
      <h3 style={{ margin: '0 0 6px', fontSize: 14 }}>{rel.label}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, opacity: 0.7, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: RELATIONSHIP_TYPE_COLOR[rel.type] }} />
        {RELATIONSHIP_TYPE_LABEL[rel.type]}
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.8, marginBottom: 14 }}>{rel.summary}</p>
      <MiniBar label="trust" value={frame.trust} />
      <MiniBar label="affection" value={frame.affection} />
      <MiniBar label="power" value={frame.power} />
      <MiniBar label="tension" value={frame.tension} />
    </div>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
      <span style={{ width: 56, fontSize: 10, opacity: 0.6 }}>{label}</span>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
        <div style={{ width: `${value}%`, height: '100%', background: '#60a5fa', borderRadius: 2 }} />
      </div>
    </div>
  );
}

function Thumbnail({
  neighbors,
  selected,
  season,
}: {
  neighbors: Neighbor[];
  selected: (typeof characters)[number];
  season: number;
}) {
  const size = 64;
  const c = size / 2;
  return (
    <svg width={size} height={size}>
      {neighbors.map((n) => {
        const rel = relationships.find((r) => r.id === n.relId)!;
        const frame = discreteFrame(rel.seasons, season);
        const r = 8 + (edgeDistance(frame) / 260) * 18;
        const x = c + Math.cos(n.angle) * r;
        const y = c + Math.sin(n.angle) * r;
        return (
          <line
            key={n.relId}
            x1={c}
            y1={c}
            x2={x}
            y2={y}
            stroke={edgeColor(rel.type)}
            strokeWidth={1.5}
            strokeOpacity={edgeOpacity(frame)}
          />
        );
      })}
      {neighbors.map((n) => {
        const char = characters.find((cc) => cc.id === n.charId)!;
        const rel = relationships.find((r) => r.id === n.relId)!;
        const frame = discreteFrame(rel.seasons, season);
        const r = 8 + (edgeDistance(frame) / 260) * 18;
        const x = c + Math.cos(n.angle) * r;
        const y = c + Math.sin(n.angle) * r;
        return <circle key={n.charId} cx={x} cy={y} r={3.5} fill={char.color} />;
      })}
      <circle cx={c} cy={c} r={6} fill={selected.color} stroke="#f9fafb" strokeWidth={1.5} />
      <text x={c} y={size - 4} textAnchor="middle" fontSize={9} fill="#9ca3af" fontFamily="system-ui, sans-serif">
        S{season}
      </text>
    </svg>
  );
}
