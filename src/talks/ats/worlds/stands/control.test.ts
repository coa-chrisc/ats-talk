/**
 * Slide 11a's click, beat by beat, against what its They see says: the
 * honesty caption with the first thing drawn; the card to the shelf, its
 * socket lighting, the card clicking into its screen; the boundary and the
 * record filling while the card stays put; the second card stopped dead at
 * the closed gate and a still moment; the reviewer, the magnifier and the
 * orange mark; and last the slot at the shelf's end becoming a screen. And
 * what the picture is drawn with: the department map's gate, no sketch
 * glyph, no eye; the cards over the sockets, each holed in its own shape.
 */
import { describe, expect, it } from "vitest";
import { box, type Box } from "@/components/deck/kit";
import { at, endOf, markup, playOf, playsAt, startOf, stepOf, tagOf } from "./harness";
import { CONTROL, cardBox, controlRows, shapePath } from "./layout-control";
import { overlaps } from "./harness";

describe("slide 11a, approved tools", () => {
  const id = stepOf("control");
  const C = CONTROL;
  const [upper, lower] = C.cards;
  const legs = (key: string) => playOf(id, key).filter((play) => "--x" in play.on);
  const leg = (key: string, stop: { x: number; y: number }) => legs(key).find((play) => play.on["--x"] === stop.x && play.on["--y"] === stop.y)!;
  const end = (play: { at: number; duration: number }) => play.at + play.duration;
  const lit = () => playOf(id, C.sockets.lit.key).filter((play) => "--k" in play.on);

  it("brings the honesty caption with the first thing drawn, the member of staff", () => {
    expect(startOf(id, C.honesty.key)).toBe(startOf(id, C.staff.key));
  });

  it("starts the card only once the shelf and its three screens are drawn", () => {
    const first = legs(upper.key)[0];
    for (const tool of C.tools.slice(0, 3)) expect(first.at, tool.key).toBeGreaterThanOrEqual(endOf(id, tool.key) - 0.1);
    expect(first.at).toBeGreaterThanOrEqual(endOf(id, C.shelf.key));
  });

  it("rides each card at one speed, easing out only into its stop", () => {
    const rides = [
      [upper, [upper.stops.fork, upper.stops.branch, upper.stops.shelf]],
      [lower, [lower.stops.fork, lower.stops.branch, lower.stops.gate]],
    ] as const;
    for (const [card, stops] of rides) {
      let here = { x: 0, y: 0 };
      for (const stop of stops) {
        const play = leg(card.key, stop);
        const plain = Math.hypot(stop.x - here.x, stop.y - here.y) / play.duration;
        expect(play.ease === "none" ? plain : 2 * plain, `${card.key} to ${stop.x}`).toBeCloseTo(700, 0);
        here = stop;
      }
    }
  });

  it("lights the round socket as the card stops short of the shelf, then clicks the card into that screen: a slide in and a short snap up, no overshoot", () => {
    const stop = end(leg(upper.key, upper.stops.shelf));
    const [light] = lit();
    expect(lit()).toHaveLength(1);
    expect(light.at).toBeCloseTo(stop, 6);
    const slide = leg(upper.key, upper.stops.tool);
    const snap = leg(upper.key, upper.stops.seat);
    expect(slide.at).toBeGreaterThanOrEqual(end(light) - 1e-9);
    expect(snap.at).toBeCloseTo(end(slide), 6);
    // The snap: straight up, a few pixels, quick, on a curve that does not pass its seat.
    expect(upper.stops.seat.x).toBe(upper.stops.tool.x);
    expect(upper.stops.tool.y - upper.stops.seat.y).toBeGreaterThan(0);
    expect(upper.stops.tool.y - upper.stops.seat.y).toBeLessThanOrEqual(16);
    expect(snap.duration).toBeLessThanOrEqual(0.2);
    for (const play of [slide, snap]) expect(play.ease).not.toMatch(/back|elastic|bounce/);
    expect(startOf(id, C.fits.key) - light.at).toBeLessThan(0.8);
  });

  it("brings the words beside the first screen only once the card has gone past them into it", () => {
    const from = cardBox(upper, upper.stops.branch);
    const to = cardBox(upper, upper.stops.shelf);
    const path: Box = box(from.x, Math.min(from.y, to.y), to.x + to.w - from.x, from.h);
    const crossed = controlRows().filter((row) => overlaps(row.box, path));
    expect(crossed.map((row) => row.key)).toEqual(expect.arrayContaining([C.fits.key]));
    const inside = end(leg(upper.key, upper.stops.tool));
    for (const row of crossed) expect(startOf(id, row.key.replace(/\.\d+$/, "")), row.key).toBeGreaterThanOrEqual(inside - 1e-9);
  });

  it("then draws the boundary round that screen and fills the record under it line by line while the card stays put, the whole fit taking about 2.5 s", () => {
    const seated = end(leg(upper.key, upper.stops.seat));
    expect(startOf(id, C.boundary.key)).toBeGreaterThanOrEqual(seated);
    expect(startOf(id, C.boundary.caption.key) - startOf(id, C.boundary.key)).toBeLessThan(0.3);
    expect(startOf(id, C.ledger.key)).toBeGreaterThan(startOf(id, C.boundary.key));
    const lines = C.ledger.lines.map((line) => startOf(id, line.key));
    for (let i = 1; i < lines.length; i++) expect(lines[i]).toBeGreaterThan(lines[i - 1]);
    const recorded = Math.max(...C.ledger.lines.map((line) => endOf(id, line.key)));
    expect(legs(upper.key).filter((play) => end(play) > seated + 1e-9)).toEqual([]);
    const fit = recorded - lit()[0].at;
    expect(fit).toBeGreaterThanOrEqual(2);
    expect(fit).toBeLessThanOrEqual(2.7);
  });

  it("sends the second card only once the record is filled, and lights no socket for it", () => {
    const recorded = Math.max(...C.ledger.lines.map((line) => endOf(id, line.key)));
    expect(startOf(id, lower.key)).toBeGreaterThanOrEqual(recorded);
    for (const play of lit()) expect(play.at).toBeLessThan(startOf(id, lower.key));
    expect(playOf(id, C.sockets.added.key).every((play) => play.at > endOf(id, lower.key))).toBe(true);
  });

  it("stops the second card dead at the closed gate and holds the stage still for 0.4 to 0.7 s before the reviewer comes", () => {
    const last = legs(lower.key).at(-1)!;
    expect(last.on).toMatchObject({ "--x": lower.stops.gate.x, "--y": lower.stops.gate.y });
    expect(last.ease).toBe("none");
    const stop = end(last);
    const next = Math.min(...playsAt(id).filter((play) => play.at > stop - 1e-9).map((play) => play.at));
    expect(next - stop).toBeGreaterThanOrEqual(0.4);
    expect(next - stop).toBeLessThanOrEqual(0.7);
    expect(startOf(id, C.reviewer.key)).toBeCloseTo(next, 6);
    expect(playsAt(id).filter((play) => play.at < next && end(play) > stop + 1e-6)).toEqual([]);
  });

  it("passes the magnifier over the stopped card once and brings it back to rest in the reviewer's hand before the mark", () => {
    const moves = legs(C.lens.key);
    expect(moves.map((play) => [play.on["--x"], play.on["--y"]])).toEqual([[C.lens.to.x, C.lens.to.y], [0, 0]]);
    expect(moves[1].at).toBeGreaterThan(end(moves[0]));
    for (const play of moves) expect(play.ease).toBe("power1.out");
    expect(at(id)[C.lens.key]).toMatchObject({ "--x": 0, "--y": 0 });
    expect(startOf(id, C.lens.key)).toBeGreaterThan(startOf(id, C.reviewer.key));
    expect(startOf(id, C.mark.key)).toBeGreaterThanOrEqual(endOf(id, C.lens.key));
    expect(startOf(id, C.mark.words.key) - startOf(id, C.mark.key)).toBeLessThan(0.2);
  });

  it("then a grey dashed slot at the shelf's end, its socket turning orange, and last the slot becoming a solid screen", () => {
    const slot = startOf(id, C.slot.key);
    expect(slot).toBeGreaterThanOrEqual(endOf(id, C.mark.key) - 0.1);
    const [shows] = playOf(id, C.sockets.added.key).filter((play) => "autoAlpha" in play.on);
    const [orange] = playOf(id, C.sockets.added.key).filter((play) => "--k" in play.on);
    expect(shows.at).toBeGreaterThanOrEqual(slot);
    expect(shows.at).toBeLessThan(endOf(id, C.slot.key) - 0.3);
    expect(orange.at).toBeGreaterThanOrEqual(end(shows));
    const solid = playOf(id, C.tools[3].key).filter((play) => "--d" in play.on);
    expect(solid).toHaveLength(1);
    expect(solid[0].at).toBeGreaterThanOrEqual(end(orange));
    const [gone] = playOf(id, C.slot.key).filter((play) => play.on.autoAlpha === 0);
    expect(gone.at).toBeGreaterThan(solid[0].at);
    const last = Math.max(...playsAt(id).map(end));
    expect(Math.max(end(solid[0]), end(gone))).toBeCloseTo(last, 6);
  });

  it("ends with one card seated in its tool above its record, one stopped at the closed gate, and a new tool on the shelf", () => {
    const final = at(id);
    expect(final[upper.key]).toMatchObject({ "--x": upper.stops.seat.x, "--y": upper.stops.seat.y });
    expect(final[lower.key]).toMatchObject({ "--x": lower.stops.gate.x, "--y": lower.stops.gate.y });
    expect(final[C.sockets.lit.key]["--k"]).toBe(1);
    expect(final[C.boundary.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
    for (const line of C.ledger.lines) expect(final[line.key]["--d"], line.key).toBe(1);
    for (const tool of C.tools) expect(final[tool.key]["--d"], tool.key).toBe(1);
    expect(final[C.sockets.added.key]).toMatchObject({ autoAlpha: 1, "--k": 1 });
    expect(final[C.slot.key].autoAlpha).toBe(0);
  });
});

describe("slide 11a's drawing", () => {
  const C = CONTROL;
  const own = markup.slice(markup.indexOf(`data-build="${C.marks}"`), markup.indexOf(`data-build="exists.marks"`));

  it("draws its one gate with the department map's gate, closed", () => {
    expect(tagOf(C.gate.key)).toContain('class="sn-closed-gate"');
    expect(own.match(/class="sn-closed-gate"/g) ?? []).toHaveLength(1);
    expect(own).not.toContain("sn-closed-gate__arm");
  });

  it("uses no sketch glyph, no eye and no cross, and the story drawings' ink nowhere", () => {
    expect(own).not.toMatch(/sketch|sd-|eye|cross/i);
  });

  it("marks the three screens with a circle, a square and a triangle socket, and the added one with a diamond", () => {
    expect(C.tools.map((tool) => tool.shape)).toEqual(["circle", "square", "triangle", "diamond"]);
    for (const tool of C.tools.slice(0, 3)) expect(tagOf(tool.key), tool.key).toBeDefined();
    for (const tool of C.tools.slice(0, 3)) expect(own.slice(own.indexOf(`data-build="${tool.key}"`)), tool.key).toContain(`d="${tool.rim}"`);
    expect(C.sockets.lit.d).toBe(C.tools[0].rim);
    expect(C.sockets.added.d).toBe(shapePath("diamond", C.tools[3].socket));
  });

  it("holes the first card round and the second in a diamond, and draws both over the screens and sockets, so a seated card's hole shows its socket", () => {
    const [upper, lower] = C.cards;
    expect([upper.shape, lower.shape]).toEqual(["circle", "diamond"]);
    expect(upper.page).toContain(shapePath("circle", { x: upper.at.x + 20, y: upper.at.y + 30 }));
    expect(lower.page).toContain(shapePath("diamond", { x: lower.at.x + 20, y: lower.at.y + 30 }));
    expect(tagOf(upper.key)).toBeDefined();
    expect(own).toMatch(/fill-rule="evenodd"/);
    const last = Math.max(...[...C.tools.map((tool) => tool.key), C.sockets.lit.key, C.sockets.added.key].map((key) => markup.indexOf(`data-build="${key}"`)));
    for (const card of C.cards) expect(markup.indexOf(`data-build="${card.key}"`), card.key).toBeGreaterThan(last);
  });
});
