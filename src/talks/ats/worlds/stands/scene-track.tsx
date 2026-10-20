/** Slide 11's picture: the track from above, its white start stripe, the pack far round the lap and the City's large runner at the start, each named; the grey tag in the infield; the fence post beside the start with its tick and name. */
"use client";

import { Part, PassTick } from "@/components/deck/kit";
import { TRACK } from "./layout-track";
import { Layer, StoryOf, Tagged, Words } from "./parts";
import { FencePost } from "./parts-figures";
import { Pack, Runner, StartLine, Track } from "./parts-track";
import { RUNNER } from "./track-geometry";

const P = TRACK;

export function TrackMarks() {
  return (
    <Part id={P.marks}>
      <Track id={P.track.key} />
      <StartLine id={P.start.key} />
      <Pack ids={P.pack.keys} />
      <Words id={P.pack.name.key} at={P.pack.name.at} text={P.pack.name.text} size="text" strong />
      <Runner id={P.city.key} at={P.city.at} h={RUNNER.large} tone="process" />
      <Words id={P.city.name.key} at={P.city.name.at} text={P.city.name.text} size="text" strong />
      <Tagged id={P.tag.key} at={P.tag.at} text={P.tag.text} tone="grey" />
      <FencePost id={P.post.key} x={P.post.x} w={P.post.w} top={P.post.top} foot={P.post.foot} />
      <Words id={P.post.name.key} at={P.post.name.at} text={P.post.name.text} anchor="start" strong />
      <PassTick id={P.post.tick.key} at={P.post.tick.at} r={P.post.tick.r} />
    </Part>
  );
}

export function TrackHtml() {
  return (
    <Layer id={P.html}>
      <StoryOf picture="track" />
    </Layer>
  );
}
