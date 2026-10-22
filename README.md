# Agentic AI at the City: what we learned, and what we would do first

The slides for a talk of about 25 minutes by Stefan Wray and Chris Collins of Austin Technology Services, given to the City of Austin's Deputy CIOs and ATS leadership. It brings back what was useful from Carnegie Mellon's Leading Enterprise Deployment of AI Agents course, states plainly where the City stands, and proposes the first steps: find the City's AI practitioners, listen, sort, run two lanes, level up existing staff, and have a playbook on the shelf for the day agents arrive inside tools the City already owns. The CMU briefing deck Stefan built is the backup section for the security discussion.

The deck runs in a web browser, in the same engine as the city talk. Each click plays one slide's animation, and every slide carries its own words on screen, so it can be read without a speaker. Austin Technology Services branding.

## Status

- `docs/ats-talk-script.md` is written and passes the copy checker: 20 slides in four parts, with learning objectives, story moves, timing and the facts to confirm at the top.
- The deck engine (`src/components/deck/`), the app shell (`src/app/`) and the tooling are copied from the city talk.
- `src/talks/city/` is the city talk's own worlds and script, kept only as the reference implementation while the ATS worlds are built. It is what `src/app/page.tsx` renders today. Replace it with `src/talks/ats/` built from the ATS script, then delete it.
- `public/brand/` is empty. It needs the City of Austin wordmark (or an ATS mark) and a `docs/ats-brand.md` with the colors and type; until then the script's Branding section says what to use.

## Run it on your computer

You need Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Then open http://localhost:3000 and press Start.

## Present it

- Click, Space, the right arrow or a presentation clicker: next slide.
- Left arrow or Backspace: back one slide.
- Home and End: the first slide and the last one.
- Type a slide number, then Enter: jump to that slide.
- O: an overview of every slide.
- N: the speaker notes in a second window, also at `/notes/`. Printing it gives the whole script.
- B or full stop: blank the screen.

## What is where

- `docs/ats-talk-script.md` is the single source for the talk. Every word on screen and every speaker note is read from it, and the tests fail if the slides and the script disagree. `node docs/tools/script-check.mjs docs/ats-talk-script.md` checks the script's own copy rules.
- `docs/build-handbook.md` is how a talk is wired in this engine: the script parser rules, the tests a world must satisfy, steps and motion, the verify pipeline and the design rules. Read it before building or changing a world.
- `docs/aph-brand-reference.md` is the Austin Public Health brand file from the city talk, kept as the model for `docs/ats-brand.md`.
- `src/components/deck/` is the engine that plays the worlds (keys, addresses, the notes window) and the kit of parts the slides are drawn with. `check/deck-check.mjs` checks every slide in a real browser.
- `src/lib/base-path.ts` puts `/ats-talk` in front of a picture's address on GitHub Pages.

## How it is published

Pushing to `main` runs `.github/workflows/pages.yml`, which builds a static copy of the deck with the path `/ats-talk` in front of every address and publishes it to GitHub Pages. `.github/workflows/ci.yml` runs the tests, the linter and the type check on every push and pull request.

## Checks

```sh
npm run lint
npm run typecheck
npx vitest run
node docs/tools/script-check.mjs docs/ats-talk-script.md
```
