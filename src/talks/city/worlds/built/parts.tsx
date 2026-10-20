/**
 * The pieces every slide of the built world draws with: a slide's HTML as
 * one part, its story lines, a navy label as HTML, a word set in the marks,
 * and the fence a sandbox stands in, with its gate. Every word set here is
 * passed in from a layout, which reads it from the script.
 */
"use client";

import type { ReactNode } from "react";
import { Block, Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES } from "./layout";

/** A slide's HTML, gathered as one part. */
export function Group({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="built-group" data-build={id}>
      {children}
    </div>
  );
}

/** A slide's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

type LabelProps = { id: string; at: Box; align?: "center" | "left" | "right"; size?: "label" | "text" | "key"; tone?: "paper" | "soft" | "process"; className?: string; children: ReactNode };

/** A few words as HTML, set in the box: 26 px label type (`label`), 32 px text (`text`) or the 48 px key type (`key`), navy unless `tone` says otherwise; `className` adds a look of its own, such as a tag's outline. */
export function Label({ id, at, align = "center", size = "label", tone = "paper", className, children }: LabelProps) {
  const set = align === "center" ? " dk-block--center" : align === "right" ? " dk-block--right" : "";
  const type = size === "label" ? " dk-block--label" : size === "key" ? " dk-block--medium" : "";
  return (
    <Block id={id} at={at} className={`built-word built-word--${tone}${type}${set}${className ? ` ${className}` : ""}`}>
      {children}
    </Block>
  );
}

/** A word in the marks, in the 26 px label type and navy, or in 32 px text: it moves with the drawing it is part of. */
export function Words({ id, at, text, anchor = "middle", size = "label", className }: { id?: string; at: Point; text: string; anchor?: "start" | "middle" | "end"; size?: "label" | "text"; className?: string }) {
  return (
    <text className={`${size === "text" ? "dk-text" : "dk-label"} built-ink${className ? ` ${className}` : ""}`} data-build={id} x={at.x} y={at.y} textAnchor={anchor} dominantBaseline="central">
      {text}
    </text>
  );
}

/** A fence seen from above: each rail draws on from its start (`draw`), and its posts, small navy squares along it, come up together (`show`). */
export function Fence({ rails, posts }: { rails: readonly { key: string; d: string }[]; posts: { key: string; at: readonly Box[] } }) {
  return (
    <>
      {rails.map((rail) => (
        <path key={rail.key} className="built-fence dk-draw" data-build={rail.key} d={rail.d} pathLength={1} />
      ))}
      <g className="built-fence__posts" data-build={posts.key}>
        {posts.at.map((post) => (
          <rect key={`${post.x} ${post.y}`} x={post.x} y={post.y} width={post.w} height={post.h} rx={2} />
        ))}
      </g>
    </>
  );
}

/**
 * The fence's gate, as a plan draws one: a jamb at each end of the opening
 * in the fence's right side, and a leaf hung from the top one, shut across
 * it. The leaf swings out of the fence about its hinge as `--k` goes to 1
 * (`open`), and shuts as it goes back to 0.
 */
export function FenceGate({ id, hinge, length }: { id: string; hinge: Point; length: number }) {
  const { x, y } = hinge;
  return (
    <g data-build={id}>
      <rect className="built-gate__jamb" x={x - 8} y={y - 18} width={16} height={18} rx={2} />
      <rect className="built-gate__jamb" x={x - 8} y={y + length} width={16} height={18} rx={2} />
      <rect className="built-gate__leaf" x={x - 4} y={y} width={8} height={length} rx={3} style={{ transformOrigin: `${x}px ${y}px` }} />
    </g>
  );
}

/**
 * A line that draws on from its tail (`draw`) and ends in an open head that
 * arrives with its front: something travels this way. `tone` is the
 * process's green or navy; `heading` is the way it points at its end, in
 * degrees (0 to the right, 90 down).
 */
export function Arrow({ id, d, end, heading, tone = "process" }: { id: string; d: string; end: Point; heading: number; tone?: "process" | "paper" }) {
  return (
    <g className={`built-arrow built-arrow--${tone}`} data-build={id}>
      <path className="dk-draw" d={d} pathLength={1} />
      <path className="built-arrow__head" d="M-14 -9L0 0L-14 9" transform={`translate(${end.x} ${end.y}) rotate(${heading})`} />
    </g>
  );
}
