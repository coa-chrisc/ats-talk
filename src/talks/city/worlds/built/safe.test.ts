/**
 * Slides 5 and 12a, the sandbox: the fence goes up round an empty yard well
 * apart from the City's buildings, the box comes in through the one gate,
 * which shuts behind it; then the rings close round the container inside
 * the fence, one at a time.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { storyId } from "../steps";
import { SAFE_BOTTOM } from "./layout";
import { CONTROLS, SAFE_YARD } from "./layout-safe";
import { at, clickOf, endOf, inside, lastOf, playOf, startOf } from "./harness";

const SAFE = clickOf("safe");
const CONTROLS_CLICK = clickOf("controls");
const [safeA, safeB] = storyKeys(storyId("safe"), 2);
const [controlsA, controlsB] = storyKeys(storyId("controls"), 2);

describe("slide 5, a sandbox walled off from the City", () => {
  const { buildings, figures, fence, data, hand, cannot } = SAFE_YARD;
  const yard = fence.at;
  const { hinge, length } = fence.gate;

  it("puts the fence's two rails out from the middle of its left side, round the top and round the bottom, to the gate's two jambs", () => {
    const [top, bottom] = fence.rails;
    const start = `M${yard.x} ${yard.y + yard.h / 2}`;
    expect(top.d.startsWith(start)).toBe(true);
    expect(bottom.d.startsWith(start)).toBe(true);
    expect(top.d.endsWith(`H${yard.x + yard.w}V${hinge.y}`)).toBe(true);
    expect(bottom.d.endsWith(`H${yard.x + yard.w}V${hinge.y + length}`)).toBe(true);
    expect(hinge.x).toBe(yard.x + yard.w);
  });

  it("keeps the yard well below the buildings, nothing joining them, and names the gap between them", () => {
    const base = Math.max(...buildings.at.map((b) => b.y + b.h));
    expect(yard.y - base).toBeGreaterThanOrEqual(100);
    expect(cannot.at.y).toBeGreaterThanOrEqual(base);
    expect(cannot.at.y + cannot.at.h).toBeLessThanOrEqual(yard.y);
  });

  it("carries the box from outside the gate, through its opening, to inside the yard, clear of the leaf", () => {
    expect(data.at.x).toBeGreaterThanOrEqual(yard.x + yard.w);
    expect(data.at.y + data.at.h).toBeLessThanOrEqual(hinge.y + length);
    expect(inside({ ...data.at, x: data.at.x + data.carry }, yard)).toBe(true);
    // Open, the leaf lies along the opening's top, 8 px thick: the box and the hand pass a clear 20 px under it.
    expect(data.at.y).toBeGreaterThanOrEqual(hinge.y + 4 + 20);
    expect(hand.at.y + hand.at.h).toBeLessThanOrEqual(hinge.y + length);
    // Where it comes up, even as it rises from 22 px lower, the box and the hand are out of the leaf's swing.
    const near = { x: hand.at.x - hinge.x, y: data.at.y - hinge.y };
    expect(Math.hypot(near.x, near.y)).toBeGreaterThan(length + 8);
  });

  it("names the box over the place it is set down, inside the yard", () => {
    const placed = { ...data.at, x: data.at.x + data.carry };
    expect(data.label.at.x + data.label.at.w / 2).toBe(placed.x + placed.w / 2);
    expect(data.label.at.y + data.label.at.h).toBeLessThanOrEqual(placed.y);
    expect(inside(data.label.at, yard)).toBe(true);
  });

  it("draws the buildings, then the figures, then the fence they put up, the gap named after it", () => {
    expect(startOf(SAFE, buildings.keyOf(0))).toBeLessThan(startOf(SAFE, figures[0].key));
    expect(startOf(SAFE, figures[2].key)).toBeLessThan(startOf(SAFE, fence.rails[0].key));
    expect(startOf(SAFE, fence.rails[0].key)).toBe(startOf(SAFE, fence.rails[1].key));
    expect(startOf(SAFE, cannot.key)).toBeGreaterThanOrEqual(endOf(SAFE, fence.rails[0].key));
  });

  it("brings line A up with the figures and line B with the gap's name", () => {
    expect(startOf(SAFE, safeA)).toBeGreaterThan(startOf(SAFE, figures[0].key));
    expect(startOf(SAFE, safeA)).toBeLessThan(startOf(SAFE, fence.rails[0].key));
    expect(startOf(SAFE, safeB)).toBeGreaterThanOrEqual(startOf(SAFE, cannot.key));
  });

  it("opens the gate before the box is carried, and shuts it once the hand has gone back out", () => {
    const [opens, shuts] = playOf(SAFE, fence.gate.key).filter((play) => "--k" in play.on).sort((a, b) => a.at - b.at);
    const carried = playOf(SAFE, data.key).find((play) => "x" in play.on)!;
    const back = playOf(SAFE, hand.key).find((play) => play.on.autoAlpha === 0)!;
    expect(opens.on["--k"]).toBe(1);
    expect(startOf(SAFE, data.key) - opens.at).toBeGreaterThanOrEqual(0.4);
    expect(opens.at + opens.duration).toBeLessThanOrEqual(carried.at - 0.4);
    expect(startOf(SAFE, data.label.key)).toBeGreaterThanOrEqual(carried.at + carried.duration);
    expect(back.at).toBeGreaterThanOrEqual(carried.at + carried.duration);
    expect(shuts.on["--k"]).toBe(0);
    expect(shuts.at).toBeGreaterThan(back.at);
    expect(shuts.at + shuts.duration).toBe(lastOf(SAFE));
  });

  it("ends on the fenced yard with its box inside and the gate shut, the hand gone", () => {
    const end = at(SAFE);
    expect(end[fence.gate.key]["--k"]).toBe(0);
    expect(end[data.key].x).toBe(data.carry);
    expect(end[data.key].autoAlpha).toBe(1);
    expect(end[data.label.key].autoAlpha).toBe(1);
    expect(end[hand.key].autoAlpha).toBe(0);
    for (const rail of fence.rails) expect(end[rail.key]["--d"]).toBe(1);
  });
});

describe("slide 12a, inside the sandbox", () => {
  const { fence, container, rings, repo, cost } = CONTROLS;

  it("nests the container in the five rings, inside out, all inside the fence, and the repository beside them", () => {
    expect(inside(container.at, rings[0].at)).toBe(true);
    rings.slice(1).forEach((ring, k) => expect(inside(rings[k].at, ring.at), ring.key).toBe(true));
    expect(inside(rings[4].at, fence.at)).toBe(true);
    expect(inside(repo.at, fence.at)).toBe(true);
    expect(repo.at.x).toBeGreaterThan(rings[4].at.x + rings[4].at.w);
  });

  it("sets the cost tag on its own at the foot of the frame, centred under the fence, as wide as its words, apart from the rings and the repository", () => {
    expect(cost.at.x + cost.at.w / 2).toBe(960);
    // About 13 px a letter in the label type, and room either side.
    expect(cost.at.w).toBeGreaterThanOrEqual(cost.text.length * 13 + 32);
    expect(cost.at.y).toBeGreaterThanOrEqual(fence.at.y + fence.at.h + 24);
    expect(cost.at.y + cost.at.h).toBeLessThanOrEqual(SAFE_BOTTOM);
    expect(cost.at.x + cost.at.w).toBeLessThan(repo.at.x);
  });

  it("closes the rings one at a time, inside out, each named as it lands, then the repository, then the tag", () => {
    rings.forEach((ring, k) => {
      if (k > 0) expect(startOf(CONTROLS_CLICK, ring.key), ring.key).toBeGreaterThan(startOf(CONTROLS_CLICK, rings[k - 1].key));
      expect(startOf(CONTROLS_CLICK, ring.tab.key), ring.tab.key).toBeGreaterThan(startOf(CONTROLS_CLICK, ring.key));
    });
    expect(startOf(CONTROLS_CLICK, repo.key)).toBeGreaterThanOrEqual(endOf(CONTROLS_CLICK, rings[4].key));
    expect(startOf(CONTROLS_CLICK, repo.arrow.key)).toBeGreaterThan(startOf(CONTROLS_CLICK, repo.key));
    expect(startOf(CONTROLS_CLICK, cost.key)).toBeGreaterThan(startOf(CONTROLS_CLICK, repo.arrow.key));
  });

  it("brings line A up with the first ring and line B with the fourth", () => {
    expect(startOf(CONTROLS_CLICK, controlsA)).toBeGreaterThan(startOf(CONTROLS_CLICK, rings[0].key));
    expect(startOf(CONTROLS_CLICK, controlsA)).toBeLessThan(startOf(CONTROLS_CLICK, rings[1].key));
    expect(startOf(CONTROLS_CLICK, controlsB)).toBeGreaterThan(startOf(CONTROLS_CLICK, rings[3].key));
    expect(startOf(CONTROLS_CLICK, controlsB)).toBeLessThan(startOf(CONTROLS_CLICK, rings[4].key));
  });

  it("ends on the container inside its rings, inside the fence, with the repository, and the tag at the foot", () => {
    const end = at(CONTROLS_CLICK);
    for (const ring of rings) expect(end[ring.key], ring.key).toMatchObject({ autoAlpha: 1, "--s": 1 });
    for (const key of [container.key, repo.key, cost.key]) expect(end[key].autoAlpha, key).toBe(1);
    expect(end[fence.rails[0].key]["--d"]).toBe(1);
  });
});
