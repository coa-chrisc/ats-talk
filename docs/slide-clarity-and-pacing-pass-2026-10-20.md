# Slide clarity and pacing pass

Update: playback feedback identified the word-count reading holds as excessive. All text-first slides now transition to motion 0.6 seconds after the supporting text finishes appearing, including slide 12. Its additional three-second criteria hold is also reduced to 0.6 seconds. The schedule below records the earlier pass and is superseded by this correction.

The approved pilots are now the basis for the whole deck. All 35 presentation steps were reviewed for awkward diagram language, misleading visual implications, and interruptions between reading and motion. The 34 slide pictures and the community slide's two separate clicks are preserved.

## Changes

- All slides: the title settles before the next phase. Supporting sentences appear together. Text-first slides allow reading before the diagram starts; visual-first slides finish the diagram before revealing the text. The community slide retains one sentence per click.
- Slides 2–3: course tiles arrive with their names, workbenches appear together, and complete lesson panels replace separate passes for borders, numbers, and names. The route has no second lighting sweep.
- Slides 6–7: forecast context precedes the review funnel; human review is the final action. The permission checker is established before builders start working.
- Slides 10 and 14: dial needles appear at their selected values instead of sweeping arbitrarily. “A person must approve” replaces “A named person signs off.”
- Slides 17–18: department names and attributed quotations remain stationary. The second click fades the quote region out in place and reveals the themes; quoted words are unchanged.
- Slides 19–20: the calendar fills as a group; each course control and its sandbox implementation arrive as a matched row.
- Slide 25: speech bubbles use actual questions, including “Where does work slow down?” and “What worries you?” The notebook says “What people said.”
- Slide 26: neutral criteria precede the labeled chart. Illustrative ideas make short placement moves; no checkmarks imply an assessment that never happened.
- Slide 27: delivery pauses while the foundations are explained, then a second batch arrives at the same pace. The animation no longer implies a measured speed multiplier. The labels now say “Useful projects now” and “Existing infrastructure.”
- Slide 28: the research finding appears before the proposed training and measurement. Developer desks stay in place; their physical elevation no longer implies a proven improvement.
- Slide 30: register rows appear in place with the agent's level and responsible person. Agents no longer drop through unrelated authority bands. “Record who is responsible” replaces “An agent register with named owners.”
- Slide 33: five complete decision cards replace the race projection and crossing connectors. They read left to right and specify actions for the next year, without implying a guaranteed catch-up date.
- Slide 34: the familiar lesson panels arrive together, then each lesson connects to its application. Supporting text follows the completed explanation.
- Slide 35: the two discussion questions and briefing footer arrive together.

The speaker's substantive argument is preserved. Diagram labels, `They see` descriptions, and generated app modules are synchronized. Evidence, forecasts, and proposals remain distinguished.

## Review links

- [Stationary staff voices](http://localhost:4817/#/stands/community.roll)
- [Assessment criteria](http://localhost:4817/#/first/sort.play)
- [Delivery and foundations](http://localhost:4817/#/first/lanes.play)
- [Staff training](http://localhost:4817/#/first/level-up.play)
- [Five decisions](http://localhost:4817/#/ready/could-be.play)

Refresh the preview after the rebuild. To replay a sequence, step back once and forward once. Every forward press moves to the next slide, even during an animation. The next slide plays automatically.

## Current schedule

These are compiled build durations, not speaking-time recommendations. The finished slide remains until the presenter advances. Reading pauses are provisional rehearsal settings based on word count; a live rehearsal remains the best way to tune them.

| Display | Picture | Pattern | Build |
|---|---|---|---|
| 1 | title | Visual first | 2.85 s |
| 2 | course | Text first | 13.85 s |
| 3 | lessons | Text first | 15.41 s |
| 4 | spending | Visual first | 9.60 s |
| 5 | agents | Visual first | 9.70 s |
| 6 | review | Visual first | 11.66 s |
| 7 | fleet-defined | Visual first | 12.70 s |
| 8 | stumbled | Text first | 19.30 s |
| 9 | ladder | Text first | 19.34 s |
| 10 | enforce | Text first | 17.04 s |
| 11 | people | Visual first | 9.65 s |
| 12 | earn | Text first | 19.83 s |
| 13 | track | Text first | 17.06 s |
| 14 | control | Visual first | 12.19 s |
| 15 | exists | Text first | 21.23 s |
| 16 | noticed | Text first | 17.46 s |
| 17 | community / roll | Text first | 6.55 s |
| 18 | community / themes | Visual first | 2.60 s |
| 19 | infrastructure | Text first | 15.40 s |
| 20 | fits | Text first | 14.65 s |
| 21 | fleet | Visual first | 11.19 s |
| 22 | not-proposing | Text first | 16.45 s |
| 23 | consortium | Text first | 18.68 s |
| 24 | program-team | Text first | 18.58 s |
| 25 | listen | Text first | 20.60 s |
| 26 | sort | Text first | 16.29 s |
| 27 | lanes | Text first | 16.03 s |
| 28 | level-up | Text first | 17.35 s |
| 29 | outcomes | Visual first | 8.55 s |
| 30 | levels | Text first | 15.96 s |
| 31 | who-decides | Text first | 20.15 s |
| 32 | residents | Visual first | 9.15 s |
| 33 | could-be | Text first | 12.40 s |
| 34 | applied | Visual first | 8.24 s |
| 35 | lets-talk | Visual first | 5.25 s |

The [schedule CSV](animation-sequencing-current-2026-10-20.csv) includes phase boundaries. The longest build is 21.23 seconds. The 24-second ceiling includes room for reading without forcing the animation to compete with the text.

## Validation

- All 35 steps completed normal-speed browser playback with no browser errors or off-screen SVG text. Final layouts were visually inspected.
- Jumping to every step and stepping backward reproduce the normal-playback final states.
- All 935 tests across 70 files pass, including final states, layout bounds, stage order, and the phase policy on every step.
- Production build passes. Lint reports no errors and six existing unused-variable warnings.
- Script and generated app content are synchronized.

- Direct opening of 13 representative steps passes, including the redesigned slides.
- Finishing slide 26 during its reading pause produces no delayed movement during a further 24.5-second observation.
- Slides 27 and 28 replay to the same final states; intermediate motion frames were inspected.

Reading pauses still need a live speaker rehearsal.
