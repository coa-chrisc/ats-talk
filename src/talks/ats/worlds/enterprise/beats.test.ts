import { stillAllowance } from "../sequence";
/**
 * Each of Part 2's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { describe, expect, it } from "vitest";
import { at, elements, endOf, ids, playOf, playsAt, startOf, stepOf, world } from "./harness";
import { storyKeysOf, titleKey } from "./layout";
import { AGENTS } from "./layout-agents";
import { FLEET } from "./layout-fleet";
import { REVIEW, WORK, AUDIT_AT } from "./layout-review";
import { SPENDING } from "./layout-spending";
import { STUMBLED } from "./layout-stumbled";
import { ARRIVE } from "./moves";
import { headOf, personOf } from "./parts-figures";

const storyAt = (pictureId: string, line: 0 | 1) => startOf(stepOf(pictureId), storyKeysOf(pictureId)[line]);
/** When a part's move on a prop starts. */
const startOn = (id: string, key: string, prop: string) => Math.min(...playOf(id, key).filter((play) => prop in play.on).map((play) => play.at));

describe("every click", () => {
  it.each(ids)("keeps %s moving: never still for more than 3 s", (id) => {
    let landed = 0;
    let still = 0;
    for (const play of [...world.plays[ids.indexOf(id)]].sort((a, b) => a.at - b.at)) {
      still = Math.max(still, play.at - landed);
      const many = "key" in play ? elements(play.key) : 1;
      landed = Math.max(landed, play.at + play.duration + play.stagger * Math.max(0, many - 1));
    }
    expect(still).toBeLessThanOrEqual(stillAllowance(id));
  });

  it.each(ids)("ends %s on a drawing or a story line landing, not a hold", (id) => {
    const plays = playsAt(id);
    const last = Math.max(...plays.map((play) => play.at + play.duration));
    expect(plays.some((play) => play.at > last - 1)).toBe(true);
  });
});

describe("slide 3, the spending", () => {
  const id = stepOf("spending");
  const S = SPENDING;
  const B = S.bar;

  it("brings the title up as the world arrives", () => {
    expect(startOf(id, titleKey("spending"))).toBe(ARRIVE);
  });

  it("raises the two columns from the floor, the shorter first and the taller longer, each year under it as it starts and its figure and name as it tops out, story line A with them", () => {
    const [five, seventeen] = S.columns.map((column) => playOf(id, column.key)[0]);
    expect(startOf(id, S.floor.key)).toBeLessThanOrEqual(five.at);
    expect(seventeen.at).toBeGreaterThan(five.at);
    expect(seventeen.duration).toBeGreaterThan(five.duration);
    for (const column of S.columns) {
      const play = playOf(id, column.key)[0];
      expect(play.on).toEqual({ "--k": 1 });
      expect(startOf(id, column.year.key)).toBeGreaterThanOrEqual(play.at);
      expect(startOf(id, column.year.key)).toBeLessThan(play.at + play.duration / 2);
      expect(startOf(id, column.figure.key)).toBeGreaterThan(play.at + play.duration / 2);
      expect(startOf(id, column.figure.key)).toBeLessThan(play.at + play.duration);
      expect(startOf(id, column.name.key) - startOf(id, column.figure.key)).toBeLessThanOrEqual(0.2);
    }
    expect(startOf(id, S.ofIt.key)).toBeGreaterThan(startOf(id, S.columns[1].figure.key));
  });

  it("after a hold to read, raises the heading, draws the bar under it, splits it, names its parts, and fills them left to right, each caption with its part, story line B as they fill", () => {
    const heading = startOf(id, S.heading.key);
    const bar = startOf(id, B.key);
    expect(bar).toBeGreaterThan(heading);
    for (const split of B.splits) expect(startOf(id, split.key)).toBeGreaterThan(bar);
    const fills = B.parts.map((part) => playOf(id, part.key)[0]);
    for (const [i, part] of B.parts.entries()) {
      expect(startOf(id, part.name.key)).toBeLessThan(fills[0].at);
      if (i > 0) expect(fills[i].at).toBeGreaterThanOrEqual(fills[i - 1].at + fills[i - 1].duration);
      expect(startOf(id, part.caption.key)).toBeGreaterThanOrEqual(fills[i].at);
      expect(startOf(id, part.caption.key)).toBeLessThan(fills[i].at + fills[i].duration);
    }
  });

  it("ends on the two columns and the three-part bar, its middle part filled, every caption up", () => {
    const end = at(id);
    for (const column of S.columns) {
      expect(end[column.key]["--k"]).toBe(1);
      for (const key of [column.year.key, column.figure.key, column.name.key]) expect(end[key].autoAlpha, key).toBe(1);
    }
    expect(end[S.ofIt.key].autoAlpha).toBe(1);
    expect(end[S.heading.key].autoAlpha).toBe(1);
    for (const part of B.parts) {
      expect(end[part.key]["--k"]).toBe(1);
      expect(end[part.caption.key].autoAlpha).toBe(1);
    }
  });
});

describe("slide 4, chatbots to agents", () => {
  const id = stepOf("agents");
  const A = AGENTS;
  const L = A.loop;
  const line = playOf(id, A.line.key)[0];
  const landing = A.figures.map((entry) => startOf(id, entry.key));

  it("draws the line left to right, its first year as it starts and its last as it ends", () => {
    expect(startOf(id, A.years[0].key)).toBeLessThan(line.at + 0.3);
    expect(startOf(id, A.years[1].key)).toBeGreaterThan(line.at + line.duration - 0.3);
  });

  it("lands each figure on the line in turn as the line's front passes it, each named with its caption as it lands", () => {
    for (let i = 1; i < landing.length; i++) expect(landing[i] - landing[i - 1]).toBeGreaterThan(0.5);
    for (const [i, entry] of A.figures.entries()) {
      expect(landing[i]).toBeGreaterThan(line.at);
      expect(landing[i]).toBeLessThan(line.at + line.duration);
      expect(startOf(id, entry.name.key)).toBeGreaterThan(landing[i]);
      expect(startOf(id, entry.caption.key)).toBeGreaterThan(startOf(id, entry.name.key));
      expect(startOf(id, entry.caption.key) - landing[i]).toBeLessThan(0.6);
    }
    expect(startOf(id, personOf(A.figures[1].key))).toBeGreaterThan(landing[1]);
    expect(startOf(id, headOf(A.figures[2].key))).toBeGreaterThan(landing[2]);
  });


  it("then goes round the loop from its top, each stop arriving and lighting in turn as the front reaches it, named as it does, story line B as it goes", () => {
    const ring = playOf(id, L.key)[0];
    expect(ring.at).toBeGreaterThan(endOf(id, A.figures[2].caption.key));
    const arrive = L.stops.map((stop) => startOn(id, stop.key, "autoAlpha"));
    const light = L.stops.map((stop) => startOn(id, stop.key, "--k"));
    for (const [i, stop] of L.stops.entries()) {
      expect(arrive[i]).toBeGreaterThanOrEqual(ring.at);
      expect(arrive[i]).toBeLessThan(ring.at + ring.duration);
      expect(light[i]).toBeGreaterThan(arrive[i]);
      expect(startOf(id, stop.name.key)).toBeGreaterThan(arrive[i]);
      if (i > 0) expect(light[i] - light[i - 1]).toBeGreaterThan(0.4);
    }
  });

  it("closes the loop with the bar after the last stop lights, and names it", () => {
    const lastLight = Math.max(...L.stops.map((stop) => endOf(id, stop.key)));
    expect(startOf(id, L.bar.key)).toBeGreaterThan(lastLight);
    expect(startOf(id, L.bar.name.key)).toBeGreaterThan(startOf(id, L.bar.key));
  });

  it("ends on the timeline and the lit loop, closed by its bar", () => {
    const end = at(id);
    expect(end[A.line.key]["--d"]).toBe(1);
    for (const entry of A.figures) expect(end[entry.key].autoAlpha).toBe(1);
    expect(end[L.key]["--d"]).toBe(1);
    for (const stop of L.stops) expect(end[stop.key]).toMatchObject({ autoAlpha: 1, "--k": 1 });
    expect(end[L.bar.key]["--d"]).toBe(1);
    expect(end[L.bar.name.key].autoAlpha).toBe(1);
  });
});

describe("slide six work at scale", () => {
  const id = stepOf("review");
  it("ramps up production and audits only after the main stream completes", () => {
    expect(WORK[1].start - WORK[0].start).toBeGreaterThan(WORK[10].start - WORK[9].start);
    expect(AUDIT_AT).toBeGreaterThan(Math.max(...WORK.map(item => item.start + 2.3)));
    expect(endOf(id, REVIEW.forecast.key)).toBeLessThan(startOf(id, "story.review.a"));
  });
  it("keeps exceptions out of completed work and retains the final accumulation", () => {
    const end = at(id);
    expect(WORK.filter(item => item.exception >= 0)).toHaveLength(3);
    expect(WORK.filter(item => item.sample >= 0)).toHaveLength(3);
    for (const item of WORK) {
      expect(end[item.key]).toMatchObject({autoAlpha: 1, x: item.end.x, y: item.end.y});
      if (item.exception >= 0) expect(playOf(id, item.key).some(move => move.on.x === item.completed.x)).toBe(false);
    }
  });
});

describe("slide 5, what a fleet is", () => {
  const id = stepOf("fleet-defined");
  const F = FLEET;
  const K = F.keys;
  const cells = F.board.rows.flatMap((row) => row.cells);

  it("reveals complete groups from left to right without returning to earlier groups", () => {
    const leads = [...F.leads.keys, F.leads.desk.key, F.leads.name.key];
    const work = [F.board.key, ...cells.map(c => c.key), ...F.builders.keys, F.builders.name.key, K.key, K.gate.key, K.name.key, K.caption.key, K.ring.key, ...K.lines.map(l => l.key), ...F.splits.map(l => l.key)];
    const groups = [leads, work, [F.wall.key, F.wall.name.key], [...F.reviewers.keys, F.reviewers.name.key], [F.person.key, F.mark.key]];
    for (let i = 1; i < groups.length; i++) expect(Math.min(...groups[i].map(k => startOf(id, k)))).toBeGreaterThan(Math.max(...groups[i - 1].map(k => endOf(id, k))));
    for (const group of groups) expect(new Set(group.map(k => startOf(id, k))).size).toBe(1);
    expect(endOf(id, F.mark.key)).toBeLessThan(storyAt("fleet-defined", 0));
  });

  it("ends on the five groups, every cell filled, the keys agent in its gate with a line to each builder, the mark at the end", () => {
    const end = at(id);
    for (const cell of cells) expect(end[cell.key]).toMatchObject({ autoAlpha: 1, "--hold": 1, "--k": 1 });
    for (const key of [...F.leads.keys, ...F.builders.keys, ...F.reviewers.keys, K.key]) expect(end[key]).toMatchObject({ autoAlpha: 1, "--k": 1 });
    expect(end[K.gate.key]["--d"]).toBe(1);
    for (const line of K.lines) expect(end[line.key]["--d"]).toBe(1);
    for (const key of [K.ring.key, K.name.key, K.caption.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[F.wall.key]["--d"]).toBe(1);
    expect(end[F.mark.key]).toMatchObject({ autoAlpha: 1, "--d": 1 });
  });
});

describe("slide 6, most who rushed stumbled", () => {
  const id = stepOf("stumbled");
  const S = STUMBLED;

  it("raises the figure first, its caption with it, story line A with them", () => {
    const figure = startOf(id, S.figure.key);
    for (const card of S.cards) expect(startOf(id, card.key)).toBeGreaterThan(figure);
    expect(startOf(id, S.figure.caption.key) - figure).toBeLessThanOrEqual(0.2);
  });

  it("after a hold to read, settles the three cards in turn, each face, then its name, its line and its tag, story line B with the first", () => {
    const cards = S.cards.map((card) => startOf(id, card.key));
    for (let i = 1; i < cards.length; i++) expect(cards[i] - cards[i - 1]).toBeGreaterThan(1);
    for (const card of S.cards) {
      expect(startOf(id, card.name.key)).toBeGreaterThan(startOf(id, card.key));
      expect(startOf(id, card.what.key)).toBeGreaterThan(startOf(id, card.name.key));
      expect(startOf(id, card.tag.key)).toBeGreaterThan(startOf(id, card.what.key));
    }
  });

  it("draws the line under the three once they are all down, and its words come up last", () => {
    expect(startOf(id, S.line.key)).toBeGreaterThan(endOf(id, S.cards[2].tag.key));
    expect(startOf(id, S.label.key)).toBeGreaterThan(startOf(id, S.line.key));
  });

  it("ends on the figure, the three cards and the line", () => {
    const end = at(id);
    expect(end[S.figure.key].autoAlpha).toBe(1);
    for (const card of S.cards) for (const key of [card.key, card.name.key, card.what.key, card.tag.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[S.line.key]["--d"]).toBe(1);
    expect(end[S.label.key].autoAlpha).toBe(1);
  });
});

describe("the titles", () => {
  it("change at the start of each click but the first, the old one gone at once", () => {
    for (const [previous, next] of [["spending", "agents"], ["agents", "review"], ["review", "fleet-defined"], ["fleet-defined", "stumbled"]]) {
      const step = stepOf(next);
      expect(startOf(step, titleKey(previous))).toBe(0);
      expect(at(step)[titleKey(previous)].autoAlpha).toBe(0);
      expect(at(step)[titleKey(next)].yPercent).toBe(0);
    }
  });
});
