/**
 * The stand world's plainest pieces: a picture's HTML as one part, its
 * story lines, a word set on the stage, a large figure, a tag, and slide
 * 1's centred type and short rule. Every word set here is passed in from a
 * layout, which reads it from the script. Painted by stand.css.
 */
"use client";

import type { ReactNode } from "react";
import { STAGE, Story, place, type Box, type Point } from "@/components/deck/kit";
import { STORIES, TAG, holeOf, type FigureRun } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="sd-layer" data-build={id}>
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
  const className = `${size === "text" ? "dk-text" : "dk-label"} sd-word${strong ? " sd-word--strong" : ""}${soft ? " sd-word--soft" : ""}`;
  return (
    <text className={className} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/**
 * A large figure on its baseline: the number at `size`, the words round it
 * at `small`, in indigo (evidence from outside) or grey (a problem). It
 * rises as one part.
 */
export function Figure({ id, at, runs, size, small, tone, anchor = "start" }: { id: string; at: Point; runs: readonly FigureRun[]; size: number; small: number; tone: "catalog" | "grey"; anchor?: "start" | "end" }) {
  return (
    <text className={`sd-figure sd-figure--${tone}`} data-build={id} x={at.x} y={at.y} textAnchor={anchor}>
      {runs.map((run, i) => (
        <tspan key={i} className={run.big ? "sd-figure__number" : "sd-figure__words"} style={{ fontSize: run.big ? size : small }}>
          {run.text}
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
 * (white, navy edge). It drops in about its hole (`--s`, `y`).
 */
export function Tagged({ id, at, text, tone }: { id: string; at: Box; text: string; tone: "grey" | "plain" }) {
  const hole = holeOf(at);
  return (
    <g data-build={id} className="dk-move" style={{ transformOrigin: `${hole.x}px ${hole.y}px` }}>
      <path className={`sd-tag sd-tag--${tone}`} d={tagPath(at)} />
      <circle className={`sd-tag__hole sd-tag__hole--${tone}`} cx={hole.x} cy={hole.y} r={4} />
      <text className="dk-label sd-word" x={at.x + TAG.point + TAG.gap} y={at.y + at.h / 2} dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** Lines of type centred across the stage, each in a mask it rises out of (`lines`, `tell`), as a SetText's are. Slide 1's title and story lines. */
export function Centred({ id, y, lines, size }: { id: string; y: number; lines: readonly string[]; size: "display" | "lead" | "credit" }) {
  const kit = size === "display" ? "dk-set--display" : "dk-set--text";
  return (
    <p className={`dk-set ${kit} sd-centred sd-centred--${size}`} style={{ left: 0, top: y, width: STAGE.w }}>
      {lines.map((line, i) => (
        <span key={i} className="dk-set__mask">
          <span className="dk-set__line" data-build={id}>
            {line}
          </span>
        </span>
      ))}
    </p>
  );
}

/** Slide 1's short rule under the title, in the process's green: it grows out from its middle (`scaleX`). */
export function TitleRule({ id, at }: { id: string; at: Box }) {
  return <div className="sd-rule" data-build={id} style={place(at)} />;
}

/** A straight stroke that draws on from its first point (`draw`). */
export function Stroke({ id, from, to, className }: { id: string; from: Point; to: Point; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}
