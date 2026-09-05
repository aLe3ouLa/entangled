import { useEffect, useState } from "react";
import { Pill } from "./components/Pill";
import { FamilyTreeView } from "./FamilyTree";
import { RelationshipMap } from "./features/RelationshipMap";
import { SERIES } from "./data/series";
import { theme } from "./lib/theme";

type View = "relationships" | "family-tree";

function initialSeriesId(): string {
  const param = new URLSearchParams(window.location.search).get("series");
  return SERIES.some((s) => s.id === param) ? param! : SERIES[0].id;
}

function initialView(): View {
  return new URLSearchParams(window.location.search).get("view") ===
    "family-tree"
    ? "family-tree"
    : "relationships";
}

export default function App() {
  const [seriesId, setSeriesId] = useState(initialSeriesId);
  const [view, setView] = useState<View>(initialView);
  const series = SERIES.find((s) => s.id === seriesId)!;

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("series", seriesId);
    url.searchParams.set("view", view);
    window.history.replaceState(null, "", url);
  }, [seriesId, view]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          display: "flex",
          gap: 8,
          zIndex: 1000,
        }}
      >
        {SERIES.map((s) => (
          <Pill
            key={s.id}
            active={s.id === seriesId}
            onClick={() => setSeriesId(s.id)}
          >
            {s.title}
          </Pill>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: "flex",
          gap: 8,
          zIndex: 1000,
        }}
      >
        {(
          [
            ["relationships", "Relationships"],
            ["family-tree", "Family Tree"],
          ] as const
        ).map(([key, label]) => (
          <Pill key={key} active={view === key} onClick={() => setView(key)}>
            {label}
          </Pill>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: theme.bgVignette,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {view === "relationships" ? (
        <RelationshipMap key={series.id} series={series} />
      ) : (
        <FamilyTreeView key={series.id} series={series} />
      )}
    </>
  );
}
