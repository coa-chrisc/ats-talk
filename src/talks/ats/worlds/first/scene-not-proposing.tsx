/**
 * Slide 16's picture, in two rows: on top, three dashed grey outlines, each
 * crossed out and named, the name over its cross (the outlines are HTML, as
 * a dashed edge cannot stroke-draw); below, a green round table with its
 * chairs and a green calendar page, each named under it, and an indigo tag
 * with its caption.
 */
"use client";

import { Part } from "@/components/deck/kit";
import { CHAIR_9, NOT_PROPOSING, TAG_9 } from "./layout-not-proposing";
import { Calendar, Chair, IndigoTag, Outline, Table } from "./parts-room";
import { Layer, StoryOf, Words } from "./parts";

const N = NOT_PROPOSING;
const T = N.table;
const NAME_DOWN = N.outlines[0].name.at.y - N.outlines[0].at.y;

export function NotProposingHtml() {
  return (
    <Layer id={N.html}>
      {N.outlines.map((outline) => (
        <Outline key={outline.key} id={outline.key} at={outline.at} text={outline.text} nameDown={NAME_DOWN} strokes={outline.cross.strokes} />
      ))}
      <StoryOf picture="not-proposing" />
    </Layer>
  );
}

export function NotProposingMarks() {
  return (
    <Part id={N.marks}>
      {T.chairs.map((chair) => (
        <Chair key={chair.key} id={chair.key} at={chair.at} deg={chair.deg} size={CHAIR_9} tone="green" />
      ))}
      <Table id={T.key} c={T.c} r={T.r} tone="green" />
      <Words id={T.name.key} at={T.name.at} text={T.name.text} size="text" strong />
      <Calendar id={N.calendar.key} at={N.calendar.at} header={N.calendar.header} rings={N.calendar.rings} days={N.calendar.days} />
      <Words id={N.calendar.name.key} at={N.calendar.name.at} text={N.calendar.name.text} size="text" strong />
      <IndigoTag id={N.tag.key} at={N.tag.at} point={TAG_9.point} hole={TAG_9.hole} text={N.tag.text} words={N.tag.words} />
      <Words id={N.tag.caption.key} at={N.tag.caption.at} text={N.tag.caption.text} />
    </Part>
  );
}
