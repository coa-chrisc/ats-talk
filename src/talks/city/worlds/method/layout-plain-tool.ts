/**
 * Slide 17's places: two bars at the top, each named inside at its start,
 * the long months bar across the stage's width and the short days bar under
 * it from the same edge; under them three tools in a row, each first a
 * dashed outline with its name over it; and beside the last tool the small
 * team that builds them, one person and two agents, named once under
 * itself. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, contentTop, layerOf } from "./layout";

const [DASHBOARD, PIPELINE, ANALYSIS, MONTHS, TEAM_NAME, DAYS] = shown("plain-tool", "play");
const NAMES = [DASHBOARD, PIPELINE, ANALYSIS] as const;

/** The gap between a thing and its name. */
const NAME_GAP = 14;
/** A bar: its height, the gap between the two, the room from a bar's start to its name, and the days bar's length, about a twelfth of the months bar's. */
const BAR = { h: 56, gap: 16, pad: 20, days: 144 } as const;
/** The bars' foot to the tools' names. */
const BELOW = 40;
const TOOL = { w: 340, h: 200, gap: 40 } as const;
/** The team beside the last tool: this far right of it, the person at its left, the two agents' centres this far right of the person's left edge. */
const TEAM = { aside: 96, person: { w: 48, h: 64 }, agents: [86, 144], nameGap: 12 } as const;

/** The whole drawing, bars to the tools' feet, centred in the room between the story band and the safe line. */
const BLOCK = 2 * BAR.h + BAR.gap + BELOW + LABEL_LINE + NAME_GAP + TOOL.h;
const TOP = contentTop("plain-tool");
const BARS_Y = Math.round(TOP + (SAFE.bottom - TOP - BLOCK) / 2);
const TOOL_Y = BARS_Y + 2 * BAR.h + BAR.gap + BELOW + LABEL_LINE + NAME_GAP;
export type ToolKind = "dashboard" | "pipeline" | "analysis";
const KINDS: readonly ToolKind[] = ["dashboard", "pipeline", "analysis"];

const toolAt = (i: number): Box => box(SAFE.left + i * (TOOL.w + TOOL.gap), TOOL_Y, TOOL.w, TOOL.h);
const last = toolAt(NAMES.length - 1);
/** The team's person, name under it, centred on the tools' height. */
const TEAM_H = TEAM.person.h + TEAM.nameGap + LABEL_LINE;
const person = box(last.x + last.w + TEAM.aside, TOOL_Y + (TOOL.h - TEAM_H) / 2, TEAM.person.w, TEAM.person.h);

const bar = (key: string, text: string, at: Box) => ({ key, at, name: { key: `${key}.name`, text, at: { x: at.x + BAR.pad, y: at.y + at.h / 2 } } });

export const PLAIN_TOOL = {
  ...layerOf("plain-tool"),
  /** How long the work used to take, across the stage's width, and how long it takes now, under it. */
  months: bar("plain-tool.months", MONTHS, box(SAFE.left, BARS_Y, SAFE.right - SAFE.left, BAR.h)),
  days: bar("plain-tool.days", DAYS, box(SAFE.left, BARS_Y + BAR.h + BAR.gap, BAR.days, BAR.h)),
  tools: NAMES.map((text, i) => {
    const at = toolAt(i);
    return {
      key: `plain-tool.tool.${i}`,
      kind: KINDS[i],
      at,
      /** The dashed outline that waits, and the built tool drawn over it. */
      outline: `plain-tool.outline.${i}`,
      built: `plain-tool.built.${i}`,
      inside: `plain-tool.inside.${i}`,
      name: { key: `plain-tool.name.${i}`, text, at: { x: at.x, y: at.y - NAME_GAP - LABEL_LINE / 2 } },
    };
  }),
  team: {
    key: "plain-tool.team",
    person: { key: "plain-tool.person", at: person },
    agents: TEAM.agents.map((dx, i) => ({ key: `plain-tool.agent.${i}`, at: { x: person.x + dx, y: person.y + TEAM.person.h / 2 } as Point })),
    /** The team's name, under it from the person's left. */
    name: { key: "plain-tool.team.name", text: TEAM_NAME, at: { x: person.x, y: person.y + person.h + TEAM.nameGap + LABEL_LINE / 2 } },
  },
};
