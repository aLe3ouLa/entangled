import { useState } from 'react';
import { RelationshipMap } from './RelationshipMap';
import { SERIES } from './data/series';

export default function App() {
  const [seriesId, setSeriesId] = useState(SERIES[0].id);
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
      {/* key remounts the whole map on series switch so force-sim state never leaks across shows */}
      <RelationshipMap key={series.id} series={series} />
    </>
  );
}
