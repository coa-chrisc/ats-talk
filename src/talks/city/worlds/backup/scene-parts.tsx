/**
 * The pieces the backup slides draw with: a slide's HTML as one part, its
 * story lines, a word set in SVG or HTML, and a tag. Every word set here is
 * passed in from a layout, which reads it from the script.
 */
"use client";

import type { ReactNode } from "react";
import { Block, Story, place, type Box } from "@/components/deck/kit";
import { STORIES, type TagKind } from "./layout";

/** A slide's HTML, gathered as one part. */
export function Group({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="backup-group" data-build={id}>
      {children}
    </div>
  );
}

/** A slide's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

type Anchor = "start" | "middle" | "end";
const ANCHOR_X = { start: 0, middle: 0.5, end: 1 } as const;

/**
 * A word in SVG, in navy: the 26 px label type, or semibold (`strong`), or
 * the 32 px text type (`big`), or 22 px small type (`small`). Set on the middle line of its box, at its
 * left, middle or right.
 */
export function Word({ id, at, text, anchor = "start", tone = "label" }: { id?: string; at: Box; text: string; anchor?: Anchor; tone?: "label" | "strong" | "big" | "light" | "small" }) {
  return (
    <text
      className={`dk-label backup-word backup-word--${tone}`}
      data-build={id}
      x={at.x + at.w * ANCHOR_X[anchor]}
      y={at.y + at.h / 2}
      textAnchor={anchor}
      dominantBaseline="central"
    >
      {text}
    </text>
  );
}

/** A tag: its words in a rounded outline of a fixed size, navy, or grey and dashed (layout.ts, TagKind). It arrives by its clip (`wipe`). */
export function Tag({ id, at, kind, lines }: { id: string; at: Box; kind: TagKind; lines: readonly string[] }) {
  return (
    <Block id={id} at={at} className={`dk-wipe dk-block--label dk-block--middle backup-tag backup-tag--${kind}`}>
      {kind === "projected" && (
        <svg className="backup-tag__dash" width={at.w} height={at.h} viewBox={`0 0 ${at.w} ${at.h}`} aria-hidden="true">
          <rect x={1.5} y={1.5} width={at.w - 3} height={at.h - 3} rx={8} />
        </svg>
      )}
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </Block>
  );
}

/**
 * A few words in an HTML box, in navy label type, centred unless told:
 * words that sit inside an outline. `head` sets them as a group's heading,
 * its first letter a capital (the words are a story line's, from mid-line).
 */
export function Label({ id, at, lines, align = "center", strong = false, head = false }: { id?: string; at: Box; lines: readonly string[]; align?: "center" | "left"; strong?: boolean; head?: boolean }) {
  const set = align === "center" ? " dk-block--middle" : " backup-label--left";
  return (
    <div className={`dk-block dk-block--label backup-label${strong ? " backup-label--strong" : ""}${head ? " backup-label--head" : ""}${set}`} data-build={id} style={place(at)}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}
