import { useState } from 'react';
import { Pill } from './components/Pill';
import { FamilyTreeView } from './FamilyTree';
import { RelationshipMap } from './RelationshipMap';
import { SERIES } from './data/series';
import { theme } from './lib/theme';

type View = 'relationships' | 'family-tree';

export default function App() {
  const [seriesId, setSeriesId] = useState(SERIES[0].id);
  const [view, setView] = useState<View>('relationships');
  const series = SERIES.find((s) => s.id === seriesId)!;

  return (
    <>
      <div style={{ position: 'fixed', bottom: 16, left: 16, display: 'flex', gap: 8, zIndex: 1000 }}>
        {SERIES.map((s) => (
          <Pill key={s.id} active={s.id === seriesId} onClick={() => setSeriesId(s.id)}>
            {s.title}
          </Pill>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', gap: 8, zIndex: 1000 }}>
        {(
          [
            ['relationships', 'Relationships'],
            ['family-tree', 'Family Tree'],
          ] as const
        ).map(([key, label]) => (
          <Pill key={key} active={view === key} onClick={() => setView(key)}>
            {label}
          </Pill>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.bgVignette,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* key remounts on series/view switch so force-sim and measured-layout state never leak across shows */}
      {view === 'relationships' ? (
        <RelationshipMap key={series.id} series={series} />
      ) : (
        <FamilyTreeView key={series.id} series={series} />
      )}
    </>
  );
}
