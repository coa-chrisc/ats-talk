/**
 * The stands world's plainest pieces: a picture's HTML as one part, its
 * story lines, a word set on the stage, a tag and a straight stroke. Every
 * word set here is passed in from a layout, which reads it from the script.
 * Painted by stands.css.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES, TAG, holeOf } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="sn-layer" data-build={id}>
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
  /** Navy for a name; slate for a caption under one. */
  soft?: boolean;
};

/** A word on the stage. */
export function Words({ id, at, text, anchor = "middle", size = "label", strong = false, soft = false }: WordsProps) {
  const className = `${size === "text" ? "dk-text" : "dk-label"} sn-word${strong ? " sn-word--strong" : ""}${soft ? " sn-word--soft" : ""}`;
  return (
    <text className={className} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** Words broken on several rows, one `<text>`: each row a run on its own baseline, a space kept at each break so the runs read as the one phrase. */
export function Rows({ id, at, rows, pitch, anchor = "start", size = "label", soft = false }: { id?: string; at: Point; rows: readonly string[]; pitch: number; anchor?: "start" | "middle"; size?: "label" | "text"; soft?: boolean }) {
  const className = `${size === "text" ? "dk-text" : "dk-label"} sn-word${soft ? " sn-word--soft" : ""}`;
  return (
    <text className={className} data-build={id} textAnchor={anchor} dominantBaseline="central">
      {rows.map((row, i) => (
        <tspan key={i} x={at.x} y={at.y + i * pitch}>
          {i < rows.length - 1 ? `${row} ` : row}
        </tspan>
      ))}
    </text>
  );
}

/** A tag's outline: a label with a pointed left end and rounded right corners. */
const tagPath = ({ x, y, w, h }: Box) => {
  const p = TAG.point;
  const r = 6;
  return `M${x} ${y + h / 2}L${x + p} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + p}Z`;
};

/**
 * A tag: a label with a pointed end and a hole, its words in navy. `grey`
 * is a problem or a blocker (raised grey, slate edge); `plain` is a fact
 * (white, navy edge). It drops in about its hole (`--s`, `--y`).
 */
export function Tagged({ id, at, text, tone }: { id: string; at: Box; text: string; tone: "grey" | "plain" }) {
  const hole = holeOf(at);
  return (
    <g data-build={id} className="dk-move" style={{ transformOrigin: `${hole.x}px ${hole.y}px` }}>
      <path className={`sn-tag sn-tag--${tone}`} d={tagPath(at)} />
      <circle className={`sn-tag__hole sn-tag__hole--${tone}`} cx={hole.x} cy={hole.y} r={4} />
      <text className="dk-label sn-word" x={at.x + TAG.point + TAG.gap} y={at.y + at.h / 2} dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** A straight stroke that draws on from its first point (`draw`). */
export function Stroke({ id, from, to, className }: { id: string; from: Point; to: Point; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}
