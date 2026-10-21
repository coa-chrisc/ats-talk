/**
 * Slide 25, in the order its They see gives: the stack top to bottom, each
 * tier named; the orange mark on the middle tier; the arrow down the left,
 * then the arrow up the right, each named; the heading, then the three
 * question cards in turn; line A with the stack, line B with the mark.
 */
import { describe, expect, it } from "vitest";
import { endOf, markup, showsAfter, startOf } from "./harness";
import { WHO_DECIDES } from "./layout-who-decides";

const click = "who-decides.play";
const W = WHO_DECIDES;
const start = (key: string) => startOf(click, key);

describe("25, who decides", () => {
  it("draws the tiers top to bottom, each named and captioned as it draws", () => {
    const starts = W.tiers.map((tier) => start(tier.key));
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    for (const tier of W.tiers) {
      expect(start(tier.name.key)).toBeLessThan(endOf(click, tier.key));
      expect(start(tier.caption.key)).toBeGreaterThan(start(tier.name.key));
    }
  });

  it("lands the orange mark on the middle tier once the stack is drawn, through the kit's HumanMark", () => {
    expect(start(W.mark.key)).toBeGreaterThanOrEqual(Math.max(...W.tiers.map((tier) => endOf(click, tier.caption.key))));
    expect(markup).toMatch(new RegExp(`class="dk-human" data-build="${W.mark.key.replace(/\./g, "\\.")}"`));
  });

  it("draws the arrow down the left before the arrow up the right, each named as its head lands", () => {
    expect(start(W.down.key)).toBeGreaterThanOrEqual(endOf(click, W.mark.key));
    expect(start(W.up.key)).toBeGreaterThanOrEqual(endOf(click, W.down.key));
    expect(start(W.down.label.key)).toBeLessThan(endOf(click, W.down.key));
    expect(start(W.up.label.key)).toBeLessThan(endOf(click, W.up.key));
  });


  it("brings the heading up after the arrows, then lands the three questions under it in turn, and ends on the stack, its arrows, the heading and the cards", () => {
    expect(start(W.heading.key)).toBeGreaterThanOrEqual(endOf(click, W.up.key));
    const starts = W.cards.map((card) => start(card.key));
    expect(starts[0]).toBeGreaterThanOrEqual(endOf(click, W.heading.key));
    starts.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(starts[i]));
    for (const key of [W.mark.key, W.down.key, W.up.key, W.heading.key, ...W.cards.map((card) => card.key), ...W.tiers.map((tier) => tier.key)]) expect(showsAfter(click, key), key).toBe(true);
  });
});
