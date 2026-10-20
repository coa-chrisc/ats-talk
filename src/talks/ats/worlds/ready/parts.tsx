/**
 * The ready world's plainest pieces: a slide's HTML as one part, its story
 * lines, a word on the stage, a person, an outlined box, a grey tag, a
 * nameplate and a numeral drawn as a shape. Each is SVG for the plane's
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

/**
 * The four figures one to four, as Geist sets them at 56 px semibold, drawn
 * as shapes from their baseline's left end, so a number is a drawing and not
 * a word on the stage.
 */
const FIGURES = [
  "M10.7 0V-27.3H2.2V-32.8H5.6Q7.9 -32.8 9.4 -33.4Q10.9 -34.1 11.5 -35.6Q12.2 -37.1 12.2 -39.8H17.9V0Z",
  "M3.3 0Q3.3 -4.8 4.6 -8.4Q6 -12.1 9.2 -15.1Q12.4 -18.1 17.8 -20.9Q20.5 -22.3 22.1 -23.5Q23.8 -24.6 24.5 -25.8Q25.2 -27 25.2 -28.7Q25.2 -30.4 24.5 -31.6Q23.7 -32.9 22.3 -33.6Q20.9 -34.3 18.8 -34.3Q15.4 -34.3 13.4 -32.4Q11.4 -30.5 10.9 -26.9L3.4 -27.4Q4 -33.5 8 -37.1Q12 -40.7 18.7 -40.7Q23.1 -40.7 26.3 -39.2Q29.4 -37.7 31 -35Q32.7 -32.3 32.7 -28.8Q32.7 -25.7 31.7 -23.6Q30.6 -21.4 28.3 -19.6Q26 -17.8 22.1 -15.7Q17.1 -13 14.7 -10.6Q12.2 -8.2 12 -6.3H32.7V0Z",
  "M17.7 0.9Q10.6 0.9 6.7 -2.4Q2.9 -5.7 2.6 -11.2L10 -11.5Q10.3 -8.3 12.4 -6.9Q14.4 -5.4 17.7 -5.4Q19.9 -5.4 21.7 -6.1Q23.5 -6.7 24.5 -8.1Q25.6 -9.4 25.6 -11.5Q25.6 -14.8 23.4 -16.3Q21.2 -17.9 17.6 -17.9H14.1V-23.7H17.6Q20.4 -23.7 22.4 -24.9Q24.3 -26.1 24.3 -29Q24.3 -31.5 22.7 -32.9Q21.1 -34.3 17.7 -34.3Q14.4 -34.3 12.8 -33Q11.1 -31.7 10.7 -29.5L3.3 -29.9Q3.9 -34.8 7.6 -37.7Q11.4 -40.7 17.7 -40.7Q22.2 -40.7 25.4 -39.3Q28.5 -38 30.1 -35.5Q31.8 -33 31.8 -29.6Q31.8 -26.1 29.5 -23.8Q27.1 -21.5 22.7 -20.7V-21.6Q27.6 -20.9 30.4 -18.2Q33.1 -15.4 33.1 -11.1Q33.1 -7.3 31.2 -4.6Q29.3 -1.9 25.8 -0.5Q22.4 0.9 17.7 0.9Z",
  "M21.4 0V-7.9H1.5V-13.9L20.2 -39.8H28.7V-14.3H33.4V-7.9H28.7V0ZM9.4 -14.3H21.4V-30.3Z",
];

/** A numeral, one to four, in the process's green, its baseline's left end at `at`. The part is the group, so a move's `y` never fights the figure's own place. */
export function Numeral({ id, at, figure }: { id: string; at: Point; figure: number }) {
  return (
    <g data-build={id}>
      <path className="rd-numeral" d={FIGURES[figure]} transform={`translate(${at.x} ${at.y})`} />
    </g>
  );
}
