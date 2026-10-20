/**
 * Slide 21, in the order its They see gives: the two lanes, the boxes
 * shipping along the lower one, the four pieces filling in turn, an arrow
 * down from each, and the belt running faster after each arrow lands; and
 * both lanes full.
 */
import { describe, expect, it } from "vitest";
import { labelsOf } from "./layout-plan";
import { BELT, LANES, PARCELS, placeX } from "./layout-lanes";
import { PACE, TICKS, WELL_TIMES } from "./steps-lanes";
import { at, clickOf, endOf, longest, playOf, showsAtEnd, startOf } from "./harness";

const click = clickOf("lanes");
const L = LANES;
const end = at(click);
const steps = (key: string) => playOf(click, key, "x").sort((a, b) => a.at - b.at);

describe("21, two lanes", () => {
  it("draws the two lanes, each named, before anything moves along them", () => {
    const lanes = Math.max(endOf(click, L.upper.key), endOf(click, L.lower.key));
    expect(startOf(click, L.upper.name.key)).toBeGreaterThan(startOf(click, L.upper.key));
    expect(startOf(click, L.lower.name.key)).toBeGreaterThan(startOf(click, L.lower.key));
    expect(startOf(click, L.parcels[0].key)).toBeGreaterThanOrEqual(startOf(click, L.lower.key) + 0.4);
    expect(startOf(click, L.pieces[0].key)).toBeGreaterThan(lanes);
  });

  it("ships the boxes along the lower lane one after another before the first piece fills, each travelling place by place", () => {
    const first = startOf(click, L.pieces[0].key);
    expect(TICKS.filter((tick) => tick.at < first).length).toBeGreaterThanOrEqual(2);
    L.parcels.forEach((parcel, i) => {
      const moves = steps(parcel.key);
      expect(moves[0].at, parcel.key).toBeCloseTo(TICKS[i].at, 9);
      moves.forEach((move, k) => {
        if (k > 0) expect(move.on.x, `${parcel.key} step ${k}`).toBe(placeX(k));
        if (k > 0) expect(move.at, `${parcel.key} step ${k}`).toBeGreaterThan(moves[k - 1].at);
      });
    });
  });

  it("moves every box on the belt at once at each step, so it reads as one lane running", () => {
    for (const tick of TICKS) {
      const moving = L.parcels.filter((parcel) => steps(parcel.key).some((move) => Math.abs(move.at - tick.at) < 1e-9));
      expect(moving.length).toBeGreaterThan(0);
      for (const parcel of moving) expect(steps(parcel.key).find((move) => Math.abs(move.at - tick.at) < 1e-9)!.duration).toBe(tick.move);
    }
  });

  it("fills the four pieces in turn, each named, an arrow running down from each after it fills", () => {
    const fills = L.pieces.map((piece) => startOf(click, piece.key));
    fills.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(fills[i]));
    L.pieces.forEach((piece, i) => {
      expect(startOf(click, piece.label.key)).toBeGreaterThan(fills[i]);
      expect(startOf(click, piece.arrow.key)).toBeGreaterThan(fills[i]);
      expect(endOf(click, piece.arrow.key)).toBeCloseTo(WELL_TIMES[i].lands, 9);
      if (i < 3) expect(fills[i + 1]).toBeGreaterThan(endOf(click, piece.arrow.key));
      expect(end[piece.key]["--k"]).toBe(1);
      expect(end[piece.arrow.key]["--d"]).toBe(1);
    });
  });

  it("runs the belt faster after each arrow lands: every step after a landing is quicker than every step before it", () => {
    for (const { lands } of WELL_TIMES) {
      const before = TICKS.filter((tick) => tick.at < lands);
      const after = TICKS.filter((tick) => tick.at >= lands);
      expect(after.length, String(lands)).toBeGreaterThan(0);
      expect(Math.max(...after.map((tick) => tick.move))).toBeLessThan(Math.min(...before.map((tick) => tick.move)));
    }
  });

  it("steps at least twice at each pace, so each quickening is seen, and ends about four times as fast as it began", () => {
    for (let landed = 0; landed <= 3; landed++) expect(TICKS.filter((tick) => tick.landed === landed).length, String(landed)).toBeGreaterThanOrEqual(2);
    expect(TICKS.at(-1)!.landed).toBe(4);
    const cycle = (p: (typeof PACE)[number]) => p.move + p.rest;
    expect(cycle(PACE[0]) / cycle(PACE[4])).toBeGreaterThanOrEqual(3.5);
    for (let i = 1; i < PACE.length; i++) expect(PACE[i].move).toBeLessThan(PACE[i - 1].move);
  });

  it("ends with the lower lane full: a box at each of its places, and every box shipped from it gone", () => {
    const standing = L.parcels.filter((parcel) => showsAtEnd(click, parcel.key));
    expect(standing).toHaveLength(BELT.places);
    expect(standing.map((parcel) => end[parcel.key].x).sort((a, b) => Number(a) - Number(b))).toEqual(Array.from({ length: BELT.places }, (_, p) => placeX(p)));
    expect(PARCELS).toBeGreaterThan(BELT.places);
    for (const parcel of L.parcels.slice(0, PARCELS - BELT.places)) expect(end[parcel.key].autoAlpha, parcel.key).toBe(0);
  });

  it("ends on the belt's last step, after the last arrow has landed", () => {
    expect(TICKS.at(-1)!.at).toBeGreaterThan(WELL_TIMES.at(-1)!.lands);
    const last = TICKS.at(-1)!;
    expect(longest(click)).toBeCloseTo(last.at + last.move, 9);
  });

  it("raises story line A as the belt starts and B as the first piece fills", () => {
    expect(startOf(click, "story.lanes.a")).toBeGreaterThan(TICKS[0].at);
    expect(startOf(click, "story.lanes.a")).toBeLessThan(startOf(click, L.pieces[0].key));
    expect(startOf(click, "story.lanes.b")).toBeGreaterThanOrEqual(startOf(click, L.pieces[0].key));
    expect(startOf(click, "story.lanes.b")).toBeLessThan(WELL_TIMES[0].lands);
  });

  it("shows the script's labels in the order it gives them", () => {
    expect([L.lower.name.text, L.upper.name.text, ...L.pieces.map((piece) => piece.label.text)]).toEqual(labelsOf("lanes"));
  });
});
