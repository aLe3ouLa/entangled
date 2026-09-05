import { useEffect, useState } from 'react';
import { PrototypeSwitcher, type VariantMeta } from './components/PrototypeSwitcher';
import { VariantA } from './variants/VariantA';
import { VariantB } from './variants/VariantB';
import { VariantC } from './variants/VariantC';

// PROTOTYPE — throwaway UI comparison for the "series tension map" idea.
// Three variants, switchable via ?variant=A|B|C, see README for context.
const VARIANTS: VariantMeta[] = [
  { key: 'A', label: 'Continuous scrubber' },
  { key: 'B', label: 'Season rail + diff feed' },
  { key: 'C', label: 'Character-first + filmstrip' },
];

function getVariantFromUrl(): string {
  const v = new URLSearchParams(window.location.search).get('variant');
  return VARIANTS.some((m) => m.key === v) ? (v as string) : 'A';
}

export default function App() {
  const [variant, setVariant] = useState(getVariantFromUrl);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant);
    window.history.replaceState(null, '', url);
  }, [variant]);

  return (
    <>
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      <PrototypeSwitcher variants={VARIANTS} current={variant} onChange={setVariant} />
    </>
  );
}
