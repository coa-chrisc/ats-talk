import { storyKeys } from "@/components/deck/kit";
import { describe, expect, it } from "vitest";
import { endOf, showsAfter, startOf } from "./harness";
import { RESIDENTS as R } from "./layout-residents";
const click = "residents.play";
const [A, B] = storyKeys("story.residents", 2);

describe("32, resident service", () => {
  it("shows assistance, then human responsibility, then resident benefit with reading pauses", () => {
    expect(startOf(click, R.arrows[0].key)).toBeGreaterThanOrEqual(endOf(click, R.stages[0].key) + 1);
    expect(startOf(click, R.stages[1].key)).toBeGreaterThanOrEqual(endOf(click, R.arrows[0].key));
    expect(startOf(click, R.mark.key)).toBe(startOf(click, R.stages[1].key));
    expect(startOf(click, R.arrows[1].key)).toBeGreaterThanOrEqual(endOf(click, R.mark.key) + 1.4);
    expect(startOf(click, R.stages[2].key)).toBeGreaterThanOrEqual(endOf(click, R.arrows[1].key));
  });
  it("finishes the explanation and service question before revealing both sentences together", () => {
    expect(startOf(click, R.question.key)).toBeGreaterThanOrEqual(endOf(click, R.stages[2].key) + 1.4);
    expect(startOf(click, A)).toBe(startOf(click, B));
    expect(startOf(click, A)).toBeGreaterThanOrEqual(endOf(click, R.question.key) + 0.4);
    for (const key of [...R.stages.map(s => s.key), R.mark.key, R.question.key]) expect(showsAfter(click, key)).toBe(true);
  });
});
