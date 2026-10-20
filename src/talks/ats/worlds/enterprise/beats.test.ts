/**
 * Each of Part 2's clicks, beat by beat, against what its They see says it
 * shows and in what order, and the flow every click keeps: the stage never
 * still for more than 3 s (flow.test.ts checks only the worlds the deck
 * lists, so it is checked here too).
 */
import { describe, expect, it } from "vitest";
import { CHAIN, HOLD } from "@/components/deck/kit";
import { storyKeysOf, titleKey } from "./layout";
import { AGENTS } from "./layout-agents";
import { FLEET } from "./layout-fleet";
import { REVIEW } from "./layout-review";
import { SPENDING } from "./layout-spending";
import { STUMBLED } from "./layout-stumbled";
import { ARRIVE } from "./moves";
import { at, elements, endOf, ids, playOf, playsAt, startOf, stepOf, world } from "./harness";
import { headOf, personOf } from "./parts-figures";

const storyAt = (pictureId: string, line: 0 | 1) => startOf(stepOf(pictureId), storyKeysOf(pictureId)[line]);
const storyEnd = (pictureId: string, line: 0 | 1) => endOf(stepOf(pictureId), storyKeysOf(pictureId)[line]);
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
    expect(still).toBeLessThanOrEqual(CHAIN.still);
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

  it("raises the two columns from the floor, the shorter first and the taller longer, each named as it tops out, story line A with them", () => {
    const [five, seventeen] = S.columns.map((column) => playOf(id, column.key)[0]);
    expect(startOf(id, S.floor.key)).toBeLessThanOrEqual(five.at);
    expect(seventeen.at).toBeGreaterThan(five.at);
    expect(seventeen.duration).toBeGreaterThan(five.duration);
    for (const column of S.columns) {
      const play = playOf(id, column.key)[0];
      expect(play.on).toEqual({ "--k": 1 });
      expect(startOf(id, column.name.key)).toBeGreaterThan(play.at);
      expect(startOf(id, column.name.key)).toBeLessThan(play.at + play.duration);
    }
    expect(storyAt("spending", 0)).toBeGreaterThan(seventeen.at);
    expect(storyAt("spending", 0)).toBeLessThan(endOf(id, S.columns[1].name.key));
  });

  it("then raises the figure beside them, its caption with it", () => {
    expect(startOf(id, S.figure.key)).toBeGreaterThan(endOf(id, S.columns[1].name.key));
    expect(startOf(id, S.figure.caption.key) - startOf(id, S.figure.key)).toBeLessThanOrEqual(0.2);
  });

  it("after a hold to read, draws the bar, splits it, names its parts, and fills them left to right, the middle one's bracket and caption with it, story line B as they fill", () => {
    const bar = startOf(id, B.key);
    expect(bar - endOf(id, storyKeysOf("spending")[0])).toBeGreaterThanOrEqual(HOLD.read);
    for (const split of B.splits) expect(startOf(id, split.key)).toBeGreaterThan(bar);
    const fills = B.parts.map((part) => playOf(id, part.key)[0]);
    for (const [i, part] of B.parts.entries()) {
      expect(startOf(id, part.name.key)).toBeLessThan(fills[0].at);
      if (i > 0) expect(fills[i].at).toBeGreaterThanOrEqual(fills[i - 1].at + fills[i - 1].duration);
    }
    expect(startOf(id, B.bracket.key)).toBeGreaterThan(fills[1].at);
    expect(startOf(id, B.bracket.key)).toBeLessThan(fills[1].at + fills[1].duration);
    expect(startOf(id, B.caption.key)).toBeLessThan(fills[1].at + fills[1].duration);
    expect(storyAt("spending", 1)).toBeGreaterThan(fills[0].at);
    expect(storyAt("spending", 1)).toBeLessThan(fills[2].at + fills[2].duration);
  });

  it("ends on the two columns, the figure and the three-part bar, its middle part filled", () => {
    const end = at(id);
    for (const column of S.columns) expect(end[column.key]["--k"]).toBe(1);
    expect(end[S.figure.key].autoAlpha).toBe(1);
    for (const part of B.parts) expect(end[part.key]["--k"]).toBe(1);
    expect(end[B.caption.key].autoAlpha).toBe(1);
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

  it("raises story line A while the figures land", () => {
    expect(storyAt("agents", 0)).toBeGreaterThan(landing[0]);
    expect(storyAt("agents", 0)).toBeLessThan(endOf(id, A.line.key));
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
    expect(storyAt("agents", 1)).toBeGreaterThan(ring.at);
    expect(storyAt("agents", 1)).toBeLessThan(ring.at + ring.duration);
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

describe("slide 4a, review moved off the person", () => {
  const id = stepOf("review");
  const R = REVIEW;
  const pages = R.stack.pages.map((page) => startOf(id, page.key));

  it("raises the two bars from the floor, the second longer, each named and captioned as it rises, story line A with them", () => {
    const [may, september] = R.bars.map((bar) => playOf(id, bar.key)[0]);
    expect(september.at).toBeGreaterThan(may.at);
    expect(september.duration).toBeGreaterThan(may.duration);
    for (const bar of R.bars) {
      const play = playOf(id, bar.key)[0];
      expect(startOf(id, bar.name.key)).toBeGreaterThan(play.at);
      expect(startOf(id, bar.caption.key)).toBeLessThan(play.at + play.duration);
    }
    expect(storyAt("review", 0)).toBeGreaterThan(september.at);
    expect(storyAt("review", 0)).toBeLessThan(september.at + september.duration);
  });

  it("then grows the stack page by page, bottom first, for about two seconds, beside the seated person, naming it once it towers", () => {
    expect(startOf(id, R.desk.key)).toBeGreaterThan(endOf(id, R.bars[1].caption.key) - 0.5);
    expect(pages[0]).toBeGreaterThan(startOf(id, R.seated.key));
    for (let i = 1; i < pages.length; i++) expect(pages[i]).toBeGreaterThan(pages[i - 1]);
    expect(pages.at(-1)! - pages[0]).toBeGreaterThan(1.5);
    expect(startOf(id, R.stack.name.key)).toBeGreaterThan(pages.at(-1)!);
  });

  it("then draws the funnel, named at its mouth, stands the person at its outlet and lands the mark, story line B with it", () => {
    const funnel = startOf(id, R.funnel.key);
    expect(funnel).toBeGreaterThan(endOf(id, R.stack.name.key) - 0.2);
    expect(startOf(id, R.funnel.name.key)).toBeGreaterThan(funnel);
    expect(startOf(id, R.standing.key)).toBeGreaterThan(funnel);
    expect(startOf(id, R.mark.key)).toBeGreaterThan(startOf(id, R.standing.key));
    expect(startOf(id, R.people.key)).toBeGreaterThan(startOf(id, R.mark.key));
    expect(storyAt("review", 1)).toBeGreaterThan(funnel);
    expect(storyAt("review", 1)).toBeLessThan(endOf(id, R.people.key));
  });

  it("lands the figure last, its caption with it", () => {
    expect(startOf(id, R.figure.key)).toBeGreaterThan(endOf(id, R.mark.key));
    expect(startOf(id, R.figure.caption.key) - startOf(id, R.figure.key)).toBeLessThanOrEqual(0.2);
  });

  it("ends on the two bars, the towering stack and the funnel with its person, mark and figure", () => {
    const end = at(id);
    for (const bar of R.bars) expect(end[bar.key]["--k"]).toBe(1);
    for (const page of R.stack.pages) expect(end[page.key].autoAlpha).toBe(1);
    expect(end[R.funnel.key]["--d"]).toBe(1);
    expect(end[R.mark.key]).toMatchObject({ autoAlpha: 1, "--d": 1 });
    expect(end[R.figure.key].autoAlpha).toBe(1);
    expect(end[R.figure.caption.key].autoAlpha).toBe(1);
  });
});

describe("slide 5, what a fleet is", () => {
  const id = stepOf("fleet-defined");
  const F = FLEET;
  const cells = F.board.rows.flatMap((row) => row.cells);

  it("lands the leads at their desk first, named, their rings filling, then draws the board beside them and splits it into rows", () => {
    const leads = Math.max(...F.leads.keys.map((key) => endOf(id, key)));
    expect(startOf(id, F.board.key)).toBeGreaterThan(startOf(id, F.leads.keys[0]));
    expect(startOf(id, F.board.key)).toBeGreaterThanOrEqual(leads - 0.5);
    for (const split of F.splits) expect(startOf(id, split.key)).toBeGreaterThan(startOf(id, F.board.key));
    const rows = F.board.rows.map((row) => startOf(id, row.cells[0].key));
    for (let i = 1; i < rows.length; i++) expect(rows[i]).toBeGreaterThan(rows[i - 1]);
  });

  it("lands the six builders under it and has them fill the cells together, a row at a time, story line A as they work", () => {
    const builders = Math.min(...F.builders.keys.map((key) => startOf(id, key)));
    expect(builders).toBeGreaterThan(startOf(id, F.board.key));
    const waves = F.board.rows.map((row) => row.cells.map((cell) => startOn(id, cell.key, "--k")));
    for (const wave of waves) expect(new Set(wave).size).toBe(1);
    for (let i = 1; i < waves.length; i++) expect(waves[i][0]).toBeGreaterThan(waves[i - 1][0]);
    for (const cell of cells) expect(startOn(id, cell.key, "--hold")).toBeLessThan(startOn(id, cell.key, "--k"));
    expect(storyAt("fleet-defined", 0)).toBeGreaterThan(builders);
    expect(storyAt("fleet-defined", 0)).toBeLessThan(waves[2][0]);
  });

  it("then draws the wall, named, story line B with it, and only after it the reviewers come and pass the cells row by row", () => {
    const filled = Math.max(...cells.flatMap((cell) => playOf(id, cell.key).filter((play) => "--k" in play.on).map((play) => play.at + play.duration)));
    const wall = startOf(id, F.wall.key);
    expect(wall).toBeGreaterThanOrEqual(filled);
    expect(startOf(id, F.wall.name.key)).toBeGreaterThan(wall);
    expect(storyAt("fleet-defined", 1)).toBeGreaterThan(wall);
    const reviewers = Math.min(...F.reviewers.keys.map((key) => startOf(id, key)));
    expect(reviewers).toBeGreaterThan(endOf(id, F.wall.key));
    const passes = F.board.rows.map((row) => startOn(id, row.cells[0].key, "--pass"));
    expect(passes[0]).toBeGreaterThan(reviewers);
    for (let i = 1; i < passes.length; i++) expect(passes[i]).toBeGreaterThan(passes[i - 1]);
  });

  it("stands the person last and lands the orange mark, the slide's last move", () => {
    const passed = Math.max(...cells.map((cell) => endOf(id, cell.key)));
    expect(startOf(id, F.person.key)).toBeGreaterThan(passed - 0.5);
    expect(startOf(id, F.mark.key)).toBeGreaterThan(startOf(id, F.person.key));
    expect(endOf(id, F.mark.key)).toBe(Math.max(...playsAt(id).map((play) => play.at + play.duration)));
  });

  it("ends on the four groups in a row, every cell filled and passed, the mark at the end", () => {
    const end = at(id);
    for (const cell of cells) expect(end[cell.key]).toMatchObject({ autoAlpha: 1, "--hold": 1, "--k": 1, "--pass": 1 });
    for (const key of [...F.leads.keys, ...F.builders.keys, ...F.reviewers.keys]) expect(end[key]).toMatchObject({ autoAlpha: 1, "--k": 1 });
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
    expect(storyAt("stumbled", 0)).toBeGreaterThan(figure);
    expect(storyAt("stumbled", 0)).toBeLessThan(endOf(id, S.figure.caption.key));
  });

  it("after a hold to read, settles the three cards in turn, each face, then its name, its line and its tag, story line B with the first", () => {
    const cards = S.cards.map((card) => startOf(id, card.key));
    expect(cards[0] - storyEnd("stumbled", 0)).toBeGreaterThanOrEqual(HOLD.read);
    for (let i = 1; i < cards.length; i++) expect(cards[i] - cards[i - 1]).toBeGreaterThan(1);
    for (const card of S.cards) {
      expect(startOf(id, card.name.key)).toBeGreaterThan(startOf(id, card.key));
      expect(startOf(id, card.what.key)).toBeGreaterThan(startOf(id, card.name.key));
      expect(startOf(id, card.tag.key)).toBeGreaterThan(startOf(id, card.what.key));
    }
    expect(storyAt("stumbled", 1)).toBeGreaterThan(cards[0]);
    expect(storyAt("stumbled", 1)).toBeLessThan(cards[1]);
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
