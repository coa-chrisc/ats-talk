# Storyboard room: shared brief

You are one of three senior creatives invited to a storyboard session for a 30-minute executive talk. The other two are working in parallel; in a second round you will read their memos and respond. Write for the people who will rebuild the deck: concrete, visual, buildable.

## The talk

"Agentic AI at the City: what we learned, and what we would do first." Two City of Austin technologists (Stefan and Chris) went to a Carnegie Mellon course on agentic AI. They present to the City's DCIOs (departmental CIOs) and IT leadership. 34 slides, 35 click-steps, about 30 minutes of narration.

Arc (from the script): what we brought back (course, four lessons) → where enterprise is (spending, chatbots to agents, review, fleets, failures) → the four lessons, one per slide → where the City stands (on paper; then its own work, recognition, staff voices, infrastructure, how existing controls fit, people + infrastructure + a working fleet) → what we would do first (consortium, program team, listening tour, assess ideas, deliver while preparing, skills, measure) → ready, the ask, the reveal (four authority levels, who decides, serve residents, six leadership decisions, the four lessons applied, discussion).

The DCIOs should leave with: four lessons they can repeat; an accurate picture of where the City is on paper, once its own work is counted, and where it could be; a plan built on existing staff work; their own part (leadership draws the lines, each DCIO decides autonomy, the CISO owns controls); confidence in the people already doing this work.

## Where the deck is now

Most slides are line-art drawings on white (navy ink, APH green accent, Geist type, short green rule under titles) that animate in one click: title, then a two-sentence story band, then the drawing (or drawing first, then text), ending on a still frame.

Two earlier passes (2026-10-20) fixed sequencing and removed visuals that overstated evidence (a race against enterprise with a catch-up date, a runner on a track, developer desks rising to imply proven productivity, tally marks). Six slides were then rebuilt and drifted into a different design language: generic 14-glyph icons + bold label + caption in rows, revealed by fade-ins with no action. Those are display slides **10, 13, 21, 28, 29, 33**. A first audit (by the orchestrator) proposed restoring a recurring route across 13→21→33 and letting a recurring cast act out 10, 28, 29. Treat that audit as one input to challenge, not a decision.

## Files (read them; all paths absolute)

- Script, the single source of every on-screen word and speaker note: `/Users/crypticpy/Documents/ChatGPT/ats-talk/docs/ats-talk-script.md`
- Finished frame of every step, 1366×768, named `NN-world_picture.step.png` where NN is the display number: `/Users/crypticpy/Documents/ChatGPT/ats-talk/.claude/worktrees/slide-animations-drawings-audit-77c176/docs/storyboard-frames/` — look at all 35.
- First audit: `/Users/crypticpy/Documents/ChatGPT/ats-talk/.claude/worktrees/slide-animations-drawings-audit-77c176/docs/animation-drawing-level-up-audit-2026-10-21.md`
- Earlier sequencing audit (per-slide animation notes for every slide): `/Users/crypticpy/Documents/ChatGPT/ats-talk/docs/animation-sequencing-audit-2026-10-20.md`
- Build rules, brand, review questions: `/Users/crypticpy/Documents/ChatGPT/ats-talk/docs/build-handbook.md`, `docs/aph-brand-reference.md`, `docs/slide-review-questions.md` (same root)
- Motion per slide, if you want exact choreography: `/Users/crypticpy/Documents/ChatGPT/ats-talk/src/talks/ats/worlds/*/steps-*.ts`. Display-number → picture id mapping is the frame filename.

## Constraints that are not up for debate

- Honesty: never imply a measured result, a speed-up, a ranking of people, or a guaranteed date that the script does not claim. Keep forecasts, evidence, illustrations and proposals visibly distinct. The fixes of 2026-10-20 must survive in spirit.
- The script is the source. On-screen labels must be words from that slide's script entry; if your idea needs new words, say so explicitly as a proposed script change.
- One click per slide (slide 17/18 is the one two-click slide). Sequence: title settles → reading block and one visual sequence (either order) → a still final frame. No decorative loops.
- Medium: animated SVG line drawings in a browser (GSAP): things can fade, draw on, move along paths, scale. No video, photography, or 3D. Keep it buildable.
- Audience is municipal IT leadership: sober, credible, no hype, no stock-futurism.

## What to return (your final message is the deliverable; no preamble)

1. **The story in one paragraph** — the spine and the emotional arc as you read it, and the single idea the deck should leave behind.
2. **The visual system** — the underlying thematic elements you'd fish out and make recurring: cast (who/what recurs and how it's drawn), geography/metaphor (if any), colour semantics, a small motion vocabulary (which verbs mean what), composition rules, and what to retire. Ground it in what already exists in the frames where you can.
3. **Verbal storyboard, all 35 steps.** For each: `NN — title` then 2–4 lines: the one point; what the audience sees happen (the beat); the hand-off from the previous slide. Go deeper (6–10 lines, beat by beat, with the final frame) on 10, 13, 21, 28, 29, 33 and their immediate neighbours (9, 11, 12, 14, 20, 22, 27, 30, 32, 34).
4. **Risks and what you'd fight for** — where you expect the other disciplines to push back, and the two or three calls you'd defend hardest.

Keep it under about 4,500 words. Be specific enough that a designer could sketch from it. Say "I don't know" rather than inventing facts about the City.
