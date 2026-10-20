/**
 * The method world's plainest pieces: a picture's HTML as one part, its
 * story lines, and a word set on the stage in navy. Every word set here is
 * passed in from a layout, which reads it from the script.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Point } from "@/components/deck/kit";
import { STORIES } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="method-layer" data-build={id}>
      {children}
    </div>
  );
}

/** A picture's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

type WordsProps = {
  id?: string;
  at: Point;
  text: string;
  anchor?: "start" | "middle" | "end";
  /** The 26 px label type, or the 32 px text. */
  size?: "label" | "text";
  strong?: boolean;
  /** Degrees to turn the words about their place: a chart's side. Turned words sit in a group, so a move's `y` never fights the turn. */
  turn?: number;
};

/** A word on the stage, in navy, as every word on these slides is. */
export function Words({ id, at, text, anchor = "middle", size = "label", strong = false, turn }: WordsProps) {
  const className = `${size === "text" ? "dk-text" : "dk-label"} method-word${strong ? " method-word--strong" : ""}`;
  if (turn) {
    return (
      <g data-build={id}>
        <text className={className} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central" transform={`rotate(${turn} ${at.x} ${at.y})`}>
          {text}
        </text>
      </g>
    );
  }
  return (
    <text className={className} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}
