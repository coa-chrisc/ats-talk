import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FOOTER, Frame, WORDMARK } from "./frame";

const html = (props: Parameters<typeof Frame>[0]) => renderToStaticMarkup(createElement(Frame, props));
const css = readFileSync(join(import.meta.dirname, "frame.css"), "utf8");
/** A rule's declarations in frame.css, by its whole selector (rules are a blank line apart). */
const rule = (selector: string) => css.match(new RegExp(`(?:^|\\n\\n)${selector.replace(/[.]/g, "\\.")}\\s*\\{([^}]*)\\}`))![1];
const px = (body: string, property: string) => Number(body.match(new RegExp(`(?:^|\\s)${property}:\\s*(-?\\d+)px`))![1]);

describe("the talk's frame", () => {
  it("draws the City of Austin wordmark, the footer and the slide's number on a content slide", () => {
    const markup = html({ number: 12, total: 21 });
    expect(markup).toContain(`<b>${WORDMARK.city}</b><span>${WORDMARK.department}</span>`);
    expect(markup).toContain(`<b>${FOOTER.department}</b> · ${FOOTER.group}`);
    expect(`${FOOTER.department} · ${FOOTER.group}`).toBe("Austin Technology Services · Agentic AI");
    expect(markup).toMatch(/class="ats-frame__number">12</);
  });

  it("keeps both wordmarks, the footer and the number mounted on navy, so the change of ground fades instead of popping", () => {
    for (const ground of [undefined, "navy"] as const) {
      const markup = html({ number: 1, total: 21, ground });
      expect(markup).toContain("ats-frame__logo--ink");
      expect(markup).toContain("ats-frame__logo--white");
      expect(markup).toContain("ats-frame__footer");
      expect(markup).toMatch(/class="ats-frame__number">1</);
    }
    expect(html({ number: 1, total: 21, ground: "navy" })).toMatch(/<div class="ats-frame" data-ground="navy">/);
    expect(html({ number: 12, total: 21 })).toMatch(/<div class="ats-frame">/);
  });

  it("names the wordmark once, by the version that shows, and hides the faded footer from a screen reader", () => {
    const shown = (markup: string) => [...markup.matchAll(/<p class="ats-frame__logo[^"]*"(?: aria-hidden="true")?>/g)].filter(([tag]) => !tag.includes("aria-hidden")).map(([tag]) => tag);
    expect(shown(html({ number: 1, total: 21, ground: "navy" }))).toEqual(['<p class="ats-frame__logo ats-frame__logo--white">']);
    expect(shown(html({ number: 12, total: 21 }))).toEqual(['<p class="ats-frame__logo ats-frame__logo--ink">']);
    expect(html({ number: 1, total: 21, ground: "navy" })).toMatch(/<p class="ats-frame__footer" aria-hidden="true">/);
    expect(html({ number: 12, total: 21 })).toMatch(/<p class="ats-frame__footer">/);
  });

  it("fades the wordmarks and the footer over the ground's half second, and keeps the number on navy", () => {
    expect(rule(".ats-frame")).toMatch(/display:\s*contents/);
    expect(css.match(/\n\.deck\[data-via="advance"\] \.ats-frame__logo,\s*\.deck\[data-via="advance"\] \.ats-frame__footer\s*\{([^}]*)\}/)?.[1]).toMatch(/transition:\s*opacity 0\.5s/);
    expect(rule(".ats-frame__logo--white")).toMatch(/opacity:\s*0;/);
    expect(rule('.ats-frame\\[data-ground="navy"\\] .ats-frame__logo--white')).toMatch(/opacity:\s*1;/);
    expect(rule('.ats-frame\\[data-ground="navy"\\] .ats-frame__logo--ink,\\s*.ats-frame\\[data-ground="navy"\\] .ats-frame__footer')).toMatch(/opacity:\s*0;/);
    expect(css).not.toMatch(/ats-frame__number[^{]*\{[^}]*(opacity|display|visibility)/);
  });

  it("stays in the stage's 64 px edge, clear of the safe area", () => {
    const logo = rule(".ats-frame__logo");
    expect(px(logo, "top") + px(logo, "height")).toBeLessThanOrEqual(64);
    const foot = rule(".ats-frame__footer,\\s*.ats-frame__number");
    expect(px(foot, "top")).toBeGreaterThanOrEqual(1016);
    expect(px(foot, "top") + px(foot, "line-height")).toBeLessThanOrEqual(1080 - 8);
  });

  it("ends the number short of the window's corner, where the deck's counter and back and forward buttons sit", () => {
    expect(px(rule(".ats-frame__number"), "right")).toBeGreaterThanOrEqual(250);
  });
});

/** The kit's colours that a step's ground swaps (kit.css `.deck[data-ground="navy"]`). */
const GROUND_COLOURS = ["night", "raised", "paper", "soft", "rule", "catalog"] as const;
const src = join(import.meta.dirname, "..", "..");
const kit = readFileSync(join(src, "components", "deck", "kit", "kit.css"), "utf8");
const sheets = (readdirSync(src, { recursive: true }) as string[]).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(src, f), "utf8"));
const hue = (name: string) => kit.match(new RegExp(`--dk-${name}:\\s*([^;]+);`))![1].trim();

describe("the ground's change of colour", () => {
  it("registers each colour the ground swaps as a <color> that inherits and starts at the kit's white-ground value", () => {
    for (const name of GROUND_COLOURS) {
      const body = css.match(new RegExp(`@property --dk-${name}\\s*\\{([^}]*)\\}`))?.[1];
      expect(body, `@property --dk-${name}`).toBeDefined();
      expect(body).toMatch(/syntax:\s*"<color>";/);
      expect(body).toMatch(/inherits:\s*true;/);
      const light = hue(name);
      const resolved = light.match(/^var\(--dk-([a-z]+)\)$/) ? hue(light.match(/^var\(--dk-([a-z]+)\)$/)![1]) : light;
      expect(body!.match(/initial-value:\s*([^;]+);/)![1].trim()).toBe(resolved);
    }
  });

  it("only registers them because every value any stylesheet gives them parses as a colour", () => {
    const colour = /^(#[0-9a-f]{6}|rgb\(\d+ \d+ \d+ \/ (0|1|0?\.\d+)\)|var\(--dk-[a-z]+\))$/i;
    const values = sheets.flatMap((sheet) => [...sheet.matchAll(/--dk-(night|raised|paper|soft|rule|catalog):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()] as const));
    expect(values.length).toBeGreaterThanOrEqual(12);
    for (const [name, value] of values) {
      expect(value, `--dk-${name}`).toMatch(colour);
      const ref = value.match(/^var\(--dk-([a-z]+)\)$/);
      if (ref) expect(hue(ref[1]), `--dk-${name} via --dk-${ref[1]}`).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("fades the ground over half a second on this deck alone", () => {
    const body = css.match(/\n\.deck\[data-via="advance"\]:has\(\.ats-frame\)\s*\{([^}]*)\}/)?.[1];
    expect(body).toBeDefined();
    const props = body!.match(/transition-property:\s*([^;]+);/)![1].split(",").map((p) => p.trim());
    expect(props.sort()).toEqual(GROUND_COLOURS.map((n) => `--dk-${n}`).sort());
    expect(body).toMatch(/transition-duration:\s*0\.5s;/);
    expect(css.match(/(^|\n)\.deck\b[^{]*\{/g)).toHaveLength(2);
  });
});
