/**
 * Slides 28 to 30's clicks. Each plays its whole slide: the structure first,
 * then what sits on it, each story line landing with the beat it describes.
 */
import { EASE, behind, draw, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, play } from "./beats";
import { CHARTER, ONESDLC, SECURITY } from "./layout-rules";

const S = SECURITY;
const O = ONESDLC;
const C = CHARTER;

/** Slide 28: the bands stack up from the bottom, the pipeline's five checks each pass, then the three tiers come in on the right. */
export const security = picture("security", {
  play: play(
    into("security"),
    { with: true, hold: 0.3, moves: [rise(keys(S.bands), { at: 0, stagger: 0.3 })] },
    {
      moves: [
        draw(S.pipe.key, { at: 0, duration: 0.8 }),
        show(S.checks.map((check) => check.key), { at: 0.2, stagger: 0.1 }),
        show(S.checks.map((check) => check.tick.key), { at: 1.0, stagger: 0.25, duration: 0.3 }),
      ],
    },
    { with: true, hold: 1.0, moves: [story("security", 0)] },
    {
      moves: [
        rise(keys(S.tiers), { at: 0, stagger: 0.25 }),
        wipe(S.empty.key, { at: 0.5, from: "top" }),
        rise(S.empty.name.key, { at: 0.6 }),
        rise(S.empty.none.key, { at: 0.9 }),
      ],
    },
    { with: true, hold: 0.9, moves: [story("security", 1)] },
  ),
});

/** Slide 29: the line draws with its stages behind the front, the branch leaves at the second stage and comes back in before the fourth, then the checkpoints land in turn, the middle two on the branch. */
const LINE = { at: 0, duration: 1.4 } as const;
const along = O.stages.map((stage) => (stage.at.x - O.line.x0) / (O.line.x1 - O.line.x0));
const stagesAt = behind(LINE, along);

export const onesdlc = picture("onesdlc", {
  play: play(
    into("onesdlc"),
    {
      with: true,
      hold: 0.3,
      moves: [
        draw(O.line.key, LINE),
        ...O.stages.flatMap((stage, i) => [show(stage.key, { at: stagesAt[i], duration: 0.3 }), rise(stage.label.key, { at: stagesAt[i] + 0.05 })]),
      ],
    },
    { with: true, hold: 1.4, moves: [story("onesdlc", 0)] },
    { moves: [draw(O.branch.key, { at: 0, duration: 1.1 }), rise(O.custom.key, { at: 0.8 })] },
    { with: true, hold: 0.6, moves: [story("onesdlc", 1)] },
    {
      moves: O.checkpoints.flatMap((point, i) => [
        to(point.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -24 }, { at: i * 0.25, duration: 0.5, ease: EASE.out }),
        rise(point.label.key, { at: i * 0.25 + 0.15 }),
      ]),
    },
    { moves: [wipe(O.tag.key, { from: "left" })] },
  ),
});

/** Slide 30: the two roles; then the activities under their heading, the four circles drawing in turn; then the results under theirs, one card under another. */
export const charter = picture("charter", {
  play: play(
    into("charter"),
    {
      with: true,
      hold: 0.3,
      moves: [rise(keys(C.roles), { at: 0, stagger: 0.2 }), draw(C.roles.map((role) => `${role.key}.person`), { at: 0.25, stagger: 0.2 })],
    },
    { with: true, hold: 0.6, moves: [story("charter", 0)] },
    {
      moves: [rise(C.heads[0].key, { at: 0 }), draw(keys(C.circles), { at: 0.2, stagger: 0.3 }), rise(C.circles.map((circle) => circle.label.key), { at: 0.6, stagger: 0.3 })],
    },
    { with: true, hold: 1.0, moves: [story("charter", 1)] },
    {
      moves: [
        rise(C.heads[1].key, { at: 0 }),
        to(keys(C.results), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -20 }, { at: 0.2, duration: 0.6, ease: EASE.out, stagger: 0.12 }),
      ],
    },
  ),
});
