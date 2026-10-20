/**
 * Slides 18 and 19's clicks.
 *
 * 18: the six tiles draw across under the plan's name; the first lights and
 * its name comes up; project dots come up from below and attach to the
 * tiles' feet, most to the first; one dot is ringed, a leader drops from it
 * to its first point, and its measure draws along the foot to the point it
 * aims at.
 *
 * 19: the departments draw with their people; the form passes over the rows
 * and lights each person it finds as it goes by; the found people walk down
 * one after another into three teams, one from each department, each team's
 * outline drawing as its first person lands, and a nameplate comes up under
 * one person in each team.
 */
import { EASE, draw, hide, lines, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ARRIVE, comeUp, into, keys, passing, play } from "./beats";
import { titleKey } from "./layout";
import { NORTH_STAR, PEOPLE, WALK_ORDER, litFraction } from "./layout-goals";

const N = NORTH_STAR;
const P = PEOPLE;

/** The dots come up one after another, this far apart. */
const DOTS_APART = 0.08;
/** The measure draws over this long; the point it aims at and its name come in as it arrives. */
const MEASURE = 1.3;

export const northStar = picture("north-star", {
  play: play(
    // The plan's six tiles draw across under its name.
    { moves: [lines(titleKey("north-star"), { at: ARRIVE }), rise(N.plan.key, { at: ARRIVE + 0.2 }), draw(keys(N.tiles), { at: ARRIVE + 0.3, duration: 0.8, stagger: 0.1 })] },
    // The first tile lights and its name comes up in it.
    { hold: 0.3, moves: [show(N.lit.key, { at: 0, duration: 0.5 }), rise(N.name.key, { at: 0.2 })] },
    { with: true, hold: 0.3, moves: [story("north-star", 0)] },
    // Projects come up from below and attach to the tiles.
    { hold: 0.3, moves: [to(keys(N.dots), comeUp(N.dot.from).on, comeUp(N.dot.from).off, { at: 0, duration: 0.7, ease: EASE.out, stagger: DOTS_APART })] },
    // One project is ringed, and a leader drops from it to its first point.
    {
      hold: 0.3,
      moves: [
        draw(N.chosen.ring.key, { at: 0, duration: 0.5 }),
        draw(N.chosen.leader.key, { at: 0.35, duration: 0.45 }),
        show(N.measure.start.key, { at: 0.75, duration: 0.3 }),
        rise(N.measure.startLabel.key, { at: 0.8 }),
      ],
    },
    // Its measure draws along the foot to the point it aims at.
    {
      hold: 0.2,
      moves: [
        draw(N.measure.key, { at: 0, duration: MEASURE }),
        show(N.measure.end.key, { at: MEASURE - 0.15, duration: 0.3 }),
        rise(N.measure.endLabel.key, { at: MEASURE - 0.05 }),
      ],
    },
    { with: true, hold: 0.5, moves: [story("north-star", 1)] },
  ),
});

/** The form crosses the rows over this long, `at` seconds into its beat. */
const FORM = { at: 0.2, duration: 2.6 } as const;
/** The people found walk to their teams over this long, each setting off `apart` after the one before, in the order that keeps them from crossing. */
const WALK = { at: 0.3, duration: 1.1, apart: 0.12 } as const;
const walkAt = (found: (typeof PEOPLE.found)[number]) => WALK.at + WALK_ORDER.indexOf(found) * WALK.apart;
/** A team's outline draws over this long, starting as its first person lands. */
const OUTLINE = { duration: 0.5, early: 0.15 } as const;
const outlineAt = (team: number) => Math.min(...P.found.filter((found) => found.team === team).map(walkAt)) + WALK.duration - OUTLINE.early;

export const people = picture("people", {
  play: play(
    into("people"),
    // The departments draw with their people, named once.
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(keys(P.depts), { at: 0, duration: 0.8, stagger: 0.15 }),
        draw(
          P.depts.map((dept) => `${dept.key}.people`),
          { at: 0.3, duration: 0.8, stagger: 0.15 },
        ),
        draw(
          P.found.map((found) => `${found.key}.person`),
          { at: 0.3, duration: 0.8, stagger: 0.03 },
        ),
        rise(P.staff.key, { at: 0.6 }),
      ],
    },
    // The form passes over the rows and lights each person it finds.
    {
      hold: 0.3,
      moves: [
        show(P.form.key, { at: 0, duration: 0.3 }),
        to(P.form.key, { x: P.form.travel }, { x: 0 }, { at: FORM.at, duration: FORM.duration, ease: EASE.draw }),
        ...P.found.map((found) => show(found.light, { at: passing(FORM, [litFraction(found)])[0], duration: 0.3 })).flat(),
        hide(P.form.key, { at: FORM.at + FORM.duration, duration: 0.3 }),
      ],
    },
    { with: true, hold: 0.2, moves: [story("people", 0)] },
    // They walk down into three teams, one from each department.
    {
      hold: 0.3,
      moves: [
        ...P.teams.map((team, t) => draw(team.key, { at: outlineAt(t), duration: OUTLINE.duration })).flat(),
        ...P.found.map((found) => to(found.key, { ...found.to }, { x: 0, y: 0 }, { at: walkAt(found), duration: WALK.duration, ease: EASE.page })).flat(),
      ],
    },
    { with: true, hold: 0.8, moves: [story("people", 1)] },
    // One person in each team takes a nameplate.
    {
      hold: 0.2,
      moves: [
        rise(
          P.teams.map((team) => team.plate.key),
          { at: 0, stagger: 0.2 },
        ),
      ],
    },
  ),
});
