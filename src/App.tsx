import { useEffect, useState } from "react";
import { Pill } from "./components/Pill";
import { SeriesMenu } from "./components/SeriesMenu";
import { FamilyTreeView } from "./features/FamilyTree";
import { RelationshipMap } from "./features/RelationshipMap";
import { SERIES } from "./data/series";

import styles from "./App.module.css";

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
      <div className={styles.seriesBar}>
        <SeriesMenu
          series={SERIES}
          activeId={seriesId}
          onSelect={setSeriesId}
        />
      </div>

      <div className={styles.viewBar}>
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

      <div className={styles.viewContainer} />

      {view === "relationships" ? (
        <RelationshipMap key={series.id} series={series} />
      ) : (
        <FamilyTreeView key={series.id} series={series} />
      )}
    </>
  );
}
