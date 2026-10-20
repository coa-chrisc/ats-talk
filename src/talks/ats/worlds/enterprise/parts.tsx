/**
 * The enterprise world's plainest pieces: a picture's HTML as one part, its
 * story lines, a word set in the marks, a run of words set in HTML that
 * may wrap inside its box, a large figure on one baseline or on two, a
 * straight stroke, a bracket, a column, a part of a bar, a stop on a ring,
 * a desk, a card and a rule. Every word set here is passed in from a
 * layout, which reads it from the script. Painted by enterprise.css.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES, type FigureRun } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="en-layer" data-build={id}>
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
  /** Navy for a name; slate for a caption under one; indigo for a measure from outside. */
  tone?: "paper" | "soft" | "catalog";
};

/** A word on the stage. */
export function Words({ id, at, text, anchor = "middle", size = "label", strong = false, tone = "paper" }: WordsProps) {
  const className = `${size === "text" ? "dk-text" : "dk-label"} en-word${strong ? " en-word--strong" : ""} en-word--${tone}`;
  return (
    <text className={className} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

type NoteProps = {
  id: string;
  at: Box;
  /** The 26 px label, the 32 px text, the 24 px tag or the 48 px name. */
  size?: "label" | "text" | "tag" | "name";
  align?: "start" | "center";
  strong?: boolean;
  className?: string;
  children: ReactNode;
};

/** Words in HTML, wrapping inside their box, in navy, their lines balanced. */
export function Note({ id, at, size = "label", align = "start", strong = false, className, children }: NoteProps) {
  const classes = ["en-note", `en-note--${size}`, align === "center" ? "en-note--center" : "", strong ? "en-note--strong" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} data-build={id} style={{ left: at.x, top: at.y, width: at.w, height: at.h }}>
      {children}
    </div>
  );
}

/**
 * A large figure in indigo (evidence from outside): the number at `size`,
 * the words round it at `small`. On one baseline from `at`, or with `second`
 * given, its first run on the first baseline and the number and what
 * follows on the second. It rises as one part.
 */
export function Figure({ id, at, second, runs, size, small }: { id: string; at: Point; second?: Point; runs: readonly FigureRun[]; size: number; small: number }) {
  return (
    <text className="en-figure" data-build={id} x={at.x} y={at.y}>
      {runs.map((run, i) => (
        <tspan
          key={i}
          className={run.big ? "en-figure__number" : "en-figure__words"}
          style={{ fontSize: run.big ? size : small }}
          {...(second && run.big ? { x: second.x, y: second.y } : {})}
        >
          {run.text}
        </tspan>
      ))}
    </text>
  );
}

/** A straight stroke that draws on from its first point (`draw`). */
export function Stroke({ id, from, to, className }: { id: string; from: Point; to: Point; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** A bracket under a span: a rule with its ends rising `drop` px (`draw`). */
export function Bracket({ id, x0, x1, y, drop }: { id: string; x0: number; x1: number; y: number; drop: number }) {
  return <path className="en-bracket dk-draw" data-build={id} d={`M${x0} ${y - drop}V${y}H${x1}V${y - drop}`} pathLength={1} />;
}

/** A column standing on its foot, in indigo: it rises from its foot as it fills (`--k`, 0 none of it, 1 all of it). */
export function Column({ id, at }: { id: string; at: Box }) {
  return <rect className="en-column" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} />;
}

/** The outline of a bar, drawn on round its edge (`draw`). */
export function Outline({ id, at, className }: { id: string; at: Box; className: string }) {
  return <rect className={`${className} dk-draw`} data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} pathLength={1} />;
}

/** A part of a bar, filling from its left edge (`--k`): green where it is the company's own, indigo otherwise. */
export function BarPart({ id, at, own }: { id: string; at: Box; own: boolean }) {
  return <rect className={`en-part en-part--${own ? "own" : "bought"}`} data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} />;
}

/** A ring drawn on clockwise from its top (`draw`). */
export function Ring({ id, at, r }: { id: string; at: Point; r: number }) {
  return <path className="en-loop dk-draw" data-build={id} d={`M${at.x} ${at.y - r}A${r} ${r} 0 1 1 ${at.x} ${at.y + r}A${r} ${r} 0 1 1 ${at.x} ${at.y - r}`} pathLength={1} />;
}

/** A stop on the ring: a white ring in navy that lights green (`--k`, 0 unlit, 1 lit). */
export function Stop({ id, at, r }: { id: string; at: Point; r: number }) {
  return (
    <g className="en-stop" data-build={id}>
      <circle className="en-stop__ring" cx={at.x} cy={at.y} r={r} />
      <circle className="en-stop__lit" cx={at.x} cy={at.y} r={r} />
    </g>
  );
}

/** A desk: its top and two legs, in navy, drawn on as one line (`draw`). */
export function Desk({ id, x0, x1, y, legs, inset }: { id: string; x0: number; x1: number; y: number; legs: number; inset: number }) {
  return <path className="en-desk dk-draw" data-build={id} d={`M${x0 + inset} ${y + legs}V${y}H${x0}M${x0} ${y}H${x1}M${x1 - inset} ${y}V${y + legs}`} pathLength={1} />;
}

/** A plain card: a square-cornered white face in navy with a grey band across its top. */
export function Card({ id, at, band }: { id: string; at: Box; band: Box }) {
  return (
    <g className="en-card" data-build={id}>
      <rect className="en-card__face" x={at.x} y={at.y} width={at.w} height={at.h} />
      <rect className="en-card__band" x={band.x} y={band.y} width={band.w} height={band.h} />
    </g>
  );
}
