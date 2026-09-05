/**
 * Real cast photos would be copyrighted press stills — not something to
 * bake into a throwaway prototype. DiceBear generates a stable, free,
 * procedural illustrated portrait per seed instead, so every character
 * gets a distinct "face" without touching real likenesses.
 */
export function avatarUrl(seed: string, backgroundColor: string): string {
  const bg = backgroundColor.replace('#', '');
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`;
}
