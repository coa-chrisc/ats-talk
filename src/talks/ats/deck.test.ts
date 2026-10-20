import { describe, expect, it } from "vitest";
import { compile } from "@/components/deck/engine/compile";
import { deck } from "./deck";
import { Frame } from "./frame";
import { SCRIPT, WORLDS } from "./script";

/**
 * Whether every world is built. The worlds are built one at a time and
 * appended to worlds/index.ts in WORLDS order, so until then the checks run
 * against the worlds present; integration flips this to true once the last
 * world (ready) is in, and the checks that need the whole deck run.
 */
const COMPLETE = false;

const addresses = deck.worlds.flatMap(({ world }) => world.steps.map((step) => `${world.id}/${step.id}`));
const present = new Set<string>(deck.worlds.map(({ world }) => world.id));
/** The script's pictures whose world is in the deck so far. */
const built = SCRIPT.filter((picture) => present.has(picture.world));

describe("the talk's deck", () => {
  it("gives its worlds in the plan's order, from the first", () => {
    const ids = deck.worlds.map(({ world }) => world.id);
    const kept = WORLDS.filter((w) => ids.includes(w));
    expect(ids).toEqual(kept);
  });

  it.skipIf(!COMPLETE)("gives every picture of the script a world", () => {
    expect(deck.worlds.map(({ world }) => world.id)).toEqual([...WORLDS]);
    expect(built).toEqual(SCRIPT);
  });

  it("has every step of its worlds' pictures once, in the script's order, in the picture's world", () => {
    expect(addresses).toEqual(built.flatMap((picture) => picture.steps.map((step) => `${picture.world}/${picture.id}.${step.id}`)));
    expect(new Set(addresses).size).toBe(addresses.length);
  });

  it("gives every step its slide's name and the script's You say as the speaker's note", () => {
    for (const picture of built) {
      const { copy } = deck.worlds.find(({ world }) => world.id === picture.world)!;
      for (const step of picture.steps) expect(copy?.[`${picture.id}.${step.id}`]).toEqual({ title: `${picture.number}. ${picture.name}`, note: picture.say });
    }
  });

  it("compiles every world, with a starting value for everything a step moves", () => {
    for (const { world } of deck.worlds) expect(() => compile(world), world.id).not.toThrow();
  });

  it("keeps nothing on the stage across worlds but the City of Austin frame: no persistent layer and no backdrop", () => {
    expect(deck.chrome).toBeUndefined();
    expect(deck.Backdrop).toBeUndefined();
    expect(deck.Frame).toBe(Frame);
  });

  it("sets every step on navy or on the deck's white", () => {
    expect(deck.worlds.flatMap(({ world }) => world.steps).every((step) => step.ground === undefined || step.ground === "navy")).toBe(true);
  });

  it.skipIf(!COMPLETE)("sets slide 1 and the close (slide 20) on navy, and every other step on the deck's white", () => {
    const navy = deck.worlds.flatMap(({ world }) => world.steps.filter((step) => step.ground === "navy").map((step) => `${world.id}/${step.id}`));
    expect(navy).toEqual(SCRIPT.filter((picture) => ["1", "20"].includes(picture.number)).flatMap((picture) => picture.steps.map((step) => `${picture.world}/${picture.id}.${step.id}`)));
    expect(navy).toHaveLength(2);
  });
});
