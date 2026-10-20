/**
 * Slide 13's click: the wall comes up, named once, and blank cards slide on
 * in waves, each bigger than the last, until it is crowded; four cards take
 * a grey tag one after another; a hand reaches in from the right, takes the
 * first card by its edge and carries it off the wall to hold it up in the
 * open stage.
 */
import { EASE, lines, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { titleKey } from "./layout";
import { GOOD_IDEAS, LIFTED } from "./layout-good-ideas";
import { ARRIVE, play } from "./moves";

const G = GOOD_IDEAS;

/** When each wave of cards starts after the first, closer and closer; a card's slide on, and the gap between cards of one wave. */
const WAVES = { at: [0, 0.5, 0.85, 1.1], slide: 0.5, stagger: 0.06 } as const;
/** The tags, one after another. */
const TAGS = { gap: 0.35, pop: 0.4 } as const;
/** The hand reaching in, and the carry. */
const HAND = { reach: 0.8, carry: 1.1 } as const;

const arrive = G.waves.flatMap((wave, w) =>
  wave.flatMap((n, k) => {
    const card = G.cards[n];
    return to(card.key, { autoAlpha: 1, "--x": 0 }, { autoAlpha: 0, "--x": card.slide }, { at: WAVES.at[w] + k * WAVES.stagger, duration: WAVES.slide, ease: EASE.out });
  }),
);

const lifted = G.cards[LIFTED].key;

export const goodIdeas = picture("good-ideas", {
  play: play(
    // In comes the wall, named once.
    { moves: [lines(titleKey("good-ideas"), { at: ARRIVE }), show(G.wall.key, { at: ARRIVE + 0.2 }), rise(G.name.key, { at: ARRIVE + 0.3 })] },
    // Cards slide on in waves until the wall is crowded.
    { with: true, hold: ARRIVE + 0.9, moves: arrive },
    // Four cards take a grey tag, one after another, as the first line says why.
    {
      hold: 0.3,
      moves: G.tags.map((tag, i) => to(tag.key, { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": 0.3 }, { at: i * TAGS.gap, duration: TAGS.pop, ease: EASE.out })),
    },
    { with: true, hold: 0.2, moves: [story("good-ideas", 0)] },
    // A hand reaches in and takes the first card by its edge.
    { hold: 1.3, moves: [to(G.hand.key, { autoAlpha: 1, "--x": 0, "--y": 0 }, { autoAlpha: 0, "--x": G.hand.reach, "--y": 0 }, { at: 0, duration: HAND.reach, ease: EASE.out })] },
    // It lifts the card off the wall and holds it up in the open stage.
    {
      hold: 0.1,
      moves: [
        to(lifted, { "--x": G.lift.x, "--y": G.lift.y, "--s": G.lift.scale }, { "--y": 0, "--s": 1 }, { at: 0, duration: HAND.carry, ease: EASE.page }),
        to(G.hand.key, { "--x": G.hand.carry.x, "--y": G.hand.carry.y }, undefined, { at: 0, duration: HAND.carry, ease: EASE.page }),
      ],
    },
    { with: true, hold: 0.4, moves: [story("good-ideas", 1)] },
  ),
});
