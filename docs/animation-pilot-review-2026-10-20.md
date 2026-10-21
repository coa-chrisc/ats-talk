# Animation pilot review

Historical pilot record. The later [deck-wide pass](slide-clarity-and-pacing-pass-2026-10-20.md) applies the approved pacing beyond these three slides.

Implemented only display slides 29, 12, and 32 from the sequencing audit. Other slides retain their animation schedules. The script's animation descriptions and generated modules are synchronized; the approved supporting sentences and spoken paragraphs are unchanged. The diagram labels on slides 29 and 32 were subsequently revised for clarity.

| Display slide | Preview | Sequence | Build duration |
|---|---|---|---|
| 29: Measure outcomes | [Open](http://localhost:4817/#/first/outcomes.play) | Title → strategic context → activity tally → baseline/target/responsibility → both supporting sentences. Nothing moves after the text arrives. | 8.55 s |
| 12: Start with manageable work | [Open](http://localhost:4817/#/ideas/earn.play) | Title → both sentences → 9.2 s reading pause → neutral criteria → 3 s pause → uninterrupted project climb and two checks. | 19.83 s |
| 32: Serve residents | [Open](http://localhost:4817/#/ready/residents.play) | Title → AI drafts/translates → staff review and decisions → residents receive clear information → service question → both supporting sentences. | About 9 s |

Durations are the compiled animation durations, not the amount of time a presenter should spend on the slide. Each finished picture remains until the presenter advances.

To review the full animation, reload its direct link and start the deck. A numeric jump or a backward step shows the finished picture. To replay within the deck, step backward once and then forward once. A second forward press during a build finishes it, including during slide 12's reading pause.

## What to assess

- On 29, does the change from counting activity to measuring outcomes read as one complete explanation before the sentences arrive?
- On 12, is the reading pause comfortable in the room, or too long once the speaker is talking? The pause is deliberate and has no decorative animation during it.
- On 32, does the left-to-right explanation clearly distinguish AI assistance, staff responsibility, and the benefit to residents?

## Implementation and checks

The shared helper is scoped to these three pilot IDs. Their title and sentence blocks arrive without line staggering. Slide 12's six criteria have unfilled neutral boxes rather than pass ticks; the project's actual two stage checks retain their ticks.

The legacy timing limits still apply to other slides. The pilot has a bounded 24-second allowance; its reading interval is explicitly tested. The browser check's interruption wait now accommodates that allowance.

All 937 current unit tests pass (the fence-specific tests were replaced with stage order and caption-layout checks). Typecheck and the production build pass. Lint reports zero errors and the same six pre-existing unused-variable warnings. The script checker reports no problems. A compiled-schedule comparison confirms every non-pilot step is unchanged.

Normal-speed browser playback and visual inspection pass for all three pilots at 1366 × 768. Backward navigation and direct links produce the same finished picture as playback. Advancing during the reading pause finishes slide 12 cleanly, with no delayed movement afterward. No browser errors were reported.

## Visual revision after pilot feedback

Slide 29 now says “Someone responsible for tracking results,” with enough space below the measurement line. Slide 32 replaces the counter, fence, and flying language card with three stationary stages. Each stage arrives with its caption: AI helps draft and translate; City staff review responses and make decisions; residents receive clear information in their language. The staff stage and human-decision mark appear together before the resident stage. The closing question is “Ask residents: Is the service better?” The script and generated modules match this explanation.

The revised slides passed browser playback, backward navigation, and direct-link checks. Final frames were visually inspected at 1366 × 768; captions fit and remain attached to the relevant stage.
