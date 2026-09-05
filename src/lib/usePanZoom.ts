import { select } from 'd3-selection';
import 'd3-transition'; // augments Selection with .transition() — side-effect import only
import { zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from 'd3-zoom';
import { useEffect, useRef, useState, type RefObject } from 'react';

const SCALE_EXTENT: [number, number] = [0.3, 3];

/** Wheel-to-zoom, drag-to-pan on an <svg> — wraps d3-zoom so node clicks
 *  still fire normally (only drags beyond a small threshold pan). */
export function usePanZoom(svgRef: RefObject<SVGSVGElement | null>) {
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity);
  const behaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent(SCALE_EXTENT)
      .filter((event) => !event.button && event.type !== 'dblclick')
      .on('zoom', (event) => setTransform(event.transform));
    behaviorRef.current = behavior;
    const selection = select(svg);
    selection.call(behavior);
    return () => {
      selection.on('.zoom', null);
    };
  }, [svgRef]);

  function zoomBy(factor: number) {
    const svg = svgRef.current;
    if (!svg || !behaviorRef.current) return;
    select(svg).transition().duration(200).call(behaviorRef.current.scaleBy, factor);
  }

  function reset() {
    const svg = svgRef.current;
    if (!svg || !behaviorRef.current) return;
    select(svg).transition().duration(300).call(behaviorRef.current.transform, zoomIdentity);
  }

  return { transform, zoomIn: () => zoomBy(1.4), zoomOut: () => zoomBy(1 / 1.4), reset };
}
