# City deck build handbook

Written 2026-10-18 from a read of the BCHC talk as it stands on `crypticpy/Presentation` (65f667b). It's for the agents who build the second talk, the City deck, at the site root (`/`). Paths are relative to the repo root. The outline is `docs/sizzle-outline.md`. The script will be `docs/city-talk-script.md`, mirrored in `src/talks/city/script/part-*.ts`.

**In this repo.** The handbook was written in the Above Earth Productions site repo, where the City deck was built next to the BCHC talk. Paths under `src/talks/bchc/` and `src/app/talks/` describe that repo. This repo holds the City deck on its own: the deck is at `/` (`src/app/page.tsx`), the speaker notes at `/notes/`, the Austin Public Health logos in `public/brand/` and the City logos in `public/logos/`, every public path through `withBase()` (`src/lib/base-path.ts`). From the BCHC talk it keeps only the three files the `plan` world imports, under `src/talks/bchc/worlds/start/`. There is no phone remote: GitHub Pages serves files only.

## 0. The BCHC pictures the City deck reuses, by id

The owner names slides by their **footer** number, which is the click index. The script names them by its own number, and the two drift apart wherever a slide was cut, lettered or given two clicks. Always confirm a slide by its id.

| Brief says | Script no. | Footer | Picture id | World | Files under `src/talks/bchc/worlds/` |
|---|---|---|---|---|---|
| slide 2, catalog | 2 | 2 | `the-catalog` | catalog | `layout.ts` (`CATALOG`, `STILLS`), `scene-catalog.tsx`, `steps-catalog.ts`, `moves.ts` |
| slide 9, catalog | 9 | 8 | `three-days` (three working sessions) | catalog | `layout.ts` (`DAYS`), `scene-catalog.tsx`, `steps-catalog.ts` |
| (or) footer 9 | 10 | 9 | `proof` (agents build the catalog wireframe) | catalog | `layout-why.ts` (`PROOF`), `scene-why.tsx`, `steps-why.ts` |
| slide 10, calendar | 11 | 10 | `too-long` | catalog | `layout-why.ts` (`TOO_LONG`), `scene-why.tsx`, `steps-why.ts` |
| slide 12, AI that builds the tool | 12 | 12 | `ai-builds` | catalog | `layout-why.ts` (`AI_BUILDS`), `scene-why.tsx`, `steps-why.ts` |
| 14a, what the lead agents read | 14a | 16 | `setup` | build | `layout-setup.ts`, `scene-setup.tsx`, `steps-intro.ts`, `beats.ts`, `layout.ts` |
| 19, epics/sprints/waves (2 clicks) | 19 | 20–21 | `split` (`plan`, `work`) | build | `layout-board.ts`, `scene-board.tsx`, `steps-board.ts` (carries keys from `layout-setup.ts`, `layout-library.ts`) |
| 21, two reviewers then a person | 21 | 23 | `reviewed` | build | `layout-close.ts`, `scene-close.tsx`, `steps-close.ts` (imports `layout-board.ts`) |
| 38s, data fence | 38s | 45 | `safe` | start | `layout-safe.ts`, `scene-safe.tsx`, `parts-safe.tsx`, `steps-safe.ts`, `safe.test.ts` (uses `layout.ts`, `moves.ts`, `parts*.tsx`, `story.tsx`) |

"Slide 9" is ambiguous. Script 9 is `three-days`, but footer 9 is `proof`. Ask the orchestrator which one is meant.

## 1. How a talk is wired

**Types** are in `src/components/deck/engine/types.ts` and exported from `@/components/deck/engine`.
- `DeckDef = { id, title, notesPath, worlds: WorldEntry[], Backdrop?, chrome?, Frame? }`. `id` names the BroadcastChannel, the timer and the remote pairing. BCHC uses no `chrome` and no `Backdrop`, and `deck.test.ts` asserts that.
- `WorldEntry = { title, world: WorldDef, copy?: Record<stepId, { title, note? }> }`. `copy` holds the overview title and the speaker note.
- `WorldDef = { id, Scene, plane?, camera?, steps: StepDef[], anchors? }`. `Scene` is static markup that is mounted once. Every moved part carries `data-build="<key>"`, and the driver looks keys up inside the world's root (`engine/driver.ts:20`), so keys only need to be unique within a world.
- `StepDef = { id, moves: Move[], chrome?, ground?: "navy" }`. A `PartMove` is `{ key, on, off?, duration?, ease?, stagger?, at?, with?, lag? }`.

**`src/talks/bchc/deck.ts`** is the whole definition:
```ts
export const deck: DeckDef = { id: "bchc", title: "Using AI in Public Health Practice", notesPath: "/talks/bchc/notes", Frame,
  worlds: [catalogEntry, buildEntry, sharingEntry, releasingEntry, startEntry, closeEntry] };
```

**A world folder** (`src/talks/bchc/worlds/<world>/`) splits its work like this:
- `layout*.ts`: every position, every key and every word, read from the script at module load. For example, `const [NEED, MONTHS, QUOTE, NO] = shown("too-long", "play")`.
- `scene*.tsx`: static JSX built from the layout constants and kit parts, wrapped in `<Plane marks={svg} over={html}>`, with titles as `SetText` and story bands as `Story`. The world's CSS is imported once in `scene.tsx`.
- `steps*.ts`: `picture("<id>", { play: { moves: chain([...]) } })` for each picture.
- a world-local helper file (`moves.ts` or `beats.ts`) holding the retitle, leave and chain wrappers.
- `<world>.css`: one class prefix per world (`catalog-`, `bw-`, `sh-`, `rel-`, `st-`, `close-`).
- `world.ts`: the entry.
- `harness.ts`: the test view of the world (compiled once, markup rendered once). Only tests import it.

```ts
export const startEntry: WorldEntry = { title: worldTitle("start"),
  world: { id: "start", Scene, steps: [...stepsOfSteps(), ...stepsOfTwo(), ...stepsOfPath(), ...stepsOfAsk()] },
  copy: copyFor(picturesOf("start")) };
```

**Helpers that read the script.**
- `src/talks/bchc/script/find.ts` provides `pictureOf(id)`, `stepOf`, `shown(pictureId, stepId)` (that step's `show` list), `storyOf`, and `breakAfter(text, ...words)` for line breaks. `breakAfter` throws if a word is missing.
- `src/talks/bchc/worlds/steps.ts` is shared by every world:
  - `picture(id, beats, { ground? })` throws on a missing or unknown step and gives each step the id `<picture>.<step>`.
  - `story(id, 0|1, opts)` raises story line A or B with the kit's `tell`, and throws if the line doesn't exist.
  - `storyId`, `picturesOf(world)`, `copyFor(pictures)` (title `"N. Name"`, note = You say), `worldTitle(world)` (from `PARTS`).
- `label(pictureId, text)` is in `worlds/catalog/layout.ts:27`. It returns `text` only if the picture's They see quotes it as `"text"`, and throws otherwise. `quoted(pictureId)` lists every quoted phrase. The start world uses `labelsOf(id) = shown(id, "play")` instead (`worlds/start/layout.ts:42`).

**Frame.** `src/talks/bchc/frame.tsx` and `frame.css` draw:
- on white: the APH logo (`/talks/bchc/brand/aph-logo.v1.png`, 40 px tall) at top 14 / left 96, the footer `FOOTER = { department: "Austin Public Health", group: "BCHC Data Modernization Work Group" }` at top 1034, and the number at `right: 272px`, which keeps it clear of the deck's corner controls;
- on navy (`ground`): only `aph-logo-white.v1.png`.

The footer group is hard-coded and so are the `bchc-frame__*` classes. `frame.test.ts` asserts the BCHC footer string.

**Routes** live in `src/app/talks/bchc/`:
- `page.tsx` (server): `metadata` with `robots: { index: false, follow: false }`. It loads Geist with `next/font/google` as `--font-geist` and wraps `<BchcDeck/>` in its class. The kit's `--dk-face` reads `--font-geist` (`kit/kit.css:26`), so a page that skips Geist falls back to Helvetica.
- `bchc-deck.tsx` (`"use client"`): `<Deck deck={deck} remotePath="/talks/bchc/remote"/>` and `<NotesView .../>`. Scenes are components, so the definition has to live on the client.
- `notes/page.tsx`: renders the notes view, sets `viewport: { viewportFit: "cover" }` and noindex.
- `remote/route.ts`: `POST`, `runtime = "nodejs"`, `DECK_ID = "bchc"`, `MAX_BODY = 1024`, a `fromThisSite` origin check, and `handleRemote(body, { apiKey: process.env.ABLY_API_KEY, deckId })`. It answers 503 without the key, and the keyboard works regardless.
- `deck-check.mjs` opens `${url}/notes`, so the notes page must sit at `<deck url>/notes`.
- No sitemap or nav entry exists; `src/lib/routes.ts` doesn't list talks. The deck overlays the site as `position: fixed; z-index: 60` (`engine/deck.css`).

### What the City deck needs

```
src/app/{layout.tsx, page.tsx, talk.tsx, notes/page.tsx}                          # the deck at /, its notes at /notes/
src/talks/city/deck.ts, deck.test.ts, frame.tsx, frame.css, frame.test.ts         # footer group changed
src/talks/city/script/{types.ts, index.ts, find.ts, find.test.ts, script.test.ts, part-1-...ts ...}
src/talks/city/worlds/{steps.ts, flow.test.ts}                                    # copies, import ../script
src/talks/city/worlds/<world>/{world.ts, scene.tsx, layout*.ts, steps*.ts, moves.ts, <world>.css, harness.ts, world.test.ts, layout.test.ts}
```
Set `id: "city"` and `notesPath: withBase("/notes/")`. `src/app/talk.tsx` passes no `remotePath`, so the deck offers no phone remote.

### Import or copy? (the coupling)

**A City world can't import a BCHC layout, scene or steps file and feed it City words. Copy those files.** The coupling is hard:
- Every `layout*.ts` calls `shown()`, `pictureOf()`, `label()` or `labelsOf()` from `../../script/find` at **module load**. `find.ts` imports `SCRIPT` from `./index`, which is the BCHC script. Importing `layout-why.ts` therefore evaluates `shown("too-long", "play")` against the BCHC script and bakes in BCHC words. No parameter exists to swap them.
- Every `steps*.ts` calls `picture("too-long", …)` from `../steps`, which reads the BCHC `SCRIPT`. The step ids come out as BCHC picture ids, and the City `deck.test` would reject them.
- The scene files are free of script calls themselves, but they import the layout constants, so they inherit the coupling. The layouts also lean on each other: `layout-board.ts` imports `layout.ts`, which evaluates `shown("design")`, `shown("rad")` and `shown("week")`. `steps-board.ts` also pulls carry keys from `layout-setup.ts` and `layout-library.ts`.

The transitive import graph has only these BCHC files free of the script: `frame.tsx`, `worlds/build/{kinds.ts, parts.tsx, scene-tools.tsx}`, `worlds/releasing/drawings.tsx` and `worlds/start/{parts.tsx, parts-figures.tsx, parts-safe.tsx, parts-ask.tsx}`. A City world may import those drawing primitives as they are. They're styled by their world's CSS (`bw-*` lives in `build.css`, `st-*` in `start.css`), so import that CSS too, or copy the parts along with the rules they use.

Always importable: `@/components/deck/engine`, `@/components/deck/kit`, and public assets by URL through `withBase()` (`/brand/*.v1.png`, `/logos/*.v1.svg`).

**Recipe for a reused picture:**
1. Copy its layout, scene, steps and helper files, plus the layouts they import, into `src/talks/city/worlds/<world>/`.
2. Repoint `../../script/find` and `../steps` to the City copies.
3. Rename the picture ids to the City script's ids.
4. Re-prefix the CSS classes (CSS is global across routes on client navigation).
5. Delete whatever the City picture doesn't use. The `safe` slide, for example, carries the "Step two" kicker from slide 36.
6. Copy the picture's tests and update them.

Never edit `src/talks/bchc/**` for the City deck. BCHC is shipped, its tests are tight, and it is mirrored to `crypticpy/bchc-talk`.

## 2. The script: module and document

**`script/types.ts`:**
```ts
export const WORLDS = ["catalog", "build", "sharing", "releasing", "start", "close"] as const;   // City: its own list
export type Step = { id: string; show: string[] };
export type Picture = { id; number; part; world: WorldId; name; show; say; see: string[]; story: string[]; steps: Step[] };
```

**What each field holds:**
- `show`: the On screen line (the title).
- `say`: You say.
- `see`: They see, one entry for the paragraph plus one per list item.
- `story`: zero to two story lines.
- `steps`: the clicks. Each step's `show` is every label that click puts on stage besides the title and the story lines, in the order they arrive.

**Files:**
- `part-N-<slug>.ts` exports `CONST: Picture[]` and **must import only types**. `close/finale-pictures.mjs` loads the parts with Node's type stripping.
- Extra artefact strings may sit beside a part (`part-1` exports `ADDRESS`, `APPROVED_AT`, `ENTRY_FILES`).
- `index.ts` exports `SCRIPT` (all parts joined in order), `PARTS` (part names as the doc heads them) and re-exports `WORLDS`.

**Document format, as parsed by `script/script.test.ts` `approved()`:**
```
## Part 1. The catalog (about 8 minutes)        <- regex ^## Part (\d)\. (.*) \(about \d+ minutes\)$ (single digit)
### 11a. The tools gap                          <- ^### (\d+[a-z]?)\. (.*)$ ; a trailing " (new)" or " (two clicks)" is dropped
**On screen:** <title, one line>
- <story line A> *(click 2)*                    <- bullets right under On screen = story; " *(click N)*" stripped
- <story line B>
**They see:** <paragraph on this same line>     <- or numbered "1. " lines / "- " bullets after it
   Labels: A / B / C                            <- indented; labels the clicks must show, in order
**You say:** <one paragraph on this same line>
```

Parser traps:
- Only the text on the `**You say:**` line is read. A second paragraph is silently dropped, and then the module (which must match) can't hold it either.
- A They see paragraph must also start on its own line.
- Any `## ` heading that isn't `## Part N. … (about M minutes)` ends parsing of pictures until the next Part heading, so backup slides under `## Backup` aren't pictures.
- `&amp;` reads as `&`.
- In They see, `"quoted"` phrases are labels on screen, except the role names ("a person approves", "passed").

**What must match word for word:**
- For every picture, the module's `{ part, number, name, show, story, say, see }` must equal the document's.
- `PARTS` must equal the Part headings.
- Every `Labels:` entry must appear in that picture's `steps[].show`, in order.

**Per-talk constants to rewrite:** the picture count (`toHaveLength(50)`), the `PLAN` list of `[pictureId, stepIds]`, `WORLD_OF_PART`, the two-click slides and the total step count (52), `OFF_SCRIPT`, `LONG_STORY` and `GITHUB_TERMS_SAID`.

**Copy rules the test enforces** on what is shown and said (On screen, You say, story lines and labels; headings and They see are exempt):
- no em or en dashes;
- no leverage, seamless, delve, tapestry, robust, game-changing, cutting-edge, unlock or empower;
- no "PowerPoint", "slide deck" or "slideshow" before the last part;
- American spelling;
- no "journey", "simply", "at the end of the day" or `!`;
- spell out two to nine; numerals from 10, and the words ten, eleven, twelve, fifteen, twenty, thirty, forty and fifty are banned. The outline's "Twenty-five years" has to be written "25 years" wherever it is voiced. Dates like "October 6" are allowed;
- On screen starts with a capital;
- no "pull request" or "fork";
- each label must be a run of its picture's own On screen, You say or They see words (case-insensitive, closing period ignored), at most 60 characters, and trimmed;
- story lines: at most two, each a sentence (capital start, ending `.`), at most 100 characters unless listed in `LONG_STORY`. Only the close may have none.

## 3. Tests a world must satisfy

These tests apply to the whole repo automatically, so City files are checked without any copying:
- `src/components/deck/forbidden.test.ts` scans `src/components/deck` and `src/talks`. It bans CSS `filter:`/`backdrop-filter:`, `mix-blend-mode`, the script equivalents (`style.filter`, `backdropFilter`) and SVG `<filter>`/`<fe*>`. The file is not under `kit/`.
- `src/components/deck/kit/palette.test.ts` scans all of `src`. No file but `kit.css` may name a hue token (`--dk-green|indigo|gold|pink|sky`). Use the role aliases.
- The engine and kit unit tests.

These are generic per deck, and BCHC's are bound to BCHC, so copy them into `src/talks/city/`:
- `deck.test.ts`: world order equals `WORLDS`; addresses equal `SCRIPT`'s `world/picture.step`, each once; copy equals `{ title: "N. Name", note: say }`; every world compiles; no chrome and no backdrop; the Frame is set; the navy steps are exactly the title and the close (BCHC hard-codes `["1","44"]`).
- `worlds/flow.test.ts`: inside any click the stage is never still for more than `CHAIN.still` (3 s), counting staggers by the number of elements that carry each key.
- `script/script.test.ts` (section 2), `script/find.test.ts` (id lookups, `breakAfter`, `elide`) and `frame.test.ts` (footer string, logo inside the 64 px edge, footer top at 1016 or more).

These are per world. Copy the closest BCHC suite and keep every house rule. `catalog/world.test.ts` and `sharing/world.test.ts` are the fullest. The common set:
- the steps equal the world's script pictures, in order; it compiles (`compile()` throws if a moved prop has no `off`);
- every moved key exists in the markup, and every part in the markup is moved (nothing sits on stage all talk);
- every click ends within `CHAIN.longest` (12 s). The first click of a world adds `LEAVE = 0.6`, the previous world's fade, from `engine/director.ts:20`;
- the camera stays home;
- the first click of each picture shows only its own parts plus declared carries;
- story lines come up inside their click, A before B;
- **words**: every text node in the rendered markup is a title row, story line, `step.show` label or a quoted They see phrase the world allows. Scene files contain no JSX text. Sharing goes further: no script phrase may appear anywhere in `scene*.tsx`, `beats.ts` or `steps-*.ts`, **comments included** (`source.includes(words)`). Keep script words out of comments;
- **colour**: `strayTokens(source)` is empty, so only the `WORLD_TOKENS` from `kit/palette.ts` are used; orange (`--dk-human`, `#f4642c`) only through `HumanMark` and the word "Approved"; `--dk-pass` only on a passed tick; no `--fr-*` vendor colours; no gradient, drop-shadow or box-shadow;
- **motion**: no `Math.random`, `Date`, `setTimeout`, `setInterval`, `requestAnimationFrame`, `transition:`, `animation:`, `repeat` or `yoyo`;
- sharing also checks that every module stays under 500 lines;
- `layout.test.ts` (catalog pattern): each picture's drawn boxes start below its story band foot (`storyRows(band, rows).at(-1).y + STORY.pitch`) and sit inside `SAFE = { top: 64, bottom: 1016, left: STORY.x - 16, right: STORY.x + STORY.w }`, plus per-picture "apart" and "inside" checks;
- per-picture suites (`world-why.test.ts`, `safe.test.ts`, `process.test.ts`) assert the order of beats with `startOf`, `endOf`, `moved` and `stateAfter` from the harness. When you copy a picture, copy its suite and its harness readers too.

## 4. Steps and motion

**Verbs** (`src/components/deck/kit/verbs.ts`, exported from `@/components/deck/kit`). Each verb carries its `off`, which is what lets compile work. The list:
- `to(key|keys, on, off?, opts)` is the escape hatch. A list of keys staggers (`STAGGER.base` 0.09).
- `show` and `hide` (0.4 s, soft); `rise` (autoAlpha plus y from 22, 0.75 s, expo.out); `lines` (yPercent 120 to 0, for a SetText's lines); `tell` (a story line).
- `draw` (`--d` 0 to 1, 0.9 s, power2.inOut); `fill` (`--k`); `wipe`/`unwipe` (clip insets, `from` an edge or corner; use it for dashed outlines, which can't stroke-draw).
- `mark` (the human mark lands); `annotate`; `ghost` (0.25); `dim` (0.45); `solid`.
- `send` and `ride` (along a path, through a driven `along`); `count`; `type`; `light`; `open` (a gate's `--k`).
- `pass`, `fail`, `take`, `clear` and `work` (board cells); `spread` and `gather`; `camera(framing)`.
- `retitle(from, next)`: the old title fades over 0.3 s while the new title's lines come up from 0.25 s over 0.9 s (`RETITLE`).
- `step(id, moves)`.

**Tokens** (`kit/tokens.ts`):
- `EASE` = `out` expo.out, `page`, `carry`, `soft`, `draw` power2.inOut, `count` power3.out. `page`, `soft` and `carry` are registered in `engine/gsap.ts`.
- `DUR` = quick 0.4, base 0.75, slow 1.1, draw 0.9, travel 1.2, count 1.4. `STAGGER` = 0.05 / 0.09 / 0.16. `RISE` = 22. `STAGE` = 1920×1080.
- `HOLD = { read: 1.6, gap: 0.5 }`. `CHAIN = { longest: 12, still: 3 }`.
- Engine defaults (`engine/compile.ts`): `BEAT` 0.13 between unspecified moves; `HOUSE` 0.75 s, expo.out.

**Timing semantics** (`compile.ts`):
- A move starts at its own `at`. Without one it starts `BEAT` after the previous move, or with the previous move if `with` is set. `lag` shifts the move without delaying the moves after it.
- **`chain(beats, { at, counts })`** writes an explicit `at` on every move. A beat starts `hold` seconds (default `HOLD.gap`) after everything so far has landed. With `with: true` it starts `hold` (default 0) after the previous beat's *start* instead, which is how a story line and the drawing it describes arrive together.
- `counts` gives how many elements carry a staggered key, so landing times are right.
- Wrap it as the world does: `chained(beats)` in `start/moves.ts`, `beats()` in `build/beats.ts`, `play()` in `catalog/moves.ts`.

**End-state rule.**
- Each step's picture is the baseline (the first `off` given for each prop) with every `on` applied up to that step. Back, jump and reload all *cut* to that state (`compile.ts` header).
- Every visible state must therefore be a move's `on`/`off`. Use no CSS transitions and nothing that measures the DOM. A numeric picture uses `kit/driven.ts`.
- A click pressed during a chain finishes the chain and stops on its end state.

**Budget.**
- One click plays the whole slide: retitle, drawing and story lines.
- It ends within 12 s from the click (plus the 0.6 s hand-over on a world's first click), with no stillness over 3 s. Most chains run 5 to 9 s.
- The chain ends on a drawing or a story line, never on a hold.
- Only a slide where the audience must sit on a half-finished picture gets two clicks (`split`: `plan`/`work`; `network`: `grow`/`outside`).

**`show` vs the stage.**
- A step's `show` strings are the labels its click brings on. Layouts take them by position (`const [A, B] = shown(id, "play")`), so reordering `show` in the script moves the words between parts.
- They see quotes reach the stage through `label()`.
- Titles come from `breakAfter(picture.show, ...BREAKS[id])`. Story rows come from `storyOf` (or `breakAfter` for a long line).

**Exemplar: `worlds/start/`, slide 38s `safe`.** These files are the model to copy:
- `layout-safe.ts`: words from `labelsOf("safe")`, every box a literal or derived number, and comments that say why;
- `scene-safe.tsx`: 51 lines, pure;
- `parts-safe.tsx`: script-free primitives;
- `steps-safe.ts`: one `picture("safe", { play: chained([...]) })` with named timing constants, `with`/`hold` beats, story lines tied to the beat they describe, and travel built from `to(x)` plus `to(y)` on different eases;
- `safe.test.ts`: asserts each beat's order and the end state.

It is the newest picture, written after the copy, motion and cold-viewer review gates, and it is one of the reused slides. For world-level house rules (words, colour, motion, 500-line limit, story lines), use `worlds/sharing/world.test.ts` as the model.

## 5. Verify pipeline

The gates match CI (`.github/workflows/ci.yml`):
```
npm run lint          # eslint (next core-web-vitals + typescript)
npm run typecheck     # tsc --noEmit
npm test              # vitest run, include src/**/*.test.ts, node env
npx vitest run src/talks/city            # quick loop
npm run build
```

**Builds and servers.**
- One `next build` runs at a time across agents. Take the lock with `mkdir /tmp/bchc-build.lock`; the mkdir fails if another agent holds it. Release it with `rmdir`, set in a `trap`.
- One browser runs at a time, under `/tmp/bchc-browser.lock`, handled the same way.
- These lock names are an orchestrator convention, not in the repo. Share them with the BCHC agents, since it's the same machine.
- Wait for a lock with the harness's wait tool. Don't poll with a bare foreground `sleep`.
- Serve with `timeout 1500 npx next start -p <port>`. `kill` is hook-denied, so a server has to time itself out.
- Ports 4400–4799 are already used. Take a fresh one (4800+), and use 3000 or 3219 only if told to.
- A new worktree needs `npm ci`, or the build fails.
- Headless only. Never use MCP browser tools for agent testing, and open a headed browser only to show the owner.

**deck-check** (`src/components/deck/check/deck-check.mjs`). Playwright isn't a dependency, so run it through npx against a built and started site:
```
npx -y -p playwright@1.63.0 node src/components/deck/check/deck-check.mjs http://localhost:<port>/ [--browsers=chromium] [--sizes=1920x1080]
```
- For every step it checks:
  - that played, cut-back and cold-loaded pictures match (tolerance 0.0005 of pixels);
  - that every named part exists;
  - that a double press never skips a step;
  - that the end jumps land correctly;
  - that `<url>/notes/` drives the deck;
  - that the on-screen buttons move exactly one step;
  - and it times each build's frames.
- The default sizes are 1920×1080, 1366×768 and 1280×720 in chromium and webkit.
- `--headed` exists only for frame pacing the owner watches. Report headless numbers.

**Headless shots.** No general shot script exists. The page exposes `window.__deck = { ready(), busy(), position(), number(), total, hash(n), missing() }`.
- A cold still of step n: goto `url + __deck.hash(n)`, hide `.deck-chrome`, press Enter on `.deck-gate__start`, wait for `ready() && !busy()`, then screenshot. `capture-finale.mjs` `open()` does exactly this.
- `capture-finale.mjs --steps=…` can be pointed at `/tmp` for quick looks, but it reads the BCHC script for its cell count.

**Finale stills** come from `src/talks/bchc/worlds/close/capture-finale.mjs`. The `src/talks/bchc/capture/*.mjs` scripts are different: they capture the public catalog website's stills.
- It captures each picture before the close at the end of its last step, loaded cold at 1920×1080 with the frame kept and the deck chrome hidden.
- It saves `NN.<version>.webp` at 352×198 (ffmpeg, then cwebp at q86), plus `hero.<version>.webp` at full size from picture 1, which slide 44 pulls back from.
- Command:
  ```
  npx -y -p playwright@1.63.0 node src/talks/bchc/worlds/close/capture-finale.mjs http://localhost:<port>/talks/bchc public/talks/bchc/finale --version=v11 --manifest
  ```
- `--version=vN` (default `v6`; `vN` format enforced) must be **new on every capture**.
- `--manifest` writes `worlds/close/finale.json` (currently `{"version":"v10","stills":[1..49],"hero":true}`). That file is the single source `close/layout.ts` reads for `FINALE_VERSION`. A still missing from the list shows as a blank tile.
- It checks that the deck overview's pictures equal `finale-pictures.mjs`'s list from the script. Run it only against a finished deck.
- If the City deck gets a finale, copy the script, `finale-pictures.mjs` and `finale.json` into the City close world, with output to `public/finale/`.

## 6. Design rules (summaries)

**`docs/bchc-brand.md`** (APH brand). It overrides the hues in the colour doc; the roles still hold.
1. White ground; navy `#22254E` for all words and for the title and close ground; slate `#6B7086` for secondary labels; raised `#ECECF2` as the only second surface; rule `#DDE0EA`.
2. Green `#009F4D` means the process and agents at work. Indigo `#44499C` means the catalog and what's shared.
3. Reserved: deep green `#1F573B` only for a passed tick; orange `#F4642C` only for a person approving, plus the word "Approved".
4. Gold, pink and sky are assigned per Part. Gold appears only as fills or strokes of 3 px or more, never as thin lines or words.
5. Strokes at full strength, fills at fractions: idle 0.12, active 0.55, wash 0.08 (asserted in `palette.test.ts`).
6. On navy: white words, green process, catalog `#8A8FD0`, rule at white 0.3.
7. Geist throughout. APH logo top left, footer "Austin Public Health · <group>", number bottom right. A short green rule under titles is the motif.
8. No stars, gradients or glows. Stills appear in colour on a white mount with a thin rule, plus a 3 px indigo edge when the still is the catalog.
9. In code, use only the role aliases (`--dk-catalog`, `--dk-process`, `--dk-lead`, `--dk-review`, `--dk-fix`, `--dk-dept-a/b/c`, `--dk-share-*`), never the hue names.

**`docs/bchc-art-direction.md`** (structure). Its night palette and its "one subject, at most 3 moves, 2 s" motion rule are superseded by the brand doc and by `bchc-flow-revision.md` §1.
1. Stage 1920×1080, drawing field x 96–1824. Title at (96, 152) with a second line at y 240. The story band and `CONTENT_TOP` (kit `story.tsx`) set where drawing starts.
2. Words on screen: the On screen line verbatim, plus labels the script's They see names. No invented names, coined terms or running totals.
3. `Person` for every human, `Agent` for every AI (role shown by shape), `Dept` for departments, `Tile` for modules. They never share shapes.
4. Lines 2.5 px in rule. Arrowheads only where something travels.
5. Carry is explicit. Anything not carried hides at `at: 0` on the next slide's first beat, before the retitle.
6. The camera stays `HOME` except BCHC slides 21 and 44.
7. Worlds join through the engine's fade. Never attempt a visual hand-off across worlds.
8. Positions are literal numbers in the layout file. Dashed things `wipe`. Nothing measures itself.
9. Section 5, "The traps", is required reading: private vocabulary, carry-over clutter, everything moving at once, people/agents/approvals blurring, pictures that don't compile.

**`docs/bchc-colour-direction.md`** (roles, written for night; read its hues through the brand mapping).
1. Orange: only a person approved. Deep green: only a check passed.
2. The catalog colour means the catalog everywhere, and the process colour means the process everywhere. They sit side by side on the slides that teach that the two are separate. Never swap them.
3. The per-Part hues: Part 3 by agent role (lead gold, review sky, fix pink; the tester stays ink and its work shows as ticks); Part 4 by department; Part 5 by what's shared.
4. One or two hues per slide besides orange and green, except slides whose point is the mix.
5. Colour arrives by work (a fill, a drawn edge, a tile landing). Nothing pulses or cycles.
6. Grey carries meaning: vendors, queues, budgets, awaiting, failures. A failure is shapeless (dashed plus a cross), never red.

**`docs/bchc-animation-audit.md`** (what went wrong in v1).
1. Chaining small gestures added no depth. Show who does what and what changes because of it between beats.
2. The card on slide 5 went live before anyone approved it. Motion must never contradict a story line, so it waits at Approval.
3. Static diagrams where the script promised work flowing (19) read as dead. Use `work`, `take` and `pass` on board cells.
4. Motion with no story for a cold viewer (unlabelled ticks, cells filling 0.03 s apart, a camera fidget) gets cut.
5. Respect the two-things rule: the catalog and the process are separate. Never draw the catalog as the product of, or sitting on, the process.
6. Every agreed They see beat must be built. Audit against the script before handing in.

## 7. Things that trip new builders

- **AGENTS.md**: this Next.js (16.3.6, React 19.2) has breaking changes. Read `node_modules/next/dist/docs/` (`01-app/`, `index.md`) before using a Next API. `next dev` rewrites AGENTS.md. If the block reappears in a diff, commit it; deleting it only makes the change come back.
- **Hooks deny commands.** `rm -r` (use `trash`), `git reset --hard`, `checkout .`, `restore`, `clean -f`, `stash drop`, `branch -D`, force push, `kill`, `sudo`, global installs and printing credentials are all denied. A denial is final, so don't route around it. Use `git stash push -u -m "<tag>"` and apply by SHA; the stash stack is shared across worktrees.
- **Versioned asset names.** `next/image` and the browser cache by URL, and the deck's images are `unoptimized` (served straight from `public/`). A changed still under an old name keeps serving the old picture. Always bump `.vN` in the file name and in its reference (`STILLS` in `catalog/layout.ts`, `LOGO` in `frame.tsx`, `finale.json`).
- **Worktrees.** Agent worktrees live under `<main>/.claude/worktrees/<name>` or as siblings in `/Users/crypticpy/orca/workspaces/AEP_LandingPage/`. Each one has its own `.next` and needs its own `node_modules`. Builds share the machine, hence the locks.
- **Footer numbers ≠ script numbers.** When the owner says "slide N", find the slide by content or title first (section 0).
- **The no-words rule covers comments.** The sharing-style test fails a scene or steps file whose comment quotes a script phrase.
- **Module-level script reads.** A typo in a picture id throws at import, so the whole deck fails to load. `picture()` also throws on a step that is missing or extra. Run `npx vitest run src/talks/city` early and often.
- **`compile()` throws** when a move names a prop with no starting value. Every first move on a key needs `off` (the verbs supply it; raw `to()` needs it).
- **CSS is global.** Use a new class prefix for each City world, so copied BCHC rules can't collide.
- **The kit is shared with BCHC.** A kit change affects both decks and has to keep all BCHC tests green. Prefer a world-local part.
- **Geist.** `src/app/layout.tsx` loads Geist as `--font-geist` for every page, and `kit.css` reads it through `--dk-face`.
- **The remote.** The engine still carries the phone remote's code, but this repo has no server route for it, so the deck offers none.
- **Owner process.** Every section goes through a copywriter panel, a motion-design panel and a code review, then a cold-viewer test (every slide must make sense with no narrator). Then ship, and the owner reviews the live result. No stills or small check-ins go to the owner.
- **Plain words.** No coined terms ("stations", "the gate") and no caveats nobody asked for.

## 8. City scaffold

Built 2026-10-18. The script doc's backups are now `## Part 5. Backup slides (about 30 minutes)`, slides 25 to 35 (they were B1 to B11), so the parser reads them as pictures. `docs/tools/city-script-check.mjs` keys the backups on Part 5. The doc's Part 1 ends at slide 3; slide 4 opens Part 2.

**Worlds, in deck order** (`WORLDS` in `src/talks/city/script/types.ts`; picture ids in slide order):

| World | Slides | Picture ids |
|---|---|---|
| `who` | 1–3 | `title`, `career`, `learning` |
| `built` | 4–12 | `wrong-question`, `two-to-twenty`, `safe` (6), `controls` (6a), `weekly` (6b), `ai-builds` (7), `setup` (8), `too-long` (9), `portfolio`, `seen`, `recognition` |
| `method` | 13–17 | `good-ideas`, `listen`, `underneath`, `sort`, `plain-tool` |
| `plan` | 18–21a | `north-star`, `people`, `roadmap`, `knowledge` (20a), `readiness` (20b), `built-to-last`, `residents` (21a) |
| `fit` | 22–24 | `my-work`, `fit`, `lets-talk` |
| `backup` | 25–35 | `foresight`, `grantscope`, `amanda`, `security`, `onesdlc`, `charter`, `costs`, `teaching`, `what-exists`, `the-catalog` (34), `credentials` |

Ids shared with BCHC show which picture to copy: `safe`, `ai-builds`, `too-long` and `the-catalog`. Slide 8 is `setup`, one click, and draws BCHC's `setup`, `split` and `reviewed` together. Slide 34 also draws on BCHC's `three-days`. Every picture has one step, `play`. The doc marks no slide "(two clicks)".

**Words.** Each step's `show` holds the phrases its They see quotes, each phrase once, in the order the doc first quotes it. `script.test.ts` checks this against the doc. A layout reads them by position: `const [A, B] = shown("<id>", "play")`. `PARTS` is `{ name, minutes }[]`, and `worldTitle` reads `.name`. Both Part 3 worlds take the title "An AI strategy for the City".

**Adding a world.** Build it in `src/talks/city/worlds/<world>/`, then append its entry to `WORLD_ENTRIES` in `src/talks/city/worlds/index.ts`. Keep the order `whoEntry, builtEntry, methodEntry, planEntry, fitEntry, backupEntry`, and never leave a gap. `deck.test.ts` requires the listed worlds to match the start of `WORLDS`. It checks addresses, copy and compile only for the worlds that are present. `flow.test.ts` covers every listed world.

**`COMPLETE`.** `deck.test.ts` sets `const COMPLETE = false`. While it's false, two checks are skipped: "every picture has a world" and "the navy steps are exactly slide 1 and slide 24". Integration sets it to `true` after `backupEntry` is in. Put `ground: "navy"` on `title` and `lets-talk` only.

**Routes.** The deck is at `/` and its notes at `/notes/`, both with the deck id `"city"`. There is no remote route.

**Frame.** `src/talks/city/frame.tsx` uses the `city-frame__*` classes and the Austin Public Health logos by URL (`withBase("/brand/aph-logo.v1.png")`, `aph-logo-white.v1.png`). The footer reads "Austin Public Health · AI Strategy". The layout numbers match BCHC's.

## ATS reading and animation phases

ATS applies its phase policy in `src/talks/ats/worlds/sequence.ts`, through `picture()` after each world has chained its local moves. Local visual timing and final states are retained, while the title and supporting text are separated from the diagram. `TEXT_FIRST` lists slides that explain the idea before demonstrating it; other content slides finish the diagram before showing the supporting text. The three reviewed pilots declare the same phases directly.

Both supporting sentences arrive together in 0.35 seconds. Text-first slides wait exactly 0.6 seconds after the sentences finish appearing, then start the visual. Do not calculate this pause from word count. The earlier multi-second reading holds were removed after playback feedback. The community slide preserves its two presenter-controlled clicks: sentence A and stationary quotes first; themes followed by sentence B second. All builds remain within 24 seconds, and every forward press moves to the next slide and starts its animation, even if the previous build is still running.

The original local placement of `story()` calls is not the final playback schedule: this ATS phase layer determines it. Test compiled schedules with rendered element counts, as `sequence.test.ts` does. Keep final-state, geometry, and causal-order checks when changing a visual; do not restore old tests that require a sentence to interrupt it.
