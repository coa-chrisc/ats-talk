/**
 * Slide 20, in the order its They see gives: the two lanes; boxes ship into
 * lane one while lane two's named pieces fill, and an arrow runs down from
 * each piece into lane one; the process band with its checkpoints and the
 * door; the first box passes each checkpoint and goes through the door.
 */
import { describe, expect, it } from "vitest";
import { passing } from "./beats";
import { labelsOf } from "./layout";
import { ROADMAP, SHIPPED, passAt } from "./layout-roadmap";
import { at, clickOf, endOf, n, playOf, showsAtEnd, startOf, world } from "./harness";

const click = clickOf("roadmap");
const R = ROADMAP;
const [far, near] = R.lanes;

describe("20, the roadmap", () => {
  it("names every part with the script's labels, in its order: lane one, lane two, its pieces, the band, its checkpoints and the door", () => {
    expect([near.name.text, far.name.text, ...R.pieces.map((piece) => piece.label.text), R.band.name.text, ...R.checks.map((check) => check.name.text), R.door.word.text]).toEqual(labelsOf("roadmap"));
    expect(near.name.text).toBe("Deliver now");
    expect(far.name.text).toBe("Long-term infrastructure and enablement");
    expect(R.pieces.map((piece) => piece.label.text)).toEqual(["AI training", "OneSDLC", "One toolset", "Agile practices", "Infrastructure"]);
  });

  it("draws the lanes and names them before anything ships", () => {
    const shipping = Math.min(...R.boxes.slice(0, SHIPPED).map((entry) => startOf(click, entry.key)));
    for (const lane of R.lanes) expect(endOf(click, lane.name.key), lane.key).toBeLessThanOrEqual(shipping);
  });

  it("ships the first boxes one after another, then fills lane two's pieces in turn, each named once it has begun to fill", () => {
    const shipped = R.boxes.slice(0, SHIPPED).map((entry) => startOf(click, entry.key, "x"));
    expect([...shipped].sort((a, b) => a - b)).toEqual(shipped);
    const ships = R.boxes.slice(0, SHIPPED).map((entry) => playOf(click, entry.key, "x")[0]);
    const fills = R.pieces.map((piece) => startOf(click, piece.key));
    expect(Math.min(...fills)).toBeGreaterThanOrEqual(Math.max(...ships.map((ship) => ship.at + ship.duration)));
    expect([...fills].sort((a, b) => a - b)).toEqual(fills);
    for (const [i, piece] of R.pieces.entries()) {
      expect(startOf(click, piece.label.key), piece.key).toBeGreaterThan(fills[i]);
      expect(showsAtEnd(click, piece.key), piece.key).toBe(true);
      expect(showsAtEnd(click, piece.label.key), piece.label.key).toBe(true);
    }
  });

  it("runs an arrow down from every piece into lane one once lane two is full, and brings up the last two boxes where their arrows land", () => {
    expect(R.arrows).toHaveLength(R.pieces.length);
    const full = Math.max(...R.pieces.flatMap((piece) => [endOf(click, piece.key), endOf(click, piece.label.key)]));
    R.arrows.forEach((arrow, i) => {
      expect(arrow.from).toEqual(R.pieces[i].at);
      expect(arrow.to).toEqual(R.boxes[i].at);
      expect(startOf(click, arrow.key), arrow.key).toBeGreaterThanOrEqual(full);
      expect(showsAtEnd(click, arrow.key), arrow.key).toBe(true);
    });
    for (const entry of R.boxes.slice(SHIPPED)) {
      const arrow = R.arrows[R.boxes.indexOf(entry)];
      expect(startOf(click, entry.key), entry.key).toBeGreaterThan(startOf(click, arrow.key));
      expect(playOf(click, entry.key, "x"), entry.key).toEqual([]);
      expect(showsAtEnd(click, entry.key), entry.key).toBe(true);
    }
  });

  it("draws the band, its checkpoints and the door, with its word, before the first box sets off", () => {
    const [drop] = playOf(click, R.boxes[0].key, "y");
    for (const key of [R.band.key, R.door.key, R.door.word.key, ...R.checks.map((check) => check.name.key)]) expect(endOf(click, key), key).toBeLessThanOrEqual(drop.at);
    expect(endOf(click, R.door.leaf, "autoAlpha")).toBeLessThanOrEqual(drop.at);
  });

  it("fills each checkpoint as the box passes it, in turn, and opens the door just before the box reaches it", () => {
    const [run] = playOf(click, R.boxes[0].key, "x").filter((play) => play.on.x === R.journey.along);
    const fills = R.checks.slice(0, 3).map((check) => playOf(click, check.key, "--k")[0].at);
    expect([...fills].sort((a, b) => a - b)).toEqual(fills);
    expect(fills).toEqual(passing(run, passAt.checks));
    for (const fraction of passAt.checks) {
      expect(fraction).toBeGreaterThan(0);
      expect(fraction).toBeLessThan(passAt.jamb);
    }
    const [door] = playOf(click, R.door.leaf, "--k");
    expect(door.at).toBeGreaterThan(run.at);
    expect(door.at + door.duration).toBeCloseTo(passing(run, [passAt.jamb])[0], 5);
  });

  it("runs the first box along the band 0.15 s quicker per leg than before (three checkpoints and the door)", () => {
    const [run] = playOf(click, R.boxes[0].key, "x").filter((play) => play.on.x === R.journey.along);
    expect(run.duration).toBeCloseTo(2.6 - 4 * 0.15, 6);
  });

  it("ships a new box into the first one's place 0.4 s after the first sets off down to the band, so lane one ends full", () => {
    const [drop] = playOf(click, R.boxes[0].key, "y");
    const [refill] = playOf(click, R.refill.key, "x");
    expect(refill.at - drop.at).toBeCloseTo(0.4, 6);
    expect(world.states[n(click)][R.refill.key]).toMatchObject({ x: R.refill.from, autoAlpha: 0 });
    expect(R.refill.at).toEqual(R.boxes[0].at);
    expect(at(click)[R.refill.key]).toMatchObject({ x: 0, autoAlpha: 1 });
    for (const entry of R.boxes.slice(1)) expect(showsAtEnd(click, entry.key), entry.key).toBe(true);
  });

  it("ends with the first box through the door, the door open, and every checkpoint filled", () => {
    expect(at(click)[R.boxes[0].key]).toMatchObject({ x: R.journey.along, y: R.journey.down });
    expect(at(click)[R.door.leaf]["--k"]).toBe(1);
    for (const check of R.checks.slice(0, 3)) expect(at(click)[check.key]["--k"], check.key).toBe(1);
  });
});
