# Animations and drawings: level-up audit

2026-10-21. Display slides 10, 13, 21, 28, 29 and 33, with the rest of the deck as the comparison.

## What was audited

This audit covers the deck as it runs now: the main checkout's uncommitted working tree, served at `localhost:4816`. That tree includes the 2026-10-20 [visual communication pass](../../../../docs/visual-communication-changes-2026-10-20.md), which rebuilt exactly these six slides. This worktree's commit (`c72bca2`) predates that pass, so its versions of these slides are older.

Method: I captured each slide's finished frame at 1366×768, read its step file (`steps-*.ts`) and the shared drawing kit (`worlds/story-drawing.tsx`), and checked both against the script's *On screen*, *They see* and *You say* text. For comparison I captured four slides that work well: 9 (ladder), 11 (train staff), 23 (consortium) and 32 (residents). Sources for the rest of the deck are the 2026-10-20 sequencing audit and its pacing pass.

## Diagnosis

**1. The six slides fixed their honesty problems, but the picture stopped telling the story.** Each pass removed something that overstated: the race against enterprise, the runner, desks lifting, the tally marks. What replaced them is the same layout six times: a small generic icon, a bold label and a caption, laid out in rows. All six now draw from one 14-glyph `Sketch` set (person, team, document, server, key, budget, compass and so on). The strongest slides in the deck show something happening. These show a list.

**2. The animation is a reveal list, not an action.** Apart from the packet on slide 10, every move in these six steps is `show(x, {at: t})` or a short `draw`. The items fade in one at a time, 0.5–0.6 s apart. Nothing travels, merges, stops, gets approved or gets built. In the slides that land (7, 9, 23, 32), the motion carries the argument: people gather, a figure stops on the step it needs, a response waits for approval before it crosses.

**3. The deck has a cast and a geography, and these slides drop both.** Earlier slides set up recurring elements: green staff figures (11, 23, 32), the hexagonal agent (5, 7), the request card (10, 32), the permission gate (7, 10) and the track (the old 13/21/33). The audience learns them. These six slides either don't use them, or reduce them to icons doing nothing.

**4. The script's own spine asks for one continuous picture that the deck no longer draws.** Walk-away #2 reads: "where it looks like it is on paper, where it is once its own work is counted… and where it could be." That is three positions on one route, shown on 13, 21 and 33. Right now those are three unrelated layouts. On slide 21 the leftover of the old track, a bracket plus a double rule, still sits there and means nothing.

**Visible defects to fix whatever else changes:**
- Slide 13: the dashed placeholder boxes run into the "Citywide AI strategy", "Dedicated program team" and "AI budget line" labels. The policy "scroll" reads as a green rectangle.
- Slide 21: the bracket and double rule are left over from the track and mean nothing on their own.
- Slide 28: the `tools` glyph for "Program team" is a large X, which reads as "wrong" or "no". The practice cycle is four arcs with gaps and no arrowheads, so nothing goes around it.
- Slide 33: the arrows between the six requests suggest a sequence and dependencies. The script presents six separate decisions, each needing its own answer.
- Slide 10: "Blocked" floats in empty space between the gate and the record. The approval and log rows look like a separate list, unconnected to the gate.

## Two through-lines to restore

### A. The route: slides 13 → 21 → 33

Use one horizontal route with the same geometry, drawn on all three slides. It is not a race: no enterprise pack, no dates, no catch-up claim, which keeps the honesty fixes from the 2026-10-20 pass.

| Slide | What the route shows |
|---|---|
| 13 "on paper" | A blueprint. Only the first segment is inked solid: the acceptable use policy. Three dashed segments lie ahead, labeled with what's still to establish: strategy, team, budget. |
| 21 "its own work counted" | The same route. Three streams (staff figure, sandbox server, hex agent) run in from the side and merge onto it, inked solid. Ahead are three closed checkpoints: support, production readiness, measurement. The portfolio count stands quietly by the road as context, not as a checkpoint passed. |
| 33 "where it could be" | The same route. Each of the six decisions arrives and inks the segment or opens the checkpoint it unlocks. The final frame shows the whole route, with the unbuilt stretch still dashed: a plan waiting on decisions, not a result. |

The payoff: the gaps named on slide 13 are visibly closed by decisions on slide 33. "Authorize the consortium and team" answers the dedicated program team. The listening tour feeds the strategy's priorities. "Allocate funding" answers the AI budget line. That is the strongest link this part of the talk can make, and right now the audience has to work it out for themselves.

### B. The cast does the work: slides 10, 28 and 29

Let the recurring characters act out each lesson rather than captioning an icon: the green staff figure, the hex agent, the request card and the gate.

## Slide by slide

### 10 — Lesson two: design the system to enforce the agent's limits

**Now:** The agent icon sends a document along a wire to a double green bar, and the document stops. The record and "Blocked" sit off to the right. Approval and log are two separate icon rows underneath. The diagram uses about a third of the stage's height.

**Story gap:** The script's point is that permissions, approval and logging are one system working together. On screen, the first is a small diagram and the other two read as footnotes.

**Level-up: one machine run twice, with the log written live.**
1. The hex agent sends the "Delete a record" card toward the permission gate. The card stops at the gate, and "Blocked" is stamped on the card itself. Across the gate the record stays where it is: "The record stays intact".
2. A second card ("A different action needs approval") arrives at the same gate and waits. A staff figure steps up, approves it ("Wait for a person to authorize it"), the gate opens, and the card passes through.
3. Under the gate, a log ledger gains one line per event, written as each event happens: blocked, then approved ("Record requests, approvals, and outcomes").

Final frame: the gate in the centre, two outcomes, two log lines. It echoes the permission checker on slide 7 and sets up approve-before-crossing on slide 32. Uses existing `to`, `draw` and `show` verbs. The labels already exist in the script; the log-line text must come from script words.

### 13 — The City has not yet established a formal AI program

**Now:** A green rectangle "scroll" stands on the left. On the right, three icons sit in a dashed box with dashed sub-boxes over a double rule, and the labels collide with the dashes.

**Story gap:** "On paper" should feel like a starting line: one solid thing built, three things only sketched. The current picture reads as a form with empty fields.

**Level-up:** The route blueprint (through-line A). The policy inks in as the first solid segment, then the three dashed segments trace out ahead, left to right, each with its label. Keep the motion restrained: one ink-in, then three dashed traces. This also clears the label collision.

### 21 — The City has people, infrastructure, and a working agent fleet

**Now:** Capabilities are a bulleted icon list on the left. A bracket and a double rule lead to three icons on a line. The portfolio count sits alone at the bottom.

**Story gap:** The title is a turn in the story ("we have more than it looks"), but the slide is drawn as a spec sheet. The leftover track shape suggests a picture that isn't there.

**Level-up:** The same route as slide 13 (through-line A). Staff, the sandbox and the fleet arrive as three converging streams. This keeps the *They see* line "Their paths converge into one route" literally true; today that line describes a bracket. Then three checkpoint gates appear ahead, closed. The portfolio count appears last, as a sign by the road. Nothing crosses a checkpoint, which preserves "not ready to scale".

### 28 — Build staff skills for the work they need to do

**Now:** Three icon-and-caption rows sit on the left (with the X glyph). On the right is a broken four-arc loop around a static document.

**Story gap:** "Different responsibilities, not a ranking" is asserted in words, and the drawing doesn't show it. The practice cycle has no direction and nothing travels around it, so the loop reads as decoration.

**Level-up:**
- Draw the three roles as the same green figures on one shared baseline, at equal size, each holding the thing its role works with: an approved tool on a screen (everyone), a checklist comparing two options (leads; echoes slide 11's "Evaluate products"), and a seat at the consortium table (program team; echoes slide 23). Equal size and a shared baseline say "not a ranking" without a word.
- Developer practice: a figure at a desk, and a small task card travelling once around a loop with arrowheads. It picks up a check at "Build with AI and review the result" and a stopwatch tick at "Measure time and quality", returns to "Improve the method before expanding", and stops. One lap, at a constant speed, with no implied gain.

### 29 — Measure how each project improves City services

**Now:** A document icon and its project label sit above a bare axis with two ticks (baseline, target). Three icon rows run underneath.

**Story gap:** The measure, "Time from request to a staff-approved response", is a journey, but it is drawn as an empty ruler. Nothing on screen gets measured.

**Level-up: show the thing being measured.**
1. A request card travels from a resident, through an AI draft, to a staff figure who approves it. This is the same cast and flow as slide 32, so slide 29 sets that slide up.
2. A stopwatch bracket spans the trip from request to approval: "Service measure".
3. A baseline pin drops onto that span ("Measure current performance before the pilot"), with no number. A dashed target pin appears ahead ("Agree after measuring the baseline").
4. A magnifier passes over the draft ("Quality check"). The owner figure takes the stopwatch ("Responsible role"). The route ends at a fork with the compass ("Expansion decision").

This follows the script's order: measure, baseline, target, responsibility, quality, expand. It stays a worksheet, with no values and no scale.

### 33 — Leadership can authorize the next phase of work

**Now:** Six generic icons in a row, chained by arrows, over an underline.

**Story gap:** This is the climax of the request, yet it is visually the flattest slide in the section. The arrows imply an order the script doesn't claim. The icons don't connect to the slides where each idea was introduced.

**Level-up:**
- Draw each decision's illustration as a miniature of the slide that introduced it: the consortium table (23), speech bubbles (25), the four-level stack (30), the sandbox fence (19), a key on a data record, and the budget from slide 13.
- Place them on the route (through-line A), so each one visibly builds the segment or opens the checkpoint it unlocks. Drop the chaining arrows.
- Finish on the full route, with the unbuilt stretch still dashed.

Recognition makes this slide work: the audience should see six things they already understand, not six new icons.

## Motion rules for the rebuild

These keep the 2026-10-20 sequencing contract (title, then one reading block, then one visual sequence, then a still final frame) and change what the visual sequence does:

- One verb per slide carries the argument: *stop and approve* (10), *ink the route* (13), *merge* (21), *circulate once* (28), *travel and time* (29), *build and open* (33).
- A label arrives with its object and stays still while the object acts.
- Whatever moves is a recurring character. Decorative strokes stay quiet and quick.
- No sweeps, speed-ups or bounce on anything that could read as a measured result.

## Recommended order

1. **The route trio (13, 21, 33)** as one shared route module with three states. It is the biggest storytelling gain and has to be designed together.
2. **Slide 10.** It is self-contained and reuses the gate from slide 7.
3. **Slide 29,** then **slide 28.** Both reuse the cast, and slide 29 sets up slide 32.

Per the project rules, change the script first. New labels (log lines, any route captions) must be words from that slide's *On screen*, *They see* or *You say*. Then update each *They see* line, then the worlds. Run `docs/slide-review-questions.md` on each slide before it ships.

## Not checked

- I judged finished frames and step schedules, not full normal-speed playback recordings of each build.
- I sampled four comparison slides. The rest of the deck is covered by the 2026-10-20 audits, not re-captured here.
- I did not change any code or script in either checkout.
