/**
 * The taught world's plainest pieces: a picture's HTML as one part, its
 * story lines, a word set in the marks, and a run of words set in HTML that
 * may wrap inside its box. Every word set here is passed in from a layout,
 * which reads it from the script.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES } from "./layout";

/** A picture's HTML, gathered as one part that holds no room of its own. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="tg-layer" data-build={id}>
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
  strong?: boolean;
  /** Degrees to turn the words about their place: a label set along a sloping line. Turned words sit in a group, so a move's `y` never fights the turn. */
  turn?: number;
};

/** A word in the marks, at the 26 px label size, in navy. */
export function Words({ id, at, text, anchor = "middle", strong = false, turn }: WordsProps) {
  const className = `dk-label tg-word${strong ? " tg-word--strong" : ""}`;
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

type NoteProps = {
  id: string;
  at: Box;
  /** The 26 px label, the 32 px text, the 24 px tag, the 48 px name or the 96 px figure. */
  size?: "label" | "text" | "tag" | "name" | "figure";
  align?: "start" | "center";
  strong?: boolean;
  tone?: "paper" | "catalog";
  className?: string;
  children: ReactNode;
};

/** Words in HTML, wrapping inside their box, in navy unless the figure is indigo. */
export function Note({ id, at, size = "label", align = "start", strong = false, tone = "paper", className, children }: NoteProps) {
  const classes = ["tg-note", `tg-note--${size}`, align === "center" ? "tg-note--center" : "", strong ? "tg-note--strong" : "", tone === "catalog" ? "tg-note--catalog" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} data-build={id} style={{ left: at.x, top: at.y, width: at.w, height: at.h }}>
      {children}
    </div>
  );
}
