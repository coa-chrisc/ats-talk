/**
 * The click of slide 9, one chain (beats.ts): the week strip draws across,
 * day by day, its first and last days named; on the first day the team,
 * the table and the stakeholder draw, named; the days fill in turn as the
 * week passes, and on the last the stakeholder stands again and the app
 * lands in hand, named. Then the two loops draw one after the other, each
 * named, with line A; the tile lands at the far right; and the tag drops
 * under the strip with line B.
 */
import { EASE, draw, fill, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { keys } from "./layout";
import { TOO_LONG } from "./layout-too-long";

const { days, dayNames, team, table, meets, holds, app, loops, pilot, failed } = TOO_LONG;

/** The strip draws a day at a time, this far apart. */
const DRAW_APART = 0.12;
/** The week passes: a day fills every this many seconds, over this long. */
const DAY_APART = 0.35;
const DAY_FILL = 0.5;
/** When the last day's stakeholder draws and the app lands, from the week's start: as the last day fills. */
const LAST_DAY = 4 * DAY_APART;
/** The second loop starts as the first ends; each draws over this long. */
const LOOP = 0.8;

/** A part that lands from a little above. */
const land = (key: string, drop: number, at: number) => to(key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: drop }, { at, duration: 0.6, ease: EASE.out });

export const tooLong = picture("too-long", {
  play: play(
    into("too-long"),
    {
      // The strip draws across a day at a time, and the first and last days are named as they draw.
      with: true,
      hold: 0.4,
      moves: [draw(keys(days), { at: 0, duration: 0.5, stagger: DRAW_APART }), rise(dayNames[0].key, { at: 0.2 }), rise(dayNames[1].key, { at: 0.2 + 4 * DRAW_APART })],
    },
    {
      // On the first day: the team, the table, and across it the stakeholder, named.
      hold: 0.2,
      moves: [draw(keys(team), { at: 0, duration: 0.6, stagger: 0.12 }), draw(table.key, { at: 0.2, duration: 0.5 }), draw(meets.key, { at: 0.35, duration: 0.6 }), rise(meets.label.key, { at: 0.5 })],
    },
    {
      // The week passes, a day at a time; on the last, the stakeholder again, and the app lands in hand, named.
      hold: 0.3,
      moves: [
        ...days.map((day, i) => fill(day.fill, { at: i * DAY_APART, duration: DAY_FILL })),
        draw(holds.key, { at: LAST_DAY, duration: 0.6 }),
        land(app.key, app.drop, LAST_DAY + 0.4),
        rise(app.label.key, { at: LAST_DAY + 0.6 }),
      ],
    },
    {
      // After the last day, the two loops, one after the other, each named as it closes; the tile lands at the far right as the second loop's line reaches it.
      hold: 0.3,
      moves: [
        ...loops.flatMap((entry, i) => [draw(entry.key, { at: i * LOOP, duration: LOOP }), rise(entry.label.key, { at: i * LOOP + 0.5 })]),
        land(pilot.key, pilot.drop, 2 * LOOP - 0.2),
      ],
    },
    { with: true, hold: 0.3, moves: [story("too-long", 0)] },
    // Under the strip, the tag drops, with line B.
    { hold: 0.2, moves: [land(failed.key, failed.drop, 0)] },
    { with: true, hold: 0.1, moves: [story("too-long", 1)] },
  ),
});
