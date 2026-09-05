import { useState } from 'react';
import { FamilyTreeView } from './FamilyTree';
import { RelationshipMap } from './RelationshipMap';
import { SERIES } from './data/series';

type View = 'relationships' | 'family-tree';

export default function App() {
  const [seriesId, setSeriesId] = useState(SERIES[0].id);
  const [view, setView] = useState<View>('relationships');
  const series = SERIES.find((s) => s.id === seriesId)!;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          display: 'flex',
          gap: 8,
          zIndex: 1000,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {SERIES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeriesId(s.id)}
            style={{
              background: s.id === seriesId ? '#1f2937' : 'rgba(17,24,39,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999,
              padding: '6px 14px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: 12,
              opacity: s.id === seriesId ? 1 : 0.6,
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 8,
          zIndex: 1000,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {([
          ['relationships', 'Relationships'],
          ['family-tree', 'Family Tree'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            style={{
              background: view === key ? '#1f2937' : 'rgba(17,24,39,0.7)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 999,
              padding: '6px 14px',
              color: '#e5e7eb',
              cursor: 'pointer',
              fontSize: 12,
              opacity: view === key ? 1 : 0.6,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* key remounts on series/view switch so force-sim and measured-layout state never leak across shows */}
      {view === 'relationships' ? (
        <RelationshipMap key={series.id} series={series} />
      ) : (
        <FamilyTreeView key={series.id} series={series} />
      )}
    </>
  );
}
