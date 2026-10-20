/** Slide 4a's picture: the two bars on their floor, named and captioned; the person at the desk with the towering stack of pages, named; the funnel, named at its mouth, with the person and the mark at its outlet and their words; and apart from it at the right the figure with its caption. */
"use client";

import { HumanMark, Part, Person } from "@/components/deck/kit";
import { FIGURE, REVIEW } from "./layout-review";
import { Column, Desk, Figure, Funnel, Layer, Note, StoryOf, Stroke, Words } from "./parts";

const R = REVIEW;
const N = R.funnel;

export function ReviewMarks() {
  return (
    <Part id={R.marks}>
      {R.bars.map((bar) => [
        <Column key={bar.key} id={bar.key} at={bar.at} />,
        <Words key={bar.name.key} id={bar.name.key} at={bar.name.at} text={bar.name.text} size="text" strong />,
        <Words key={bar.caption.key} id={bar.caption.key} at={bar.caption.at} text={bar.caption.text} anchor={bar.caption.anchor} strong tone="catalog" />,
      ])}
      <Stroke id={R.floor.key} from={{ x: R.floor.x0, y: R.floor.y }} to={{ x: R.floor.x1, y: R.floor.y }} className="en-floor" />
      <Person id={R.seated.key} at={R.seated.at} />
      <Desk id={R.desk.key} x0={R.desk.x0} x1={R.desk.x1} y={R.desk.y} legs={R.desk.legs} inset={R.desk.inset} />
      {R.stack.pages.map((page) => (
        <path key={page.key} className="en-page" data-build={page.key} d={`M${page.x0} ${page.y}H${page.x1}`} />
      ))}
      <Funnel id={N.key} x0={N.x0} x1={N.x1} top={N.top} outlet={N.outlet} outletY={N.outletY} spout={N.spout} />
      <Words id={N.name.key} at={N.name.at} text={N.name.text} strong />
      <Person id={R.standing.key} at={R.standing.at} />
      <HumanMark id={R.mark.key} at={R.mark.at} />
      <Figure id={R.figure.key} at={R.figure.at} runs={R.figure.runs} size={FIGURE.size} small={FIGURE.small} />
    </Part>
  );
}

export function ReviewHtml() {
  return (
    <Layer id={R.html}>
      <StoryOf picture="review" />
      <Note id={R.stack.name.key} at={R.stack.name.at} align="center" strong>
        {R.stack.name.text}
      </Note>
      <Note id={R.people.key} at={R.people.at} align="center" strong>
        {R.people.text}
      </Note>
      <Note id={R.figure.caption.key} at={R.figure.caption.at}>
        {R.figure.caption.text}
      </Note>
    </Layer>
  );
}
