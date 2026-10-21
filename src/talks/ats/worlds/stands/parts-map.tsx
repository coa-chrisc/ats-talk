/**
 * The department map's pieces the stands world draws (department-map.ts
 * gives their numbers): slide 11's dashed plate of what is still to
 * establish, its name and caption set inside it; slide 15's agent, the
 * two-dot hexagon of slide 14; and slide 15's closed gate, slide 10's
 * hurdle with green posts and its bars across. Script-free: every word is
 * passed in. Painted by stands.css.
 */
"use client";

import { Dashed, type Box, type Point } from "@/components/deck/kit";
import { AGENT, PLATE, gatePaths } from "../department-map";

/** An empty dashed plate in the grey of what is not yet in place, its name over its caption inside the dashes. It wipes on from the left (`wipe`). */
export function DashedPlate({ id, at, name, caption }: { id: string; at: Box; name: string; caption?: string }) {
  return (
    <Dashed id={id} at={at} rx={PLATE.rx} tone="soft">
      <span className="sn-plate-words" style={{ width: at.w - 2 * PLATE.inset }}>
        <span className="sn-plate-words__name">{name}</span>
        {caption && <span className="sn-plate-words__caption">{caption}</span>}
      </span>
    </Dashed>
  );
}

/** An agent: a white hexagon in a navy edge, two green eyes and a mouth, its top point at `at`. It lands as one part (`land`). */
export function Agent({ id, at, scale }: { id: string; at: Point; scale: number }) {
  const k = scale;
  const mid = at.y + (AGENT.h * k) / 2;
  return (
    <g className="sn-agent" data-build={id}>
      <path className="sn-agent__body" d={`M${at.x} ${at.y}l${35 * k} ${20 * k}v${49 * k}l${-35 * k} ${20 * k}l${-35 * k} ${-20 * k}v${-49 * k}z`} />
      <circle className="sn-agent__eye" cx={at.x - 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <circle className="sn-agent__eye" cx={at.x + 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <path className="sn-agent__mouth" d={`M${at.x - 15 * k} ${mid + 16.5 * k}h${30 * k}`} />
    </g>
  );
}

/** A closed gate standing on a line at `foot`: its two posts in green, its bars across them in navy. It lands as one part (`land`). */
export function ClosedGate({ id, foot, scale }: { id: string; foot: Point; scale: number }) {
  const gate = gatePaths(foot, scale);
  return (
    <g className="sn-closed-gate" data-build={id}>
      <path className="sn-closed-gate__bar" d={gate.bars} />
      <path className="sn-closed-gate__post" d={gate.posts} />
    </g>
  );
}
