/**
 * Slide 19a's click: the chart draws, wide, with its departments and their
 * people; one person in each department lights; the new box hangs off the
 * trunk and the lit people step into it, all at once so none crosses
 * another; the view zooms in on the box, the chart growing and falling away
 * as the box and its people grow on the same curve about the same point, and
 * the box is named. Its three tiles land under it one after another, the
 * leadership's box draws at its left with a solid line to it, and the
 * developers' box draws at the right, dotted lines open across to it, and
 * the question tag pops up under it.
 */
import { EASE, draw, hide, rise, show, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { comeUp, into, keys, play } from "./beats";
import { PROGRAM_TEAM } from "./layout-program-team";

const T = PROGRAM_TEAM;

/** The lit people walk into the team box together, over this long. */
const WALK = { at: 0.3, duration: 1.0 } as const;
/** The zoom: the chart, the team box and its people grow together over this long on one curve; the chart fades from `fade` in, over `fadeFor`. */
const ZOOM = { duration: 1.4, fade: 0.3, fadeFor: 0.8 } as const;
/** The tiles land this far apart. */
const TILES_APART = 0.25;
/** How small the tag starts as it pops up. */
const TAG_FROM = 0.3;

export const programTeam = picture("program-team", {
  play: play(
    into("program-team"),
    // The chart draws, wide: the top box, the trunk and bar, the departments and their people, named once.
    {
      with: true,
      hold: 0.2,
      moves: [
        draw(T.chart.head.key, { at: 0, duration: 0.6 }),
        draw(T.chart.lines.key, { at: 0.2, duration: 0.8 }),
        draw(keys(T.chart.depts), { at: 0.5, duration: 0.6, stagger: 0.08 }),
        draw(
          T.chart.depts.map((dept) => dept.people.key),
          { at: 0.7, duration: 0.6, stagger: 0.08 },
        ),
        show(keys(T.members), { at: 0.7, duration: 0.4, stagger: 0.08 }),
        rise(T.chart.label.key, { at: 1.0 }),
      ],
    },
    // One person in each department lights.
    {
      hold: 0.2,
      moves: [
        show(
          T.members.map((member) => member.light),
          { at: 0, duration: 0.35, stagger: 0.12 },
        ),
      ],
    },
    // A new box hangs off the trunk, and the lit people step into it together.
    {
      hold: 0.2,
      moves: [
        draw(T.chart.branch.key, { at: 0, duration: 0.3 }),
        show(T.team.key, { at: 0.15, duration: 0.3 }),
        ...T.members.map((member) => to(member.key, { "--x": 0, "--y": 0 }, { "--x": member.from.x, "--y": member.from.y }, { at: WALK.at, duration: WALK.duration, ease: EASE.page })),
      ],
    },
    // The view zooms in on the box: the chart grows and falls away, the box and its people grow with it to fill the middle, and the box is named.
    {
      hold: 0.2,
      moves: [
        to(T.chart.key, { "--s": T.zoom }, { "--s": 1 }, { at: 0, duration: ZOOM.duration, ease: EASE.page }),
        hide(T.chart.key, { at: ZOOM.fade, duration: ZOOM.fadeFor }),
        to(T.team.key, { "--s": 1 }, { "--s": T.team.small }, { at: 0, duration: ZOOM.duration, ease: EASE.page }),
        to(keys(T.members), { "--s": 1 }, { "--s": T.team.small }, { at: 0, duration: ZOOM.duration, ease: EASE.page, stagger: 0 }),
        rise(T.team.name.key, { at: ZOOM.duration - 0.2 }),
      ],
    },
    // Its three tiles land under it one after another, and the leadership's box draws at its left with a solid line to it.
    {
      hold: 0.2,
      moves: [
        draw(
          T.tiles.map((tile) => tile.stub.key),
          { at: 0, duration: 0.3, stagger: TILES_APART },
        ),
        to(keys(T.tiles), comeUp(-24).on, comeUp(-24).off, { at: 0.1, duration: 0.6, ease: EASE.out, stagger: TILES_APART }),
        draw(T.lead.key, { at: 0.7, duration: 0.7 }),
        rise(T.lead.label.key, { at: 1.1 }),
        draw(T.lead.line.key, { at: 1.1, duration: 0.5 }),
      ],
    },
    { with: true, hold: 0.2, moves: [story("program-team", 0)] },
    // The developers' box draws at the right, dotted lines open across to it, and the question pops up under it.
    {
      hold: 0.3,
      moves: [
        draw(T.devs.key, { at: 0, duration: 0.7 }),
        draw(T.devs.people.key, { at: 0.2, duration: 0.7 }),
        rise(T.devs.label.key, { at: 0.4 }),
        wipe(
          T.devs.dotted.map((line) => line.key),
          { at: 0.7, duration: 0.6, stagger: 0.15 },
        ),
        to(T.tag.key, { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": TAG_FROM }, { at: 1.4, duration: 0.5, ease: EASE.out }),
      ],
    },
    { with: true, hold: 0.4, moves: [story("program-team", 1)] },
  ),
});
