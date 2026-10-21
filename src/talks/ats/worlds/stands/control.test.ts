/**
 * Slide 11a's click, beat by beat, against what its They see says: the
 * honesty caption with the first thing drawn; the card through the gate
 * that opens, to the screen and the record; the second card stopped dead at
 * the closed gate and a still moment; the reviewer, the magnifier, the
 * orange mark and the line back up, last. And what the picture is drawn
 * with: the department map's gates, no sketch glyph, no eye.
 */
import { describe, expect, it } from "vitest";
import { at, endOf, markup, playOf, playsAt, startOf, stepOf, tagOf } from "./harness";
import { CONTROL } from "./layout-control";

describe("slide 11a, approved tools", () => {
  const id = stepOf("control");
  const C = CONTROL;
  const [upper, lower] = C.cards;
  const legs = (key: string) => playOf(id, key).filter((play) => "--x" in play.on);

  it("brings the honesty caption with the first thing drawn, the member of staff", () => {
    expect(startOf(id, C.honesty.key)).toBe(startOf(id, C.staff.key));
  });

  it("opens the upper gate as the card reaches it, the card riding on only once it is open, then to the screen and behind it to the record", () => {
    const [opening] = playOf(id, C.gates.open.key).filter((play) => "--k" in play.on);
    const rides = legs(upper.key);
    const atGate = rides.find((play) => play.on["--x"] === upper.stops.gate.x)!;
    expect(opening.at).toBeCloseTo(atGate.at + atGate.duration, 6);
    const onward = rides.filter((play) => play.at > atGate.at);
    expect(onward.map((play) => play.on["--x"])).toEqual([upper.stops.screen.x, upper.stops.ledger.x]);
    expect(onward[0].at).toBeGreaterThanOrEqual(opening.at + opening.duration - 1e-9);
    const lines = Math.min(...C.ledger.lines.map((line) => startOf(id, line.key)));
    expect(lines).toBeGreaterThan(onward[1].at);
  });

  it("rides each card at one speed, easing out only into its stop", () => {
    for (const card of [upper, lower]) {
      let here = { x: 0, y: 0 };
      for (const play of legs(card.key)) {
        const next = { x: play.on["--x"] as number, y: play.on["--y"] as number };
        const plain = Math.hypot(next.x - here.x, next.y - here.y) / play.duration;
        expect(play.ease === "none" ? plain : 2 * plain, `${card.key} to ${next.x}`).toBeCloseTo(700, 0);
        here = next;
      }
    }
  });

  it("stops the second card dead at the closed gate and holds the stage still for 0.4 to 0.7 s before the reviewer comes", () => {
    const rides = legs(lower.key);
    const last = rides.at(-1)!;
    expect(last.on).toMatchObject({ "--x": lower.stops.gate.x, "--y": lower.stops.gate.y });
    expect(last.ease).toBe("none");
    const stop = last.at + last.duration;
    const next = Math.min(...playsAt(id).filter((play) => play.at > stop - 1e-9).map((play) => play.at));
    expect(next - stop).toBeGreaterThanOrEqual(0.4);
    expect(next - stop).toBeLessThanOrEqual(0.7);
    expect(startOf(id, C.reviewer.key)).toBeCloseTo(next, 6);
    expect(playsAt(id).filter((play) => play.at < next && play.at + play.duration > stop + 1e-6)).toEqual([]);
  });

  it("passes the magnifier over the stopped card once and brings it back to rest in the reviewer's hand before the mark", () => {
    const moves = playOf(id, C.lens.key).filter((play) => "--x" in play.on);
    expect(moves.map((play) => [play.on["--x"], play.on["--y"]])).toEqual([[C.lens.to.x, C.lens.to.y], [0, 0]]);
    expect(moves[1].at).toBeGreaterThan(moves[0].at + moves[0].duration);
    for (const play of moves) expect(play.ease).toBe("power1.out");
    expect(at(id)[C.lens.key]).toMatchObject({ "--x": 0, "--y": 0 });
  });

  it("then the magnifier over the card, the orange mark with its words, and last the line back up into the approved route", () => {
    expect(startOf(id, C.lens.key)).toBeGreaterThan(startOf(id, C.reviewer.key));
    expect(startOf(id, C.mark.key)).toBeGreaterThanOrEqual(endOf(id, C.lens.key));
    expect(startOf(id, C.mark.words.key) - startOf(id, C.mark.key)).toBeLessThan(0.2);
    expect(startOf(id, C.routes.join.key)).toBeGreaterThan(startOf(id, C.mark.key));
    expect(endOf(id, C.routes.join.key)).toBeCloseTo(Math.max(...playsAt(id).filter((play) => !play.key.startsWith("story.")).map((play) => play.at + play.duration)), 6);
    const end = at(id);
    expect(end[C.routes.join.key]["--d"]).toBe(1);
    expect(end[C.gates.open.key]["--k"]).toBe(1);
    expect(end[C.gates.closed.key]["--k"]).toBeUndefined();
  });
});

describe("slide 11a's drawing", () => {
  const C = CONTROL;

  it("draws its gates with the department map's gate, the upper one opening and the lower one closed", () => {
    expect(tagOf(C.gates.open.key)).toContain('class="sn-closed-gate"');
    expect(tagOf(C.gates.closed.key)).toContain('class="sn-closed-gate"');
    const open = markup.slice(markup.indexOf(`data-build="${C.gates.open.key}"`), markup.indexOf(`data-build="${C.gates.open.name.key}"`));
    // A boom barrier: both bars swing up about the left post, as one; nothing swings about the right.
    expect(open.match(/class="[^"]*sn-closed-gate__arm[ "]/g) ?? []).toHaveLength(2);
    expect(open).not.toContain("sn-closed-gate__arm--right");
    const closed = markup.slice(markup.indexOf(`data-build="${C.gates.closed.key}"`), markup.indexOf(`data-build="${C.gates.closed.name.key}"`));
    expect(closed).not.toContain("sn-closed-gate__arm");
  });

  it("uses no sketch glyph, no eye and no cross, and the story drawings' ink nowhere", () => {
    const own = markup.slice(markup.indexOf(`data-build="${C.marks}"`), markup.indexOf(`data-build="exists.marks"`));
    expect(own).not.toMatch(/sketch|sd-|eye|cross/i);
  });

  it("draws the cards before the screen, so one passing behind it is hidden", () => {
    for (const card of C.cards) expect(markup.indexOf(`data-build="${card.key}"`)).toBeLessThan(markup.indexOf(`data-build="${C.screen.key}"`));
  });
});
