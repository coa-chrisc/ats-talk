import { describe, expect, it } from "vitest";
import { breakAfter, elide, pictureOf, shown, stepOf, storyOf } from "./find";

describe("reading the script by id", () => {
  it("finds a picture, a step and what the step shows", () => {
    expect(pictureOf("title").part).toBe(1);
    expect(pictureOf("controls").number).toBe("12a");
    expect(pictureOf("rad-born").number).toBe("6b");
    expect(pictureOf("rad-evolves").number).toBe("9a");
    expect(shown("rad-evolves", "play")).toEqual(["Austin Public Health", "RAD process", "One ATS", "Infrastructure", "Security", "AI", "TSP", "Technology selection process", "EPMO", "Project management"]);
    expect(pictureOf("program-team").number).toBe("19a");
    expect(pictureOf("lift-developers").number).toBe("19b");
    expect(pictureOf("lift-developers").world).toBe("plan");
    expect(shown("program-team", "play")).toEqual(["Departments", "AI program team", "Strategy", "Architecture", "Consulting", "Leadership", "40-plus developers", "How do we lift them?"]);
    expect(shown("lift-developers", "play")).toEqual(["40-plus developers", "Stuck", "Cycle time", "Backlog", "AI training and tools", "Software development lifecycle", "One unified toolset", "Agile practices", "AI program team"]);
    expect(pictureOf("the-catalog").world).toBe("backup");
    expect(stepOf("safe", "play").show).toEqual(["Other City applications", "Security Office", "Microsoft", "Quisitive", "Our sandbox", "Cannot reach other City applications", "Data we place"]);
    expect(shown("too-long", "play")).toEqual(["Monday", "Friday", "Stakeholder", "Working prototype", "Feedback", "Ready for a pilot", "Failed pilot, about $200"]);
  });

  it("finds a picture's story lines, A then B", () => {
    expect(storyOf("residents")).toEqual(["The City can use AI to help staff serve residents, and never to judge residents or replace staff.", "The test is whether residents would see the City serving them better over the long term."]);
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
    expect(breakAfter("Building with AI at the City of Austin.", "AI", "City")).toEqual(["Building with AI", "at the City", "of Austin."]);
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
