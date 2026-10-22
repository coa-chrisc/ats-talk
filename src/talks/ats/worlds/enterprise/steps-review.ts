/**
 * Slide 4a's click: the forecast with the title; the stage, its agents and
 * the person come up together; then one finite stream, a trickle growing
 * into a run, each document passing the checks and going on to the next
 * slot of the finished grid, or, for the exceptions, down into their tray
 * before it is finished. Once the stream has stopped, copies of three
 * finished documents rise off the grid and go down to the audit tray, so
 * the grid stays full.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, mark, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { AUDIT_AT, REVIEW as R, SAMPLES, TRAVEL, WORK } from "./layout-review";
import { into, play } from "./moves";

const T = TRAVEL;

/** A document's path: it appears at its agent, runs to the checks, then on to its slot; an exception turns down under the checks and goes to its tray. */
const stream = (item: (typeof WORK)[number]) => {
  const appear = item.start;
  const atCheck = appear + T.appear;
  const past = atCheck + T.toCheck;
  return [
    to(item.key, { autoAlpha: 1, x: item.origin.x, y: item.origin.y }, { autoAlpha: 0, x: item.origin.x, y: item.origin.y }, { at: appear, duration: T.appear }),
    to(item.key, { x: item.through.x, y: item.through.y }, undefined, { at: atCheck, duration: T.toCheck, ease: "none" }),
    ...(item.drop
      ? [
          to(item.key, { x: item.drop.x, y: item.drop.y }, undefined, { at: past, duration: T.drop, ease: "none" }),
          to(item.key, { x: item.end.x, y: item.end.y }, undefined, { at: past + T.drop, duration: T.toTray, ease: "power1.out" }),
        ]
      : [to(item.key, { x: item.end.x, y: item.end.y }, undefined, { at: past, duration: T.toSlot, ease: "power1.out" })]),
  ];
};

/** A copy for the audit: it comes up on its slot, over the document it copies, and goes down to the audit tray. */
const audit = (sample: (typeof SAMPLES)[number]) => [
  to(sample.key, { autoAlpha: 1, x: sample.from.x, y: sample.from.y }, { autoAlpha: 0, x: sample.from.x, y: sample.from.y }, { at: sample.at, duration: 0.15 }),
  to(sample.key, { x: sample.end.x, y: sample.end.y }, undefined, { at: sample.at + 0.15, duration: 0.9, ease: "power1.inOut" }),
];

export const review = (): StepDef[] =>
  picture("review", {
    play: play([
      { ...into("review"), moves: [...into("review").moves, ...show(R.forecast.key, { at: 0.3, duration: 0.35 })] },
      {
        moves: [
          story("review", 0),
          story("review", 1),
          show(R.stage, { at: 0, duration: 0.4 }),
          show(R.agents.map((agent) => agent.key), { at: 0, duration: 0.4, stagger: 0 }),
          draw(R.human.key, { at: 0, duration: 0.4 }),
          mark(R.person, { at: 0, duration: 0.4 }),
          ...WORK.flatMap(stream),
          show(R.audit, { at: AUDIT_AT - 0.3, duration: 0.3 }),
          ...SAMPLES.flatMap(audit),
        ],
      },
    ]),
  });
