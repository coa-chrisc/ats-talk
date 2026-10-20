/**
 * Slide 17's click: three dashed outlines open in a row, each named; the
 * long grey months bar draws slowly across the stage over them, named,
 * while the outlines stay empty; the team, one person and two green agents,
 * comes up beside them, named; then the short green days bar draws under
 * the months bar, named, and while it draws the team builds the three tools
 * one after another, each edge drawing on, its face filling solid and what
 * it shows coming up as the outline goes.
 */
import { draw, fill, hide, rise, show, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { PLAIN_TOOL } from "./layout-plain-tool";
import { into, keys, play } from "./moves";

const P = PLAIN_TOOL;

/** One build: the edge drawing on, the face filling, what it shows, and the outline going. */
const BUILD = { edge: 0.7, face: 0.5, faceAt: 0.55, insideAt: 0.7, outlineAt: 0.6 } as const;
/** The months bar draws slowly, its name coming up once the bar is under it. */
const MONTHS = { duration: 2.6, nameAt: 0.6 } as const;
/** The days bar draws in about half the months bar's time; the builds start this far apart inside it. */
const DAYS = { duration: 1.4, nameAt: 0.8, builds: [0.1, 0.35, 0.6] } as const;

const build = (tool: (typeof P.tools)[number], at: number) => [
  draw(tool.built, { at, duration: BUILD.edge }),
  fill(tool.built, { at: at + BUILD.faceAt, duration: BUILD.face }),
  rise(tool.inside, { at: at + BUILD.insideAt, duration: 0.5 }),
  hide(tool.outline, { at: at + BUILD.outlineAt, duration: 0.3 }),
];

export const plainTool = picture("plain-tool", {
  play: play(
    into("plain-tool"),
    // Three dashed outlines wait in a row, named.
    {
      hold: 0.05,
      moves: [
        wipe(
          P.tools.map((tool) => tool.outline),
          { at: 0, stagger: 0.15 },
        ),
        rise(
          P.tools.map((tool) => tool.name.key),
          { at: 0.1, stagger: 0.15 },
        ),
      ],
    },
    // The months bar draws slowly across over them, and they stay empty.
    {
      hold: 0.3,
      moves: [fill(P.months.key, { at: 0, duration: MONTHS.duration }), rise(P.months.name.key, { at: MONTHS.nameAt })],
    },
    // The team comes up beside the outlines.
    {
      hold: 0.2,
      moves: [
        show(P.team.key, { at: 0, duration: 0.3 }),
        draw(P.team.person.key, { at: 0, duration: 0.6 }),
        show(keys(P.team.agents), { at: 0.25, stagger: 0.1 }),
        rise(P.team.name.key, { at: 0.35 }),
      ],
    },
    // The days bar draws, short, and the team builds all three while it does.
    {
      hold: 0.2,
      moves: [
        fill(P.days.key, { at: 0, duration: DAYS.duration }),
        rise(P.days.name.key, { at: DAYS.nameAt }),
        fill(keys(P.team.agents), { at: 0, duration: 0.5, stagger: 0.1 }),
        ...P.tools.flatMap((tool, i) => build(tool, DAYS.builds[i])),
      ],
    },
    { with: true, hold: 0.3, moves: [story("plain-tool", 0)] },
    // The three tools finished, with the second line.
    { hold: 0.6, moves: [story("plain-tool", 1)] },
  ),
});
