/**
 * Slide 27's own drawings beside the track's (parts-track.tsx): a leader
 * from a marker to its entry, and an entry of the key under the track. Script-free: every word is
 * passed in. SVG for the plane's marks (ready.css paints them).
 */
"use client";

import type { Point } from "@/components/deck/kit";
import { Words } from "./parts";

/** A leader: a thin rule through its points, drawn on from the marker's end (`draw`). */
export function Leader({ id, points }: { id: string; points: readonly Point[] }) {
  return <path className="rd-leader dk-draw" data-build={id} d={points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("")} pathLength={1} />;
}

/** An entry of the key under the track: its name in navy and its caption under the name in the secondary grey, both at the key's size. */
export function KeyEntry({ id, name, caption }: { id: string; name: { text: string; at: Point }; caption: { text: string; at: Point } }) {
  return (
    <g data-build={id}>
      <Words at={name.at} text={name.text} anchor="start" strong small />
      <Words at={caption.at} text={caption.text} anchor="start" tone="soft" small />
    </g>
  );
}
