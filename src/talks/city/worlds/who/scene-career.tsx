/**
 * What slide 2 draws (layout-career.ts): the timeline, its end tick and
 * the last year beside it, and each marker's ring, lit dot, stem, name and,
 * where it has them, its year over the name and its caption under it. All of it is marks; the slide's title and story band
 * are in scene.tsx.
 */
import { CAREER, HALO_R, RING_R } from "./layout-career";
import { MarkerDot, MarkerRing, Stroke, Word } from "./parts";

export function CareerMarks() {
  const { line, end, now, markers } = CAREER;
  return (
    <>
      <Stroke id={line.key} from={line.from} to={line.to} className="who-line" />
      <Stroke id={end.key} from={{ x: end.x, y: end.from }} to={{ x: end.x, y: end.to }} className="who-line who-line--tick" />
      <Word id={now.key} at={now.at} text={now.text} kind="small" anchor="start" />
      {markers.map((marker) => (
        <g key={marker.key}>
          <Stroke id={marker.stem.key} from={{ x: marker.x, y: marker.stem.from }} to={{ x: marker.x, y: marker.stem.to }} className="who-stem" />
          <MarkerRing id={marker.ring.key} at={marker.ring.at} r={RING_R} />
          <MarkerDot id={marker.key} at={marker.ring.at} r={RING_R} halo={HALO_R} />
          {marker.year && <Word id={marker.year.key} at={marker.year.at} text={marker.year.text} kind="small" />}
          <Word id={marker.name.key} at={marker.name.at} text={marker.name.text} kind="name" />
          {marker.caption && <Word id={marker.caption.key} at={marker.caption.at} text={marker.caption.text} kind="small" />}
        </g>
      ))}
    </>
  );
}
