/**
 * Slide 27, in the order its They see gives: the track returns, its start
 * stripe with it; the pack and the City's runner where slide 15 left it; the
 * dashed runner at the pack's tail, named; the markers one at a time
 * from the solid runner toward the dashed one, each with its entry in the
 * key, joined to it by a leader that draws as the entry rises; line A with
 * the first marker, line B with the fourth; the slide ends as the last
 * entry lands.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { COULD_BE } from "./layout-could-be";
import { MARKERS } from "./steps-could-be";
import { at, endOf, lastLanding, showsAfter, startOf } from "./harness";

const click = "could-be.play";
const C = COULD_BE;
const [A, B] = storyKeys("story.could-be", 2);
const start = (key: string) => startOf(click, key);

describe("27, where the City could be", () => {
  it("draws the track first, its edges round the lap, then its start stripe", () => {
    expect(start(C.start.key)).toBeGreaterThan(start(C.track.key));
    expect(at(click)[C.track.key]["--d"]).toBe(1);
    expect(at(click)[C.start.key]["--d"]).toBe(1);
    for (const key of [...C.pack.keys, C.pack.name.key, C.city.key]) expect(start(key)).toBeGreaterThan(start(C.track.key));
  });

  it("brings the pack and the City's runner before the dashed runner, which opens by its clip and is named as it opens", () => {
    for (const key of [...C.pack.keys, C.city.key]) expect(start(C.dashed.key)).toBeGreaterThanOrEqual(endOf(click, key));
    expect(at(click)[C.dashed.key]).toMatchObject({ "--wt": 0, "--wr": 0, "--wb": 0, "--wl": 0 });
    expect(start(C.dashed.name.key)).toBeGreaterThan(start(C.dashed.key));
    expect(start(C.dashed.name.key)).toBeLessThan(endOf(click, C.dashed.key));
  });

  it("sets the markers down one at a time, from the solid runner toward the dashed one, each leader drawing down and its entry rising as it arrives", () => {
    const starts = C.markers.map((marker) => start(marker.key));
    expect(starts[0]).toBeGreaterThanOrEqual(endOf(click, C.dashed.name.key));
    starts.slice(1).forEach((t, i) => {
      expect(t - starts[i]).toBeCloseTo(MARKERS.apart, 5);
      expect(t).toBeGreaterThanOrEqual(endOf(click, C.markers[i].key));
    });
    for (const marker of C.markers) {
      expect(start(marker.leader.key)).toBeGreaterThan(start(marker.key));
      expect(start(marker.entry.key)).toBeGreaterThan(start(marker.leader.key));
      expect(start(marker.entry.key)).toBeLessThan(endOf(click, marker.leader.key));
      expect(at(click)[marker.leader.key]["--d"]).toBe(1);
      expect(showsAfter(click, marker.key)).toBe(true);
      expect(showsAfter(click, marker.entry.key)).toBe(true);
    }
    // Landing order runs from the bend toward the pack: each marker further round, so further left.
    C.markers.slice(1).forEach((marker, i) => expect(marker.at.x).toBeLessThan(C.markers[i].at.x));
  });

  it("brings line A with the first marker and line B with the fourth", () => {
    expect(start(A)).toBeGreaterThan(start(C.markers[0].key));
    expect(start(A)).toBeLessThan(start(C.markers[1].key));
    expect(start(B)).toBeCloseTo(start(C.markers[3].key), 5);
    expect(start(B)).toBeLessThan(start(C.markers[4].key));
  });

  it("ends as the last entry lands, everything on the stage", () => {
    expect(endOf(click, C.markers.at(-1)!.entry.key)).toBe(lastLanding(click));
    for (const key of [C.track.key, C.start.key, ...C.pack.keys, C.pack.name.key, C.city.key, C.dashed.key, C.dashed.name.key]) expect(showsAfter(click, key), key).toBe(true);
  });
});
