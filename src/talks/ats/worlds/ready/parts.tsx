/**
 * The ready world's plainest pieces: a slide's HTML as one part, its story
 * lines, a word on the stage, a person, an outlined box, a grey tag, a
 * nameplate. Each is SVG for the plane's
 * marks unless it says otherwise, takes an `id` a move can name, and is
 * moved with the house moves only: `draw` (`--d`), `fill` (`--k`), `show`,
 * `rise`, and `x`/`y` for travel. Every word is passed in from a layout,
 * which reads it from the script. Colours are in ready.css.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES, TAG } from "./layout";

/** A slide's HTML, gathered as one part. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="rd-layer" data-build={id}>
      {children}
    </div>
  );
}

/** A slide's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

type Tone = "navy" | "white" | "process" | "soft";

/** A few words, centred on `at` up and down: the 26 px label type or the 32 px text, in navy, white on a dark panel, the process's green or the secondary grey. */
export function Words({
  id,
  at,
  text,
  anchor = "middle",
  size = "label",
  tone = "navy",
  strong = false,
}: {
  id?: string;
  at: Point;
  text: string;
  anchor?: "start" | "middle" | "end";
  size?: "label" | "text";
  tone?: Tone;
  strong?: boolean;
}) {
  const kit = size === "text" ? "dk-text" : "dk-label";
  return (
    <text className={`${kit} rd-word rd-word--${tone}${strong ? " rd-word--strong" : ""}`} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** The kit's person (head and shoulders), stroked in navy. It draws on (`draw`) unless `drawn`, when it is whole and is shown. */
export function Figure({ id, at, drawn = false }: { id?: string; at: Box; drawn?: boolean }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.25;
  const head = at.y + r + 2;
  const top = head + r + at.h * 0.1;
  const bottom = at.y + at.h - 2;
  const line = drawn ? "rd-figure" : "rd-figure dk-draw";
  return (
    <g data-build={id}>
      <circle className={line} cx={cx} cy={head} r={r} pathLength={1} transform={`rotate(-90 ${cx} ${head})`} />
      <path className={line} d={`M${at.x + 2} ${bottom}V${top + at.w * 0.42}A${at.w / 2 - 2} ${at.w * 0.42} 0 0 1 ${at.x + at.w - 2} ${top + at.w * 0.42}V${bottom}`} pathLength={1} />
    </g>
  );
}

/** A box whose outline draws on (`draw`) and whose white ground comes in with it, so it hides what is behind it. */
export function Frame({ id, at, rx = 10, children }: { id: string; at: Box; rx?: number; children?: ReactNode }) {
  return (
    <g className="rd-frame" data-build={id}>
      <rect className="rd-frame__ground" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <rect className="rd-frame__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={1} />
      {children}
    </g>
  );
}

/** A grey tag: a label with a pointed left end and a hole by the point, in the grey that means not proposed or not needed, its words in the same grey. */
export function GreyTag({ id, at, text }: { id: string; at: Box; text: string }) {
  const { x, y, w, h } = at;
  const mid = y + h / 2;
  return (
    <g className="rd-tag" data-build={id}>
      <path className="rd-tag__edge" d={`M${x} ${mid}L${x + TAG.point} ${y}H${x + w - 6}Q${x + w} ${y} ${x + w} ${y + 6}V${y + h - 6}Q${x + w} ${y + h} ${x + w - 6} ${y + h}H${x + TAG.point}Z`} />
      <circle className="rd-tag__hole" cx={x + TAG.point} cy={mid} r={4} />
      <Words at={{ x: x + TAG.point + TAG.gap, y: mid }} text={text} anchor="start" tone="soft" />
    </g>
  );
}

/** A nameplate: a small head and shoulders and the words after it, in green, on a white pill with a green outline, so it reads the same on the white ground and on the indigo panel. */
export function Nameplate({ id, at, text, pad, icon }: { id: string; at: Box; text: string; pad: number; icon: number }) {
  const { x, y, w, h } = at;
  const cx = x + pad + icon / 2;
  const mid = y + h / 2;
  return (
    <g className="rd-plate" data-build={id}>
      <rect className="rd-plate__edge" x={x} y={y} width={w} height={h} rx={h / 2} />
      <circle className="rd-plate__icon" cx={cx} cy={mid - 4} r={icon * 0.22} />
      <path className="rd-plate__icon" d={`M${cx - icon * 0.4} ${mid + icon * 0.42}Q${cx} ${mid - icon * 0.02} ${cx + icon * 0.4} ${mid + icon * 0.42}`} />
      <Words at={{ x: x + pad + icon + 10, y: mid }} text={text} anchor="start" tone="process" strong />
    </g>
  );
}
