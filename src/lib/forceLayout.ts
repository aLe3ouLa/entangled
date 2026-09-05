import { useEffect, useRef, useState } from 'react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type ForceLink,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force';

interface SimNode extends SimulationNodeDatum {
  id: string;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  id: string;
}

export interface LinkDef {
  id: string;
  source: string;
  target: string;
}

export type Positions = Record<string, { x: number; y: number }>;

/**
 * Shared physics engine for the graph variants. Node positions settle from a
 * force simulation whose per-link distance is recomputed by the caller (e.g.
 * from trust/affection at the current season) — when `distances` changes
 * identity, the simulation reheats and nodes drift to their new spots instead
 * of jumping.
 */
export function useForceGraph(
  nodeIds: string[],
  linkDefs: LinkDef[],
  distances: Record<string, number>,
  size: { width: number; height: number },
) {
  const [positions, setPositions] = useState<Positions>({});
  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null);

  useEffect(() => {
    const nodes: SimNode[] = nodeIds.map((id, i) => ({
      id,
      x: size.width / 2 + Math.cos((i / nodeIds.length) * 2 * Math.PI) * 150,
      y: size.height / 2 + Math.sin((i / nodeIds.length) * 2 * Math.PI) * 150,
    }));
    const links: SimLink[] = linkDefs.map((l) => ({ id: l.id, source: l.source, target: l.target }));

    const linkForce = forceLink<SimNode, SimLink>(links)
      .id((d) => d.id)
      .distance((d) => distances[d.id] ?? 150)
      .strength(0.7);

    const sim = forceSimulation(nodes)
      .force('link', linkForce)
      .force('charge', forceManyBody().strength(-220))
      .force('center', forceCenter(size.width / 2, size.height / 2))
      .force('collide', forceCollide(34))
      .on('tick', () => {
        const next: Positions = {};
        for (const n of nodes) next[n.id] = { x: n.x ?? 0, y: n.y ?? 0 };
        setPositions(next);
      });

    simRef.current = sim;
    return () => {
      sim.stop();
    };
    // re-init only when the graph shape or canvas size changes, not on every distance tweak
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeIds.join(','), linkDefs.map((l) => l.id).join(','), size.width, size.height]);

  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    const linkForce = sim.force<ForceLink<SimNode, SimLink>>('link');
    if (linkForce) {
      linkForce.distance((d) => distances[d.id] ?? 150);
    }
    sim.alpha(0.5).restart();
  }, [distances]);

  return positions;
}
