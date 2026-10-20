/** Slide 28's picture: the four numbered panels across the top, each named; under each a green line down to its tile; and the passed tick on each panel's top right corner. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { APPLIED, TICK, TILE } from "./layout-applied";
import { LABEL_LINE } from "./layout";
import { Layer, StoryOf } from "./parts";
import { Drop, Note, Numeral, Panel, WordTile } from "./parts-applied";

const A = APPLIED;

export function AppliedMarks() {
  return (
    <Part id={A.marks}>
      {A.panels.map((panel) => (
        <g key={panel.key}>
          <Panel id={panel.key} at={panel.at} />
          <Numeral id={panel.numeral.key} at={panel.numeral.at} text={panel.numeral.text} />
          <Drop id={panel.line.key} from={panel.line.from} to={panel.line.to} />
          <WordTile id={panel.tile.key} at={panel.tile.at} rx={TILE.rx} words={{ at: panel.tile.words, lines: panel.tile.lines }} pitch={LABEL_LINE} />
          <PassTick id={panel.tick.key} at={panel.tick.at} r={TICK.r} />
        </g>
      ))}
    </Part>
  );
}

export function AppliedHtml() {
  return (
    <Layer id={A.html}>
      <StoryOf picture="applied" />
      {A.panels.map((panel) => (
        <Note key={panel.name.key} id={panel.name.key} at={panel.name.at}>
          {panel.name.text}
        </Note>
      ))}
    </Layer>
  );
}
