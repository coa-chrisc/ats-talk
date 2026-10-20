/**
 * Slides 25 to 27, three tools the team runs: what each one click does to
 * its drawing, in the order the script's They see gives, and the picture it
 * ends on.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { labelsOf } from "./layout";
import { AMANDA, FORESIGHT, GRANTS } from "./layout-tools";
import { at, endOf, ends, inside, markup, overlaps, playOf, playsAt, startOf, stepOf, tagOf } from "./harness";

const storyAt = (pictureId: string, line: 0 | 1) => storyKeys(storyId(pictureId), 2)[line];
/** A CSS-style cubic bezier ease from (0,0) to (1,1): its progress at time t, solved by bisection on x. */
type Ease = readonly [number, number, number, number];
const PAGE_EASE: Ease = [0.2, 0, 0, 1];
const CARRY_EASE: Ease = [0.5, 0, 0.15, 1];
const cubic = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s ** 2 * (1 - s) + s ** 3;
const bezier = ([x1, y1, x2, y2]: Ease, t: number) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (cubic(x1, x2, mid) < t) lo = mid;
    else hi = mid;
  }
  return cubic(y1, y2, (lo + hi) / 2);
};
/** When the last move of a step starts. */
const lastStart = (step: string) => Math.max(...playsAt(step).map((play) => play.at));

describe("25, Foresight", () => {
  const P = stepOf("foresight");
  const F = FORESIGHT;
  const after = at(P);

  it("brings the band of sources in a row at a time under the moon, before the funnel draws", () => {
    const rows = F.band.rowKeys.map((key) => startOf(P, key));
    expect(rows[0]).toBeLessThan(rows[1]);
    expect(rows[1]).toBeLessThan(rows[2]);
    expect(startOf(P, F.moon.key)).toBeLessThan(startOf(P, F.funnel.key));
    expect(startOf(P, F.funnel.key)).toBeGreaterThanOrEqual(endOf(P, F.band.rowKeys[2]) - 0.3);
  });

  it("pours the stream into the drawn funnel, and lights each priority tile as the pour falls through it", () => {
    const drop = playOf(P, F.stream.key).find((play) => play.on.y === F.stream.drop)!;
    expect(drop).toBeDefined();
    expect(startOf(P, F.stream.key)).toBeGreaterThanOrEqual(startOf(P, F.funnel.key));
    for (const tile of F.tiles) {
      expect(startOf(P, tile.key), tile.key).toBeLessThan(drop.at);
      const lit = playOf(P, tile.key).find((play) => play.on["--k"] === 1)!;
      expect(lit.at, tile.key).toBeGreaterThanOrEqual(drop.at);
      expect(lit.at, tile.key).toBeLessThan(ends(drop));
    }
    // The pour starts inside the funnel's mouth, every dot clear of the walls at its height.
    for (const dot of F.stream.dots) {
      const walls = F.funnel.wallsAt(dot.y);
      expect(dot.x - F.stream.r, `${dot.x},${dot.y}`).toBeGreaterThan(walls.left + 8);
      expect(dot.x + F.stream.r, `${dot.x},${dot.y}`).toBeLessThan(walls.right - 8);
    }
    // The tiles sit inside the funnel's walls at their height, clear of both.
    for (const tile of F.tiles) {
      for (const y of [tile.at.y, tile.at.y + tile.at.h]) {
        const walls = F.funnel.wallsAt(y);
        expect(tile.at.x, tile.key).toBeGreaterThan(walls.left + 8);
        expect(tile.at.x + tile.at.w, tile.key).toBeLessThan(walls.right - 8);
      }
    }
    expect(after[F.stream.key]).toMatchObject({ autoAlpha: 0 });
    for (const tile of F.tiles) expect(after[tile.key], tile.key).toMatchObject({ "--k": 1 });
  });

  it("drops the few signals out of the spout once the tiles have scored, then gathers them into the brief beside them", () => {
    const lastLit = Math.max(...F.tiles.map((tile) => playOf(P, tile.key).find((play) => play.on["--k"] === 1)!.at));
    expect(startOf(P, F.signals.key)).toBeGreaterThan(lastLit);
    expect(startOf(P, F.page.key)).toBeGreaterThanOrEqual(endOf(P, F.signals.key));
    // The page is gathered beside the signals, right of the spout and left of the table.
    const gathered = F.page.at.x + F.page.from;
    expect(gathered).toBeGreaterThan(Math.max(...F.signals.dots.map((dot) => dot.x)));
    expect(gathered + F.page.at.w).toBeLessThan(F.table.x0);
    expect(startOf(P, F.page.lines.key)).toBeGreaterThan(startOf(P, F.page.key));
  });

  it("slides the brief onto the table, landing once the table is drawn, and leaves it standing on the table top", () => {
    const slide = playOf(P, F.page.key).find((play) => play.on.x === 0 && play.on.autoAlpha === undefined)!;
    expect(slide).toBeDefined();
    expect(slide.at).toBeGreaterThan(startOf(P, F.table.key));
    expect(ends(slide)).toBeGreaterThanOrEqual(endOf(P, F.table.key));
    expect(after[F.page.key]).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
    expect(F.page.at.y + F.page.at.h).toBe(F.table.y - 2);
    expect(F.page.at.x).toBeGreaterThan(F.table.legs[0]);
    expect(F.page.at.x + F.page.at.w).toBeLessThan(F.table.legs[1]);
  });

  it("gathers the brief below the spout, right of the tube, and carries it up to the table without crossing the funnel's right wall", () => {
    const start = { x: F.page.at.x + F.page.from, y: F.page.at.y + F.page.below };
    expect(start.y).toBeGreaterThan(F.funnel.tube);
    expect(start.x).toBeGreaterThan(F.funnel.wallsAt(F.funnel.spout.y).right + 8);
    const along = playOf(P, F.page.key).find((play) => play.on.x === 0 && play.on.y === undefined)!;
    const up = playOf(P, F.page.key).find((play) => play.on.y === 0 && play.on.x === undefined)!;
    expect([along.at, along.duration]).toEqual([up.at, up.duration]);
    // Sample the travel on the two eases (engine/gsap.ts): wherever the page's top is level with the funnel, its left edge is right of the wall there.
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = F.page.at.x + F.page.from * (1 - bezier(PAGE_EASE, t));
      const y = F.page.at.y + F.page.below * (1 - bezier(CARRY_EASE, t));
      if (y > F.funnel.mouth.y && y < F.funnel.tube) expect(x, `t=${t}`).toBeGreaterThan(F.funnel.wallsAt(Math.min(y, F.funnel.spout.y)).right + 8);
    }
  });

  it("puts the tag under the brief's table, centred on it", () => {
    expect(F.tag.at.y).toBeGreaterThan(F.table.foot);
    expect(F.tag.at.x + F.tag.at.w / 2).toBe((F.table.x0 + F.table.x1) / 2);
  });

  it("brings its labels up in the order the script shows them, and ends on the tag, the click's last move", () => {
    expect([F.sources.text, F.priorities.text, F.signalsLabel.text, F.page.title.text, F.reviews.text, ...F.tag.lines]).toEqual(labelsOf("foresight"));
    const order = [F.sources.key, F.priorities.key, F.signalsLabel.key, F.page.key, F.reviews.key, F.tag.key].map((key) => startOf(P, key));
    for (let i = 1; i < order.length; i++) expect(order[i]).toBeGreaterThan(order[i - 1]);
    expect(startOf(P, F.tag.key)).toBe(lastStart(P));
    expect(startOf(P, storyAt("foresight", 0))).toBeLessThan(startOf(P, F.page.key));
    expect(startOf(P, storyAt("foresight", 1))).toBeGreaterThan(startOf(P, F.page.key));
    expect(after[F.funnel.key]).toMatchObject({ "--d": 1 });
  });
});

describe("26, GrantScope and PolicyPulse", () => {
  const P = stepOf("grantscope");
  const G = GRANTS;
  const after = at(P);
  const strong = G.cards.filter((card) => card.strong);
  const weak = G.cards.filter((card) => !card.strong);
  const [LEFT, RIGHT] = G.panels.map((panel) => panel.at);

  it("scores the grants one at a time over the tray alone, with no scoring bar or slider", () => {
    expect(markup).not.toMatch(/grantscope\.(scorer|lane|waiting|timeline")/);
    expect(startOf(P, G.tray.key)).toBeLessThan(Math.min(...G.cards.map((card) => playOf(P, card.key).find((play) => play.on["--k"] === 1 || play.on.autoAlpha === 0)!.at)));
    const scored = G.cards.map((card) => playOf(P, card.key).find((play) => play.on["--k"] === 1 || play.on.autoAlpha === 0)!.at);
    for (let i = 1; i < scored.length; i++) expect(scored[i]).toBeGreaterThan(scored[i - 1]);
    for (const card of G.cards) expect(inside(card.at, LEFT), card.key).toBe(true);
  });

  it("tints each strong fit, then drops it into the tray, one to a place, and fades the rest where they sat", () => {
    expect(strong).toHaveLength(3);
    const places = strong.map((card) => card.at.x + card.to);
    expect(new Set(places).size).toBe(3);
    for (const card of strong) {
      const tint = playOf(P, card.key).find((play) => play.on["--k"] === 1)!;
      const drop = playOf(P, card.key).find((play) => play.on.x === card.to && play.on.y === card.drop)!;
      expect(drop.at, card.key).toBeGreaterThan(tint.at);
      expect(after[card.key], card.key).toMatchObject({ x: card.to, y: card.drop, "--k": 1 });
      expect(inside({ ...card.at, x: card.at.x + card.to, y: card.at.y + card.drop }, G.tray.at), card.key).toBe(true);
    }
    for (const card of weak) {
      expect(card.to, card.key).toBe(0);
      expect(after[card.key], card.key).toMatchObject({ autoAlpha: 0 });
    }
    expect(startOf(P, G.strongFit.key)).toBeGreaterThan(startOf(P, strong[0].key));
    expect(inside(G.strongFit.at, LEFT) && inside(G.millions.at, LEFT)).toBe(true);
    expect(overlaps(G.strongFit.at, G.millions.at)).toBe(false);
  });

  it("turns three bills off the stack into summaries in turn, alongside the grants", () => {
    const turns = G.turns.map((turn) => startOf(P, turn.key));
    for (let i = 1; i < turns.length; i++) expect(turns[i]).toBeGreaterThan(turns[i - 1]);
    expect(turns[0]).toBeLessThan(Math.max(...G.cards.map((card) => endOf(P, card.key))));
    for (const turn of G.turns) expect(after[turn.key], turn.key).toMatchObject({ autoAlpha: 1, x: turn.to, "--k": 1 });
    expect(startOf(P, G.summary.key)).toBeGreaterThan(turns[2]);
    expect(G.turns.every((turn) => inside({ ...turn.at, x: turn.at.x + turn.to }, RIGHT))).toBe(true);
  });

  it("settles a navy Validated tag on each panel once both panels have played, then drops each panel's own timeline from it", () => {
    const played = Math.max(...[...G.cards, ...G.turns].map((part) => endOf(P, part.key)));
    for (const tag of G.validated) {
      expect(tag.lines).toEqual(["Validated"]);
      expect(startOf(P, tag.key), tag.key).toBeGreaterThanOrEqual(played);
      expect(tagOf(tag.key)).toContain("backup-tag--solid");
    }
    G.validated.forEach((tag, i) => expect(inside(tag.at, G.panels[i].at), tag.key).toBe(true));
    expect(G.timelines).toHaveLength(2);
    G.timelines.forEach((line, i) => {
      const panel = G.panels[i].at;
      expect(startOf(P, line.join.key), line.key).toBeGreaterThan(startOf(P, G.validated[i].key));
      expect(startOf(P, line.key), line.key).toBeGreaterThanOrEqual(startOf(P, line.join.key));
      // Directly under its own panel, joined to the panel's foot.
      expect(line.x0).toBeGreaterThanOrEqual(panel.x);
      expect(line.x1).toBeLessThanOrEqual(panel.x + panel.w);
      expect(line.join.y0).toBe(panel.y + panel.h);
      expect(line.join.y1).toBe(line.y);
      expect(line.join.x).toBeGreaterThanOrEqual(line.x0);
      for (const point of line.points) {
        expect(point.at.x, point.key).toBeGreaterThan(line.x0);
        expect(point.label.at.x + point.label.at.w, point.key).toBeLessThanOrEqual(panel.x + panel.w);
        expect(after[point.key], point.key).toMatchObject({ "--k": 1 });
      }
    });
    expect(G.timelines[0].points.map((point) => point.label.text)).toEqual(["FY27 demand request"]);
    expect(G.timelines[1].points.map((point) => point.label.text)).toEqual(["First built", "Pilot users"]);
    const [built, pilot] = G.timelines[1].points;
    expect(startOf(P, pilot.key)).toBeGreaterThan(startOf(P, built.key));
    // Each point's words centred under it, below the rule, and the two on the right apart.
    for (const point of G.timelines.flatMap((line) => line.points)) {
      expect(point.label.at.x + point.label.at.w / 2, point.key).toBe(point.at.x);
      expect(point.label.at.y, point.key).toBeGreaterThan(point.at.y + G.r);
    }
    expect(built.label.at.x + built.label.at.w).toBeLessThanOrEqual(pilot.label.at.x);
    expect(G.timelines.flatMap((line) => line.points.map((point) => point.label.text))).toEqual(labelsOf("grantscope").slice(-3));
  });
});

describe("27, AMANDA", () => {
  const P = stepOf("amanda");
  const A = AMANDA;
  const after = at(P);

  it("turns the wall of code into documentation page by page, top row first, as the strip of 21 days fills", () => {
    expect(A.pages).toHaveLength(16);
    expect(A.days).toHaveLength(21);
    const docs = A.pages.map((page) => startOf(P, page.doc));
    for (let i = 1; i < docs.length; i++) expect(docs[i]).toBeGreaterThan(docs[i - 1]);
    const days = A.days.map((day) => startOf(P, day.key));
    const lit = A.days.map((day) => playOf(P, day.key).find((play) => play.on["--k"] === 1)!.at);
    for (let i = 1; i < lit.length; i++) expect(lit[i]).toBeGreaterThan(lit[i - 1]);
    expect(Math.min(...days)).toBeLessThan(docs[0]);
    // The strip keeps pace with the pages: it starts with the first page and lights its last day before the last page has turned.
    expect(lit[0]).toBeCloseTo(docs[0], 5);
    expect(lit[20]).toBeLessThan(endOf(P, A.pages[15].doc));
    for (const page of A.pages) expect(after[page.doc], page.doc).toMatchObject({ "--k": 1 });
    // The "Legacy code" label stays in the label colour: it is never dimmed.
    expect(after[A.legacy.key]).toMatchObject({ autoAlpha: 1 });
    expect(playOf(P, A.legacy.key).every((play) => play.on.autoAlpha === undefined || play.on.autoAlpha === 1)).toBe(true);
    expect(tagOf(A.legacy.key)).toContain("backup-word--strong");
  });

  it("brings the first story line in within three seconds, so the story band is not empty while the pages turn", () => {
    expect(startOf(P, storyAt("amanda", 0))).toBeGreaterThanOrEqual(2);
    expect(startOf(P, storyAt("amanda", 0))).toBeLessThanOrEqual(3);
  });

  it("draws two bars on one baseline once the pages are done: a sliver for ours, then the tall grey vendor quote", () => {
    expect(A.ours.at.y + A.ours.at.h).toBe(A.axis.y);
    expect(A.vendor.at.y + A.vendor.at.h).toBe(A.axis.y);
    expect(A.ours.at.h).toBe(4);
    expect(A.vendor.at.h).toBeGreaterThan(50 * A.ours.at.h);
    expect(A.ours.at.w).toBe(A.vendor.at.w);
    const turned = Math.max(...A.pages.map((page) => endOf(P, page.doc)));
    expect(startOf(P, A.axis.key)).toBeGreaterThanOrEqual(turned);
    expect(startOf(P, A.ours.key)).toBeLessThan(startOf(P, A.vendor.key));
    expect(after[A.ours.key]).toMatchObject({ "--k": 1 });
    expect(after[A.vendor.key]).toMatchObject({ "--k": 1 });
    expect(tagOf(A.vendor.key)).toBe('<g class="backup-bar" data-build="amanda.vendor">');
    expect([A.oursLabel.text, A.vendorLabel.text, A.top.text]).toEqual(labelsOf("amanda").slice(3, 6));
    expect(A.top.text).toBe("More than two million dollars");
  });

  it("puts the projected tag under the bars after the vendor bar lands, dashed and grey, and the second story line after it", () => {
    expect(A.tag.lines).toEqual(["Projected, not booked"]);
    expect(tagOf(A.tag.key)).toContain("backup-tag--projected");
    expect(startOf(P, A.tag.key)).toBeGreaterThanOrEqual(endOf(P, A.vendor.key));
    expect(A.tag.at.y).toBeGreaterThan(A.axis.y);
    expect(A.tag.at.x).toBeGreaterThanOrEqual(A.ours.at.x);
    expect(A.tag.at.x + A.tag.at.w).toBeLessThanOrEqual(A.vendor.at.x + A.vendor.at.w);
    expect(startOf(P, storyAt("amanda", 1))).toBeGreaterThan(startOf(P, A.tag.key));
    expect(startOf(P, storyAt("amanda", 1))).toBe(lastStart(P));
  });
});
