/**
 * Slide 17, in the order its They see gives: the stack top to bottom, each
 * tier named; the orange mark on the middle tier; the arrow down the left,
 * then the arrow up the right, each named; the three question cards in
 * turn; line A after the arrows, line B with the last card.
 */
import { describe, expect, it } from "vitest";
import { storyKeys } from "@/components/deck/kit";
import { WHO_DECIDES } from "./layout-who-decides";
import { endOf, markup, showsAfter, startOf } from "./harness";

const click = "who-decides.play";
const W = WHO_DECIDES;
const [A, B] = storyKeys("story.who-decides", 2);
const start = (key: string) => startOf(click, key);

describe("17, who decides", () => {
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

  it("draws authority down the left before evidence up the right, each named as its head lands", () => {
    expect(start(W.down.key)).toBeGreaterThanOrEqual(endOf(click, W.mark.key));
    expect(start(W.up.key)).toBeGreaterThanOrEqual(endOf(click, W.down.key));
    expect(start(W.down.label.key)).toBeLessThan(endOf(click, W.down.key));
    expect(start(W.up.label.key)).toBeLessThan(endOf(click, W.up.key));
  });

  it("brings line A after the arrows and before the questions", () => {
    expect(start(A)).toBeGreaterThan(start(W.up.key));
    expect(start(A)).toBeLessThan(start(W.cards[0].key));
  });

  it("lands the three questions in turn, line B with the last, and ends on the stack, its arrows and the cards", () => {
    const starts = W.cards.map((card) => start(card.key));
    starts.slice(1).forEach((t, i) => expect(t).toBeGreaterThan(starts[i]));
    expect(start(B)).toBeGreaterThanOrEqual(starts[2]);
    for (const key of [W.mark.key, W.down.key, W.up.key, ...W.cards.map((card) => card.key), ...W.tiers.map((tier) => tier.key)]) expect(showsAfter(click, key), key).toBe(true);
  });
});
