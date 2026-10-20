/** Slide 9's picture: the balance, its post, its beam and its two pans, the indigo box on one and three green people on the other, each named; the large indigo figure and its caption; and the plaque with its name and caption. */
"use client";

import { Part } from "@/components/deck/kit";
import { PEOPLE } from "./layout-people";
import { Beam, Figure, Pan, Post, TaggedBox } from "./parts-draw";
import { Layer, Note, StoryOf, Words } from "./parts";

const T = PEOPLE;
const [left, right] = T.pans;
const P = T.plaque.at;

export function PeopleMarks() {
  return (
    <Part id={T.marks}>
      <Post id={T.post.key} top={T.post.top} foot={T.post.foot} />
      <Beam id={T.beam.key} pivot={T.beam.pivot} x0={T.beam.x0} x1={T.beam.x1} />
      <Pan
        id={left.key}
        end={left.end}
        plate={{ id: left.plateKey, at: left.plate }}
        holds={
          <>
            <TaggedBox id={T.technology.key} at={T.technology.at} />
            <Words id={T.technology.name.key} at={T.technology.name.at} text={T.technology.name.text} size="text" strong />
          </>
        }
      />
      <Pan
        id={right.key}
        end={right.end}
        plate={{ id: right.plateKey, at: right.plate }}
        holds={
          <>
            <g data-build={T.talent.key}>
              {T.talent.people.map((at) => (
                <Figure key={at.x} at={at} />
              ))}
            </g>
            <Words id={T.talent.name.key} at={T.talent.name.at} text={T.talent.name.text} size="text" strong />
          </>
        }
      />
      <g data-build={T.plaque.key}>
        <rect className="id-plaque__face" x={P.x} y={P.y} width={P.w} height={P.h} rx={4} />
        <rect className="id-plaque__inset" x={P.x + 10} y={P.y + 10} width={P.w - 20} height={P.h - 20} rx={2} />
      </g>
    </Part>
  );
}

/** The figure, the captions and the plaque's words are HTML, so each sets at its own size and wraps inside its box. */
export function PeopleHtml() {
  return (
    <Layer id={T.html}>
      <StoryOf picture="people" />
      <Note id={T.six.key} at={T.six.at} size="big" align="center" tone="catalog">
        {T.six.text}
      </Note>
      <Note id={T.six.caption.key} at={T.six.caption.at} size="text" align="center">
        {T.six.caption.text}
      </Note>
      <Note id={T.plaque.words.key} at={T.plaque.words.at} align="center">
        <b className="id-plaque__name">{T.plaque.name}</b>
        <span>{T.plaque.caption}</span>
      </Note>
    </Layer>
  );
}
