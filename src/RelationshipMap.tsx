import { useRef, useState } from "react";
import { CharacterAvatar } from "./components/CharacterAvatar";
import { TypeLegend } from "./components/TypeLegend";
import { ZoomControls } from "./components/ZoomControls";
import { edgeColor, edgeDash, edgeOpacity, edgeWidth, nodeRadius } from "./lib/encode";
import { usePanZoom } from "./lib/usePanZoom";
import { RELATIONSHIP_TYPE_LABEL } from "./lib/relationshipType";
import { theme } from "./lib/theme";
import { isAlive, typeAt, valueAt } from "./lib/timeline";
import { useSeriesCast } from "./lib/useSeriesCast";
import { useWindowSize } from "./lib/useWindowSize";
import type { Series } from "./types";
import { CharacterPanel } from "./features/RelationshipMap/CharacterPanel";
import { PulseRing } from "./features/RelationshipMap/PulseRing";
import { RelationshipPanel } from "./features/RelationshipMap/RelationshipPanel";
import { useRelationshipMapState } from "./features/RelationshipMap/useRelationshipMapState";

/**
 * One big force graph with a bottom scrubber you drag continuously across
 * a series' seasons — edges morph smoothly instead of jumping between states.
 */
export function RelationshipMap({ series }: { series: Series }) {
  const { characters, relationships, seasonCount } = series;
  const size = useWindowSize();
  const [t, setT] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const { photos, loading: photosLoading } = useSeriesCast(series);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { transform, zoomIn, zoomOut, reset: resetZoom } = usePanZoom(svgRef);

  const {
    positions,
    presentIds,
    relatedIds,
    frames,
    selected,
    selectedRel,
    selectedChar,
    selectedCharAlive,
    selectedCharProminence,
    selectedRelRows,
    relDetail,
    relDetailFrame,
    relDetailType,
    openCharacter,
    openRelationship,
    closeCharacterPanel,
    closeRelationshipPanel,
    closeAllPanels,
  } = useRelationshipMapState(series, t, size);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: theme.bg,
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width={size.width}
        height={size.height}
        style={{ cursor: "grab" }}
      >
        <defs>
          <filter id="edge-glow" x="-75%" y="-75%" width="250%" height="250%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}
        >
          {relationships.map((r) => {
            if (!presentIds.has(r.source) || !presentIds.has(r.target))
              return null;
            const a = positions[r.source];
            const b = positions[r.target];
            if (!a || !b) return null;
            const frame = frames[r.id];
            const currentType = typeAt(r, t);
            const isSelected = selectedRel === r.id;
            const touchesSelected =
              !relatedIds || r.source === selected || r.target === selected;
            const labelOpacity =
              (isSelected ? 1 : 0.85) * (touchesSelected ? 1 : 0.12);
            return (
              <g key={r.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={edgeColor(currentType)}
                  strokeWidth={
                    isSelected ? edgeWidth(frame) + 2.5 : edgeWidth(frame)
                  }
                  strokeOpacity={
                    (isSelected ? 1 : edgeOpacity(frame)) *
                    (touchesSelected ? 1 : 0.12)
                  }
                  strokeDasharray={edgeDash(frame)}
                  strokeLinecap="round"
                  filter={isSelected ? "url(#edge-glow)" : undefined}
                  onClick={() => openRelationship(r.id)}
                  style={{
                    cursor: "pointer",
                    transition:
                      "stroke-width 0.15s ease, stroke-opacity 0.2s ease",
                  }}
                />
                <text
                  x={(a.x + b.x) / 2}
                  y={(a.y + b.y) / 2 - 5}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily={theme.fontUI}
                  fontWeight={600}
                  letterSpacing={0.4}
                  fill={edgeColor(currentType)}
                  stroke={theme.bg}
                  strokeWidth={3}
                  paintOrder="stroke"
                  opacity={labelOpacity}
                  onClick={() => openRelationship(r.id)}
                  style={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {RELATIONSHIP_TYPE_LABEL[currentType]}
                </text>
              </g>
            );
          })}
          {characters.map((c) => {
            if (!presentIds.has(c.id)) return null;
            const p = positions[c.id];
            if (!p) return null;
            const alive = isAlive(c.aliveUntil, t);
            const isSelected = selected === c.id;
            const isHovered = hovered === c.id;
            const isRelated = !relatedIds || relatedIds.has(c.id);
            const radius =
              nodeRadius(valueAt(c.prominence, t)) + (isSelected ? 4 : 0);
            return (
              <g
                key={c.id}
                transform={`translate(${p.x},${p.y})`}
                onClick={() => openCharacter(c.id)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered((h) => (h === c.id ? null : h))}
                style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
                opacity={(alive ? 1 : 0.25) * (isRelated ? 1 : 0.18)}
              >
                {isSelected && (
                  <PulseRing
                    radius={radius}
                    amplitude={24}
                    duration="1.8s"
                    peakOpacity={0.6}
                  />
                )}
                {!isSelected && isHovered && (
                  <PulseRing
                    radius={radius}
                    amplitude={12}
                    duration="1.2s"
                    peakOpacity={0.35}
                  />
                )}
                <CharacterAvatar
                  character={c}
                  radius={radius}
                  highlight={isSelected}
                  photoUrl={photos[c.id]}
                />
                <text
                  y={radius + 15}
                  textAnchor="middle"
                  fill={theme.text}
                  fontSize={11}
                  fontFamily={theme.fontUI}
                  fontWeight={500}
                >
                  {c.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <ZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetZoom} />

      <div style={{ position: "fixed", top: 20, left: 24, maxWidth: 340 }}>
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
            marginTop: 12,
            background: theme.panel,
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.panelBorder}`,
            borderRadius: 10,
            padding: "14px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              color: theme.accent,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              marginBottom: 6,
              fontFamily: theme.fontUI,
            }}
          >
            Season {Math.round(t)}
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: theme.fontDisplay,
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.55,
              color: theme.text,
              opacity: 0.92,
            }}
          >
            {series.seasonSynopses[Math.round(t) - 1]}
          </p>
        </div>
        {photosLoading && (
          <div
            style={{
              marginTop: 8,
              color: theme.textFaint,
              fontFamily: theme.fontUI,
              fontSize: 11,
            }}
          >
            Loading cast photos…
          </div>
        )}
      </div>

      <TypeLegend />

      {relDetail && relDetailFrame && relDetailType ? (
        <RelationshipPanel
          rel={relDetail}
          frame={relDetailFrame}
          type={relDetailType}
          characters={characters}
          photos={photos}
          onBack={selected ? closeRelationshipPanel : undefined}
          onClose={closeAllPanels}
        />
      ) : (
        selectedChar && (
          <CharacterPanel
            character={selectedChar}
            alive={selectedCharAlive}
            prominence={selectedCharProminence}
            rows={selectedRelRows}
            photos={photos}
            onSelectRelationship={openRelationship}
            onClose={closeCharacterPanel}
          />
        )
      )}

      <div
        style={{
          position: "fixed",
          bottom: 68,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(600px, 80vw)",
          color: theme.text,
          fontFamily: theme.fontUI,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontFamily: theme.fontDisplay,
            fontSize: 18,
            color: theme.accent,
            letterSpacing: 0.5,
          }}
        >
          Season {t.toFixed(1)}
        </div>
        <input
          type="range"
          min={1}
          max={seasonCount}
          step={0.02}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.textFaint,
            marginTop: 6,
          }}
        >
          {Array.from({ length: seasonCount }, (_, i) => (
            <span key={i}>S{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
