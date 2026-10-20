import { afterEach, describe, expect, it, vi } from "vitest";

/** The helper as a build with this base path would inline it. */
async function load(base: string | undefined) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_BASE_PATH", base);
  return import("./base-path");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("withBase", () => {
  it("leaves a path as it is when the deck is served from the root", async () => {
    const { BASE_PATH, withBase } = await load(undefined);
    expect(BASE_PATH).toBe("");
    expect(withBase("/logos/cmu.v1.svg")).toBe("/logos/cmu.v1.svg");
  });

  it("puts the GitHub Pages project path in front of a public file and a page", async () => {
    const { withBase } = await load("/ats-talk");
    expect(withBase("/brand/aph-logo.v1.png")).toBe("/ats-talk/brand/aph-logo.v1.png");
    expect(withBase("/notes/")).toBe("/ats-talk/notes/");
  });
});
