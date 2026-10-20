/**
 * The who world's own drawings, for what the kit has no part for: a line of
 * set type centred on the stage (slide 1's title and story lines), the short
 * rule under it, the timeline's marks (its line, its end tick, a marker's
 * ring, its lit dot and its stem, a word on the plane), a logo on its
 * tile, and a card that turns face up. Each is moved with the house
 * moves only: `lines` and `tell` for set type, `draw` (`--d`) for a stroke,
 * `fill` (`--k`) for a dot that lights, `show` and `rise` for words, and
 * `to` on `scaleX` and `rotationY` for the rule and a card's turn. Colours are the deck's tokens (who.css).
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { STAGE, place, type Box, type Point } from "@/components/deck/kit";

/** Lines of type centred across the stage, each in a mask it rises out of (`lines`, `tell`), as a SetText's are. */
export function Centred({ id, y, lines, size }: { id: string; y: number; lines: readonly string[]; size: "display" | "lead" | "credit" }) {
  const kit = size === "display" ? "dk-set--display" : "dk-set--text";
  return (
    <p className={`dk-set ${kit} who-centred who-centred--${size}`} style={{ left: 0, top: y, width: STAGE.w }}>
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
  return <div className="who-rule" data-build={id} style={place(at)} />;
}

/** A straight stroke that draws on from its first point (`draw`): the timeline, its end tick, a marker's stem. */
export function Stroke({ id, from, to, className }: { id: string; from: Point; to: Point; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** A marker before it lights: an outline ring on the line (`show`). */
export function MarkerRing({ id, at, r }: { id: string; at: Point; r: number }) {
  return <circle className="who-ring" data-build={id} cx={at.x} cy={at.y} r={r} />;
}

/** A marker lit: a soft disc and a solid dot, both growing from the ring's middle as it fills (`fill`, `--k`). */
export function MarkerDot({ id, at, r, halo }: { id: string; at: Point; r: number; halo: number }) {
  return (
    <g className="who-dot" data-build={id}>
      <circle className="who-dot__halo" cx={at.x} cy={at.y} r={halo} />
      <circle className="who-dot__core" cx={at.x} cy={at.y} r={r} />
    </g>
  );
}

/** A word on the plane, centred on its point or starting at it (`rise`, `show`): a marker's name, a caption, a year. */
export function Word({ id, at, text, kind, anchor = "middle" }: { id: string; at: Point; text: string; kind: "name" | "small"; anchor?: "start" | "middle" }) {
  return (
    <text className={kind === "name" ? "dk-text who-name" : "dk-label who-small"} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** The id of the part inside a card that turns: the card's own id fades it in and out, this one turns it. */
export const turnOf = (id: string) => `${id}.turn`;

/**
 * A card that turns face up (`rotationY` from 180 to 0 on its inner part,
 * `turnOf(id)`): its back, the raised tint inside a rule-coloured edge,
 * faces the room as it comes in, and its face once it has turned past
 * edge-on. The back is as light as the ground, so the turn never flashes a
 * dark shape. The card itself only fades, so the turn keeps its depth (a
 * part that fades while it turns in depth is drawn flat). `children` is
 * what the face holds.
 */
export function Card({ id, at, children }: { id: string; at: Box; children: ReactNode }) {
  return (
    <div className="who-card" data-build={id} style={place(at)}>
      <div className="who-card__turn" data-build={turnOf(id)}>
        <div className="who-card__back" />
        <div className="who-card__face">{children}</div>
      </div>
    </div>
  );
}

/**
 * A logo on its tile (`rise`): a plain white tile in a rule-coloured edge,
 * the logo centred in it at the size its layout gives (`logoSize`). The
 * image's alt text is the institution's name, the words the tile shows.
 */
export function LogoTile({ id, at, src, alt, size }: { id: string; at: Box; src: string; alt: string; size: { w: number; h: number } }) {
  return (
    <div className="who-tile" data-build={id} style={place(at)}>
      <Logo src={src} alt={alt} size={size} />
    </div>
  );
}

/** A logo image as the frame sets the department's (frame.tsx): served as it is, at the size given. */
export function Logo({ src, alt, size, className = "who-logo" }: { src: string; alt: string; size: { w: number; h: number }; className?: string }) {
  return <Image className={className} src={src} alt={alt} width={size.w} height={size.h} loading="eager" decoding="sync" unoptimized />;
}

/** A line of HTML type on the plane (`rise`): a group's heading, or a line at the foot of the larger card's face. */
export function Text({ id, at, text, kind }: { id: string; at: Box; text: string; kind: "heading" | "school" | "when" }) {
  return (
    <p className={`who-text who-text--${kind}`} data-build={id} style={place(at)}>
      {text}
    </p>
  );
}
