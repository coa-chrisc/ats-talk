/**
 * Slide 25's click: the slide before goes and the title changes. The stack
 * draws top to bottom, each tier's name and caption coming up as its edge
 * closes, and line A comes in with it, as it says who the top tier is; the
 * middle tier takes the orange mark, and line B comes in with it. The arrow
 * down the left side draws and is named, then the arrow up the right side.
 * Then the heading comes up on the right, the three question cards land one
 * under it after another, and the slide ends as the last lands.
 */
import { EASE, draw, mark, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { WHO_DECIDES } from "./layout-who-decides";

const W = WHO_DECIDES;

/** The tiers draw one after another; each one's words come up as its edge nears closing. */
const TIERS = { apart: 0.4, draw: 0.7, name: 0.45, caption: 0.6 } as const;
/** An arrow draws over `draw`, its label coming up as its head lands. */
const ARROWS = { draw: 1.0, label: 0.7 } as const;
/** A card slides in from the right by `from` px as it fades in; the next starts `apart` after. */
export const CARDS = { apart: 0.7, from: 60, duration: 0.6 } as const;

export const whoDecides = picture("who-decides", {
  play: play(
    into("who-decides"),
    // The stack draws, top to bottom, each tier named.
    {
      with: true,
      hold: 0.45,
      moves: W.tiers.flatMap((tier, i) => [
        ...draw(tier.key, { at: i * TIERS.apart, duration: TIERS.draw }),
        ...rise(tier.name.key, { at: i * TIERS.apart + TIERS.name }),
        ...rise(tier.caption.key, { at: i * TIERS.apart + TIERS.caption }),
      ]),
    },
    { with: true, hold: 1.2, moves: [story("who-decides", 0)] },
    // The middle tier takes the orange mark, as line B says what it decides.
    { hold: 0.2, moves: [mark(W.mark.key, { at: 0 })] },
    { with: true, hold: 1.2, moves: [story("who-decides", 1)] },
    // Decisions run down the left, results and incidents up the right.
    { hold: 0.2, moves: [draw(W.down.key, { at: 0, duration: ARROWS.draw, ease: EASE.page }), rise(W.down.label.key, { at: ARROWS.label })] },
    { hold: 0.3, moves: [draw(W.up.key, { at: 0, duration: ARROWS.draw, ease: EASE.page }), rise(W.up.label.key, { at: ARROWS.label })] },
    // The heading on the right, then the three questions under it, one after another.
    { hold: 0.1, moves: [rise(W.heading.key, { at: 0 })] },
    {
      hold: 0,
      moves: W.cards.flatMap((card, i) => to(card.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: CARDS.from }, { at: i * CARDS.apart, duration: CARDS.duration, ease: EASE.out })),
    },
  ),
});
