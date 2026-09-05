import { useMemo, useState } from 'react';
import { characters, relationships } from '../data/got';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { TypeLegend } from '../components/TypeLegend';
import { useForceGraph } from '../lib/forceLayout';
import { edgeColor, edgeDistance, edgeOpacity, edgeWidth, nodeRadius } from '../lib/encode';
import { discreteFrame, discreteValue, isAlive, SEASON_COUNT } from '../lib/timeline';
import { useWindowSize } from '../lib/useWindowSize';

const RAIL_WIDTH = 260;
const nodeIds = characters.map((c) => c.id);
const linkDefs = relationships.map((r) => ({ id: r.id, source: r.source, target: r.target }));

/**
 * Variant B — a season rail on the right you click through (no dragging),
 * each jump surfaces a "what changed" delta feed instead of just settling
 * into the new state silently.
 */
export function VariantB() {
  const winSize = useWindowSize();
  const size = { width: Math.max(winSize.width - RAIL_WIDTH, 300), height: winSize.height };
  const [season, setSeason] = useState(1);
  const [prevSeason, setPrevSeason] = useState(1);

  const frames = useMemo(() => {
    const map: Record<string, ReturnType<typeof discreteFrame>> = {};
    for (const r of relationships) map[r.id] = discreteFrame(r.seasons, season);
    return map;
  }, [season]);

  const prevFrames = useMemo(() => {
    const map: Record<string, ReturnType<typeof discreteFrame>> = {};
    for (const r of relationships) map[r.id] = discreteFrame(r.seasons, prevSeason);
    return map;
  }, [prevSeason]);

  const distances = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of relationships) map[r.id] = edgeDistance(frames[r.id]);
    return map;
  }, [frames]);

  const positions = useForceGraph(nodeIds, linkDefs, distances, size);

  const deltas = useMemo(() => {
    if (season === prevSeason) return [];
    return relationships
      .map((r) => {
        const a = prevFrames[r.id];
        const b = frames[r.id];
        const magnitude = Math.abs(b.trust - a.trust) + Math.abs(b.affection - a.affection) + Math.abs(b.tension - a.tension);
        return { rel: r, from: a, to: b, magnitude };
      })
      .filter((d) => d.magnitude > 8)
      .sort((x, y) => y.magnitude - x.magnitude)
      .slice(0, 3);
  }, [frames, prevFrames, season, prevSeason]);

  function goTo(next: number) {
    setPrevSeason(season);
    setSeason(next);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0b0f14', display: 'flex' }}>
      <svg width={size.width} height={size.height}>
        {relationships.map((r) => {
          const a = positions[r.source];
          const b = positions[r.target];
          if (!a || !b) return null;
          const frame = frames[r.id];
          return (
            <line
              key={r.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeLinecap="round"
              style={{
                stroke: edgeColor(r.type),
                strokeWidth: edgeWidth(frame),
                opacity: edgeOpacity(frame),
                transition: 'stroke 0.6s ease, stroke-width 0.6s ease, opacity 0.6s ease',
              }}
            />
          );
        })}
        {characters.map((c) => {
          const p = positions[c.id];
          if (!p) return null;
          const alive = isAlive(c.aliveUntil, season);
          const radius = nodeRadius(discreteValue(c.prominence, season));
          return (
            <g key={c.id} transform={`translate(${p.x},${p.y})`} opacity={alive ? 1 : 0.25}>
              <CharacterAvatar character={c} radius={radius} />
              <text y={radius + 14} textAnchor="middle" fill="#e5e7eb" fontSize={11} fontFamily="system-ui, sans-serif">
                {c.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <TypeLegend style={{ top: 'auto', bottom: 16, right: RAIL_WIDTH + 16 }} />

      <div
        style={{
          width: RAIL_WIDTH,
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          color: '#e5e7eb',
          fontFamily: 'system-ui, sans-serif',
          padding: '20px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>Click a season to jump.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
          {Array.from({ length: SEASON_COUNT }, (_, i) => i + 1).map((s) => (
            <button
              key={s}
              onClick={() => goTo(s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 4px',
                color: 'inherit',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: s === season ? '#60a5fa' : 'rgba(255,255,255,0.2)',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, opacity: s === season ? 1 : 0.6 }}>Season {s}</span>
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.5, marginBottom: 8 }}>
          What changed
        </div>
        {deltas.length === 0 && <div style={{ fontSize: 12, opacity: 0.4 }}>No major shifts.</div>}
        {deltas.map(({ rel, from, to }) => {
          const source = characters.find((c) => c.id === rel.source)!;
          const target = characters.find((c) => c.id === rel.target)!;
          const trustUp = to.trust >= from.trust;
          const affUp = to.affection >= from.affection;
          const tensionUp = to.tension >= from.tension;
          return (
            <div key={rel.id} style={{ fontSize: 12, marginBottom: 10, lineHeight: 1.5 }}>
              <div style={{ opacity: 0.85 }}>
                {source.name.split(' ')[0]} → {target.name.split(' ')[0]}
              </div>
              <div style={{ opacity: 0.5, fontStyle: 'italic', marginBottom: 2 }}>{rel.label}</div>
              <div style={{ opacity: 0.55 }}>
                trust {from.trust}→{to.trust} <span style={{ color: trustUp ? '#4ade80' : '#f87171' }}>{trustUp ? '▲' : '▼'}</span>
                {'  '}affection {from.affection}→{to.affection}{' '}
                <span style={{ color: affUp ? '#4ade80' : '#f87171' }}>{affUp ? '▲' : '▼'}</span>
                {'  '}tension {from.tension}→{to.tension}{' '}
                <span style={{ color: tensionUp ? '#f87171' : '#4ade80' }}>{tensionUp ? '▲' : '▼'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
