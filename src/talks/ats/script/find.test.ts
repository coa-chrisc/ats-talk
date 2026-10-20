import { describe, expect, it } from "vitest";
import { breakAfter, elide, pictureOf, shown, stepOf, storyOf } from "./find";

describe("reading the script by id", () => {
  it("finds a picture, a step and what the step shows", () => {
    expect(pictureOf("title").part).toBe(1);
    expect(pictureOf("fleet").number).toBe("15");
    expect(pictureOf("fleet").world).toBe("stands");
    expect(pictureOf("lanes").world).toBe("first");
    expect(pictureOf("lets-talk").world).toBe("ready");
    expect(shown("ladder", "play")).toEqual(["Automation", "Fixed rules", "Copilot", "A person approves every step", "Workflow", "The steps are set", "Agent", "Chooses its own steps", "Stop at the first rung that works", "More to govern", "Plain tool", "No AI inside"]);
    expect(stepOf("four-ideas", "play").show).toEqual(["One", "Four", "Least autonomy that does the job", "Rules the system enforces, scaled to risk", "People before platforms", "Start small and earn the next step", "Enterprise now", "The City now", "What we would do first"]);
    expect(shown("who-decides", "play")).toEqual(["Leadership", "Sets the bright lines", "DCIO", "Decides authority", "CISO", "Owns the controls", "Authority flows down", "Evidence flows up", "What can it touch", "What enforces its limits", "Who would know"]);
  });

  it("finds a picture's story lines, A then B", () => {
    expect(storyOf("residents")).toEqual(["AI helps City staff serve residents, and it never judges a resident or replaces a person's decision.", "The test is whether residents would see the City serving them better over the long term."]);
    expect(storyOf("lets-talk")).toHaveLength(2);
    expect(() => storyOf("nowhere")).toThrow(/nowhere/);
  });

  it("fails loudly on an id the script does not have", () => {
    expect(() => pictureOf("nowhere")).toThrow(/nowhere/);
    expect(() => stepOf("title", "nowhere")).toThrow(/nowhere/);
  });
});

describe("setting a string on several lines", () => {
  it("breaks after each word, in order, and keeps every word", () => {
    expect(breakAfter("Agentic AI at the City: what we learned, and what we would do first.", "City:", "learned,")).toEqual(["Agentic AI at the City:", "what we learned,", "and what we would do first."]);
    expect(breakAfter("Used for residents, never on them.", "residents,")).toEqual(["Used for residents,", "never on them."]);
  });

  it("refuses a break the string does not hold", () => {
    expect(() => breakAfter("Let's talk.", "nowhere")).toThrow(/cannot break/);
  });
});

describe("shortening a file path", () => {
  it("leaves a short path alone", () => {
    expect(elide("catalog/index.md", 22)).toBe("catalog/index.md");
  });

  it("keeps the folder's start and the file's name within the length", () => {
    const short = elide("catalog/inspection-backlog-dashboard/index.md", 22);
    expect(short).toBe("catalog/insp…/index.md");
    expect(short.length).toBe(22);
  });
});
