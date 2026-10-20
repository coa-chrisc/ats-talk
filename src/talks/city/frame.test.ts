import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FOOTER, Frame, LOGO, LOGO_WHITE } from "./frame";

const html = (props: Parameters<typeof Frame>[0]) => renderToStaticMarkup(createElement(Frame, props));
const css = readFileSync(join(import.meta.dirname, "frame.css"), "utf8");
/** A rule's declarations in frame.css, by its whole selector (rules are a blank line apart). */
const rule = (selector: string) => css.match(new RegExp(`(?:^|\\n\\n)${selector.replace(/[.]/g, "\\.")}\\s*\\{([^}]*)\\}`))![1];
const px = (body: string, property: string) => Number(body.match(new RegExp(`(?:^|\\s)${property}:\\s*(-?\\d+)px`))![1]);

describe("the talk's frame", () => {
  it("draws the Austin Public Health logo, the footer and the slide's number on a content slide", () => {
    const markup = html({ number: 12, total: 40 });
    expect(markup).toContain(`src="${LOGO.src}"`);
    expect(markup).toContain('alt="Austin Public Health"');
    expect(markup).toContain(`<b>${FOOTER.department}</b> · ${FOOTER.group}`);
    expect(`${FOOTER.department} · ${FOOTER.group}`).toBe("Austin Public Health · AI Strategy");
    expect(markup).toMatch(/class="city-frame__number">12</);
  });

  it("keeps both logos, the footer and the number mounted on navy, so the change of ground fades instead of popping", () => {
    // The parts that come and go are faded by opacity, which needs them in the page on both grounds.
    for (const ground of [undefined, "navy"] as const) {
      const markup = html({ number: 1, total: 40, ground });
      expect(markup).toContain(`src="${LOGO.src}"`);
      expect(markup).toContain(`src="${LOGO_WHITE}"`);
      expect(markup).toContain("city-frame__footer");
      expect(markup).toMatch(/class="city-frame__number">1</);
    }
    expect(html({ number: 1, total: 40, ground: "navy" })).toMatch(/<div class="city-frame" data-ground="navy">/);
    expect(html({ number: 12, total: 40 })).toMatch(/<div class="city-frame">/);
  });

  it("names the logo once, by the version that shows, and hides the faded footer from a screen reader", () => {
    const named = (markup: string) => [...markup.matchAll(/<img[^>]*>/g)].filter(([img]) => img.includes('alt="Austin Public Health"')).map(([img]) => img);
    const white = named(html({ number: 1, total: 40, ground: "navy" }));
    expect(white).toHaveLength(1);
    expect(white[0]).toContain(LOGO_WHITE);
    const ink = named(html({ number: 12, total: 40 }));
    expect(ink).toHaveLength(1);
    expect(ink[0]).toContain(LOGO.src);
    expect(html({ number: 1, total: 40, ground: "navy" })).toMatch(/<p class="city-frame__footer" aria-hidden="true">/);
    expect(html({ number: 12, total: 40 })).toMatch(/<p class="city-frame__footer">/);
  });

  it("fades the logos and the footer over the ground's half second, and keeps the number on navy", () => {
    expect(rule(".city-frame")).toMatch(/display:\s*contents/);
    expect(css.match(/\n\.deck\[data-via="advance"\] \.city-frame__logo,\s*\.deck\[data-via="advance"\] \.city-frame__footer\s*\{([^}]*)\}/)?.[1]).toMatch(/transition:\s*opacity 0\.5s/);
    expect(rule(".city-frame__logo--white")).toMatch(/opacity:\s*0;/);
    expect(rule('.city-frame\\[data-ground="navy"\\] .city-frame__logo--white')).toMatch(/opacity:\s*1;/);
    expect(rule('.city-frame\\[data-ground="navy"\\] .city-frame__logo--ink,\\s*.city-frame\\[data-ground="navy"\\] .city-frame__footer')).toMatch(/opacity:\s*0;/);
    expect(css).not.toMatch(/city-frame__number[^{]*\{[^}]*(opacity|display|visibility)/);
  });

  it("keeps the logo's proportions (1920 by 646) and stays in the stage's 64 px edge, clear of the safe area", () => {
    expect(LOGO.w / LOGO.h).toBeCloseTo(1920 / 646, 1);
    const logo = rule(".city-frame__logo");
    expect(px(logo, "top") + LOGO.h).toBeLessThanOrEqual(64);
    const foot = rule(".city-frame__footer,\\s*.city-frame__number");
    expect(px(foot, "top")).toBeGreaterThanOrEqual(1016);
    expect(px(foot, "top") + px(foot, "line-height")).toBeLessThanOrEqual(1080 - 8);
  });

  it("ends the number short of the window's corner, where the deck's counter and back and forward buttons sit", () => {
    // The corner (engine deck.css) is about 150 window px wide, which is about 225 stage px in a 1280 window; the number ends 272 px from the stage's right edge.
    expect(px(rule(".city-frame__number"), "right")).toBeGreaterThanOrEqual(250);
  });
});

/** The kit's colours that a step's ground swaps (kit.css `.deck[data-ground="navy"]`). */
const GROUND_COLOURS = ["night", "raised", "paper", "soft", "rule", "catalog"] as const;
const src = join(import.meta.dirname, "..", "..");
const kit = readFileSync(join(src, "components", "deck", "kit", "kit.css"), "utf8");
/** Every stylesheet under src/, so a value set anywhere is checked, not only in the kit. */
const sheets = (readdirSync(src, { recursive: true }) as string[]).filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(src, f), "utf8"));
/** A kit token's value, as `.deck` declares it, by its name without the `--dk-`. */
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

  it("only registers them because every value any stylesheet gives them parses as a colour, so the BCHC deck draws as before", () => {
    // A registered <color> drops a value that is not one, so a value that failed would change a deck that never asked for the fade.
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
    const body = css.match(/\n\.deck\[data-via="advance"\]:has\(\.city-frame\)\s*\{([^}]*)\}/)?.[1];
    expect(body).toBeDefined();
    const props = body!.match(/transition-property:\s*([^;]+);/)![1].split(",").map((p) => p.trim());
    expect(props.sort()).toEqual(GROUND_COLOURS.map((n) => `--dk-${n}`).sort());
    expect(body).toMatch(/transition-duration:\s*0\.5s;/);
    // Only the ground fade and the logo and footer fade reach the deck root, both on a played click.
    expect(css.match(/(^|\n)\.deck\b[^{]*\{/g)).toHaveLength(2);
  });
});
