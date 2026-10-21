/**
 * Slides 16 and 17 as they play: the three outlines opening, crossed out and
 * stepping back behind the green scene, the tag last; then the open call
 * lighting the grid, the people walking to the table and the three chairs
 * growing. Each click follows its They see in order and ends on the picture
 * it describes.
 */
import { EASE } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { after, arrived, at, before, endOf, playOf, startOf, stepOf } from "./harness";
import { CONSORTIUM, SEAT_10 } from "./layout-consortium";
import { NOT_PROPOSING } from "./layout-not-proposing";

const N = NOT_PROPOSING;
const P = CONSORTIUM;

describe("slide 16", () => {
  const id = stepOf("not-proposing");
  const end = at(id);
  const outlines = N.outlines.map((outline) => outline.key);
  const strokes = N.outlines.flatMap((outline) => outline.cross.strokes.map((stroke) => stroke.key));

  it("opens the three outlines by their clip, one after another, left to right", () => {
    const opens = outlines.map((key) => playOf(id, key)[0]);
    for (const open of opens) expect(open.on).toMatchObject({ "--wr": 0 });
    for (let i = 1; i < opens.length; i++) expect(opens[i].at).toBeGreaterThan(opens[i - 1].at);
  });

  it("crosses each out with two drawn strokes once all three are open, one outline after another, with the first line", () => {
    const open = Math.max(...outlines.map((key) => arrived(id, key)));
    const starts = strokes.map((key) => startOf(id, key));
    expect(starts[0]).toBeGreaterThan(open);
    for (let i = 1; i < starts.length; i++) expect(starts[i]).toBeGreaterThan(starts[i - 1]);
    for (const key of strokes) expect(end[key]["--d"], key).toBe(1);
  });

  it("settles the outlines and their crosses at half strength, still legible, as the green scene draws below, after every cross, with the second line", () => {
    const crossed = Math.max(...strokes.map((key) => endOf(id, key)));
    for (const key of outlines) {
      const fade = playOf(id, key).at(-1)!;
      expect(fade.at, key).toBeGreaterThan(crossed);
      expect(end[key].autoAlpha, key).toBe(0.5);
    }
    expect(startOf(id, N.table.key)).toBeGreaterThan(crossed);
    expect(startOf(id, N.calendar.key)).toBeGreaterThan(startOf(id, N.table.key));
  });

  it("lands the tag at the foot last, its caption with it", () => {
    expect(startOf(id, N.tag.key)).toBeGreaterThan(endOf(id, N.calendar.name.key));
    expect(startOf(id, N.tag.caption.key) - startOf(id, N.tag.key)).toBeLessThan(0.5);
  });

  it("draws each cross inside its outline, before the name, so the name sits over the cross", () => {
    for (const outline of N.outlines) {
      const html = after(outline.key);
      const name = html.indexOf(`>${outline.text}<`);
      expect(name).toBeGreaterThan(-1);
      for (const stroke of outline.cross.strokes) {
        const at = html.indexOf(`data-build="${stroke.key}"`);
        expect(at, stroke.key).toBeGreaterThan(-1);
        expect(at, stroke.key).toBeLessThan(name);
      }
      expect(html.slice(0, name)).not.toContain("</div>");
    }
  });

  it("ends on the half-strength outlines above the table, calendar and tag", () => {
    expect(end[N.table.key]["--d"]).toBe(1);
    for (const key of [...N.table.chairs.map((chair) => chair.key), N.table.name.key, N.calendar.key, N.calendar.name.key, N.tag.key, N.tag.caption.key]) expect(end[key].autoAlpha, key).toBe(1);
  });
});

describe("slide 17", () => {
  const id = stepOf("consortium");
  const end = at(id);
  const walkers = P.boxes.flatMap((box) => (box.walker ? [box] : []));
  const windowLit = (key: string) => playOf(id, key).find((play) => play.on["--k"] === 1)!;
  const slide = playOf(id, P.card.key).find((play) => "x" in play.on)!;

  it("opens on the grid with five windows lit, a person beside each, before the card comes", () => {
    for (const n of P.early) {
      const box = P.boxes[n];
      expect(windowLit(box.window.key).at, box.key).toBeLessThan(slide.at);
      expect(startOf(id, box.walker!.key), box.key).toBeLessThan(slide.at);
    }
  });

  it("slides the card across at an even speed, each box lighting as the card's front reaches its column, with the first line", () => {
    expect(slide.ease).toBe("none");
    expect(slide.on.x).toBe(P.card.travel);
    for (const n of P.called) {
      const box = P.boxes[n];
      const due = slide.at + P.passes[box.column] * slide.duration;
      expect(windowLit(box.window.key).at - due, box.key).toBeGreaterThanOrEqual(0);
      expect(windowLit(box.window.key).at - due, box.key).toBeLessThan(0.25);
      expect(startOf(id, box.walker!.key), box.key).toBeCloseTo(windowLit(box.window.key).at, 6);
    }
    expect(end[P.card.key].autoAlpha).toBe(0);
  });

  it("never lights the two dark boxes", () => {
    for (const box of P.boxes.filter((b) => !b.lit)) expect(playOf(id, box.window.key).some((play) => play.on["--k"] === 1), box.key).toBe(false);
  });

  it("walks every person from its box to its seat, across and down on different curves, once the table is drawn, each window going dark", () => {
    const tableDrawn = startOf(id, P.table.key);
    for (const box of walkers) {
      const w = box.walker!;
      expect(before(id)[w.key]).toMatchObject({ autoAlpha: 0, x: w.from.x, y: w.from.y });
      const across = playOf(id, w.key).find((play) => play.on.x === 0)!;
      const down = playOf(id, w.key).find((play) => play.on.y === 0)!;
      expect(across.at, box.key).toBeGreaterThan(tableDrawn);
      expect(across.at).toBe(down.at);
      expect(across.ease).not.toBe(down.ease);
      expect([across.ease, down.ease]).toEqual([EASE.draw, EASE.out]);
      expect(end[w.key], box.key).toMatchObject({ autoAlpha: 1, x: 0, y: 0 });
      expect(end[box.window.key]["--k"], box.key).toBe(0);
    }
  });

  it("grows the three chairs of the departments that led once everyone is seated, their caption with them, and the second line with them", () => {
    const seated = Math.max(...walkers.map((box) => endOf(id, box.walker!.key)));
    const leading = P.table.seats.filter((seat) => seat.leading);
    const grows = (key: string) => playOf(id, key).find((play) => "--s" in play.on)!.at;
    for (const seat of leading) {
      expect(grows(seat.key), seat.key).toBeGreaterThan(seated);
      expect(end[seat.key]["--s"]).toBe(SEAT_10.grow);
    }
    expect(startOf(id, P.caption.key)).toBeGreaterThan(Math.min(...leading.map((seat) => grows(seat.key))));
  });

  it("ends on the table, the people round it and the grid behind with its boxes dimmed", () => {
    expect(end[P.table.key]["--d"]).toBe(1);
    for (const box of P.boxes) expect(end[box.key].autoAlpha, box.key).toBe(0.45);
    for (const key of [P.table.name.key, P.caption.key, ...P.table.seats.map((seat) => seat.key)]) expect(end[key].autoAlpha, key).toBe(1);
  });
});
