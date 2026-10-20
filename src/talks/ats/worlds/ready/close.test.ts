/**
 * Slide 29, the close, as the opening plays: the navy ground; the last
 * picture and its title go; the title settles, the rule grows under it,
 * line A, line B, and the small line at the foot last, nothing after it.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { CLOSE } from "./layout-close";
import { SETTLE } from "./steps-close";
import { endOf, lastLanding, startOf } from "./harness";
import { ready } from "./world";

const click = "lets-talk.play";
const [A, B] = storyKeys("story.lets-talk", 2);
const start = (key: string) => startOf(click, key);

describe("29, the close", () => {
  it("is on navy", () => {
    expect(ready.steps.at(-1)!.ground).toBe("navy");
  });

  it("settles the title once the last picture is gone, then grows the rule 0.75 s after it starts", () => {
    expect(start(CLOSE.title.key)).toBeCloseTo(SETTLE.title, 5);
    expect(start(CLOSE.rule.key) - start(CLOSE.title.key)).toBeCloseTo(SETTLE.rule, 5);
  });

  it("brings line A, then line B, then the foot, and ends on the foot", () => {
    expect(start(A)).toBeGreaterThan(start(CLOSE.rule.key));
    expect(start(B)).toBeGreaterThan(start(A));
    expect(start(CLOSE.foot.key)).toBeGreaterThanOrEqual(endOf(click, B));
    expect(endOf(click, CLOSE.foot.key)).toBe(lastLanding(click));
  });
});
