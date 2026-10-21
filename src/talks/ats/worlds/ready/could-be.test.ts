/**
 * Slide 27's click: slide 11's three empty plates wipe on in turn, the six
 * requests land one after another in the script's order, and the empty
 * rings come up together last. Data access and funding are requests of
 * their own; nothing from the old placeholder survives.
 */
import { expect, it } from "vitest";
import { shown } from "../../script/find";
import { endOf, markup, playOf, startOf } from "./harness";

const STEP = "could-be.play";

it("plays each plate, each card and the rings once, plates first, the cards in order, the rings after the last card", () => {
  for (let i = 0; i < 3; i++) expect(playOf(STEP, `could-be.plate.${i}`)).toHaveLength(1);
  for (let i = 0; i < 6; i++) expect(playOf(STEP, `could-be.card.${i}`)).toHaveLength(1);
  expect(playOf(STEP, "could-be.rings")).toHaveLength(1);
  for (let i = 1; i < 3; i++) expect(startOf(STEP, `could-be.plate.${i}`)).toBeGreaterThan(startOf(STEP, `could-be.plate.${i - 1}`));
  expect(startOf(STEP, "could-be.card.0")).toBeGreaterThanOrEqual(endOf(STEP, "could-be.plate.2") - 1e-9);
  for (let i = 1; i < 6; i++) expect(startOf(STEP, `could-be.card.${i}`)).toBeGreaterThan(startOf(STEP, `could-be.card.${i - 1}`));
  expect(startOf(STEP, "could-be.rings")).toBeGreaterThanOrEqual(endOf(STEP, "could-be.card.5") - 1e-9);
});

it("keeps data access and funding as requests of their own", () => {
  const words = shown("could-be", "play");
  expect(words[12]).toBe("Approve data-access rules");
  expect(words[14]).toBe("Allocate funding");
});

it("draws no arrows, underline or links between the requests, and nothing that fills or ticks", () => {
  expect(markup).not.toMatch(/data-build="could-be\.(?:panel|link|underline|action)/);
  const slide = markup.slice(markup.indexOf('data-build="could-be.marks"'), markup.indexOf('data-build="applied.marks"'));
  expect(slide).not.toMatch(/dk-tick|dk-human|dk-pass/);
});
