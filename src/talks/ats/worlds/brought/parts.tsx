/**
 * The brought world's plainest pieces: a picture's HTML as one part, its
 * story lines, a word set in the marks, a run of words set in HTML that
 * wraps inside its box, slide 1's centred type and short rule, slide 2's
 * wordmark, caption and module box, and slide 2a's panel and route stop.
 * Every word set here is passed in from a layout, which reads it from the
 * script. Painted by brought.css.
 */
"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { STAGE, Story, place, type Box, type Point } from "@/components/deck/kit";
import { STORIES } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="br-layer" data-build={id}>
      {children}
    </div>
  );
}

/** A picture's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

/** A word in the marks: the 32 px text, semibold navy, or the numeral face (56 px semibold green). */
export function Words({ id, at, text, anchor = "middle", kind = "name" }: { id: string; at: Point; text: string; anchor?: "start" | "middle" | "end"; kind?: "name" | "numeral" }) {
  const className = kind === "numeral" ? "br-numeral" : "dk-text br-word";
  return (
    <text className={className} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** Words in HTML, wrapping inside their box: a panel's or a tile's name, 32 px semibold navy. */
export function Note({ id, at, children }: { id: string; at: Box; children: ReactNode }) {
  return (
    <div className="br-note" data-build={id} style={{ left: at.x, top: at.y, width: at.w, height: at.h }}>
      {children}
    </div>
  );
}

/** Lines of type centred across the stage, each in a mask it rises out of (`lines`, `tell`), as a SetText's are. Slide 1's title and story lines. */
export function Centred({ id, y, lines, size }: { id: string; y: number; lines: readonly string[]; size: "display" | "lead" | "credit" }) {
  const kit = size === "display" ? "dk-set--display" : "dk-set--text";
  return (
    <p className={`dk-set ${kit} br-centred br-centred--${size}`} style={{ left: 0, top: y, width: STAGE.w }}>
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
  return <div className="br-rule" data-build={id} style={place(at)} />;
}

/** A small caption in the marks: the kit's label type, medium, in the soft ink, centred on its point. */
export function Caption({ id, at, text }: { id: string; at: Point; text: string }) {
  return (
    <text className="dk-label br-caption" data-build={id} x={at.x} y={at.y} textAnchor="middle" dominantBaseline="central">
      {text}
    </text>
  );
}

/** A wordmark from public/, in HTML at its box's size, served as saved and loaded eagerly, as the kit's stills are. */
export function Wordmark({ id, at, src, alt }: { id: string; at: Box; src: string; alt: string }) {
  return (
    <div className="br-wordmark" data-build={id} style={place(at)}>
      <Image src={src} alt={alt} width={Math.round(at.w)} height={Math.round(at.h)} loading="eager" decoding="sync" unoptimized />
    </div>
  );
}

/**
 * A course module's box, square-cornered, with its name centred in it on
 * rows: a gray dashed outline, not done yet, that turns green (`--k` on
 * `turn`, 0 to 1) as the dashes fade under a solid deep-green edge and a
 * light wash of the same green. The name stays navy, so it reads on both.
 */
export function Module({ id, turn, at, name }: { id: string; turn: string; at: Box; name: { at: Point; lines: readonly string[]; line: number } }) {
  return (
    <g className="br-module" data-build={id}>
      <g data-build={turn}>
        <rect className="br-module__dash" x={at.x} y={at.y} width={at.w} height={at.h} />
        <rect className="br-module__pass" x={at.x} y={at.y} width={at.w} height={at.h} />
      </g>
      <text className="dk-text br-module__name" textAnchor="middle" dominantBaseline="central">
        {name.lines.map((line, i) => (
          <tspan key={i} x={name.at.x} y={name.at.y + i * name.line} dominantBaseline="central">
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

/** A tall panel: a square-cornered outline in navy that draws on round its edge (`draw`). */
export function Panel({ id, at }: { id: string; at: Box }) {
  return <rect className="br-panel dk-draw" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} pathLength={1} />;
}

/** A straight stroke that draws on from its first point (`draw`). */
export function Stroke({ id, from, to, className }: { id: string; from: Point; to: Point; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** A stop on the route: a white ring in navy that lights green (`--k`, 0 unlit, 1 lit). */
export function Stop({ id, at, r }: { id: string; at: Point; r: number }) {
  return (
    <g className="br-stop" data-build={id}>
      <circle className="br-stop__ring" cx={at.x} cy={at.y} r={r} />
      <circle className="br-stop__lit" cx={at.x} cy={at.y} r={r} />
    </g>
  );
}
