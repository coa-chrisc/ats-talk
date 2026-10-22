/**
 * Slide 27's click: the title, then both story lines together, and after
 * the reading pause the picture. At the right, the heading of what is still
 * to establish, and slide 11's three empty plates wipe on in turn; then the
 * six requests land one after another in the script's order, each card
 * with its miniature, name and caption; last, a small empty dashed ring
 * comes up before every request's name at once, and the picture holds still. Nothing fills a plate or a
 * ring.
 */
import { show, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, land, play } from "./beats";
import { COULD_BE } from "./layout-could-be";

const C = COULD_BE;

/** The plates wipe on this far apart, and the cards land this far apart. */
const PLATE = 0.4;
const CARD = 0.5;

export const couldBe = picture("could-be", {
  play: play(
    into("could-be"),
    { moves: [story("could-be", 0), story("could-be", 1)] },
    {
      moves: [
        // What is still to establish: its heading and its three empty plates.
        show(C.gaps.key, { at: 0, duration: 0.5 }),
        ...C.plates.flatMap((plate, i) => wipe(plate.key, { at: i * PLATE, duration: 0.6 })),
        // The six requests, in the script's order.
        ...C.cards.flatMap((card, i) => land(card.key, 1.4 + i * CARD, 0.5)),
        // The empty rings, together: what only the room can fill.
        show(C.rings.key, { at: 4.4, duration: 0.5 }),
      ],
    },
  ),
});
