/**
 * Part 1, one click a slide (slides 1 to 3), each click its slide's whole
 * chain (docs/city-build-handbook.md, section 4): the first beat clears
 * what the last slide leaves and hands the title on; the story lines come
 * up with the beats they explain, A before B. A beat's own times are
 * seconds from the beat's start; `chain()` places the beats.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, behind, draw, lines, retitle, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { OPENING, storyKeysOf, titleKey } from "./layout";
import { CAREER, along } from "./layout-career";
import { LEARNING } from "./layout-learning";
import { chained, leave, lightUp, turnUp } from "./moves";
import { turnOf } from "./parts";

/** The first slide's chain waits for the world's arrival fade to be under way. */
export const ARRIVE = 0.35;

/** 1: the title comes up line by line, the rule grows out under it, then the two story lines. */
const title = (): StepDef[] =>
  picture(
    "title",
    {
      play: chained(
        [
          { moves: [lines(OPENING.title.key, { at: 0, stagger: 0.14 })] },
          { with: true, hold: 0.75, moves: [to(OPENING.rule.key, { scaleX: 1 }, { scaleX: 0 }, { at: 0, duration: 0.7, ease: EASE.out })] },
          { with: true, hold: 0.5, moves: [story("title", 0)] },
          { with: true, hold: 0.6, moves: [story("title", 1)] },
        ],
        ARRIVE,
      ),
    },
    { ground: "navy" },
  );

/** How long the timeline takes to draw across the stage. */
const LINE_DRAW = 1.8;
/** Between one marker lighting and the next: quick on the short stretch, slower where they have the room. */
const CLOSE = 0.45;
const ROOMY = 0.65;

const { line, end, now, markers } = CAREER;
/** Every part slide 2 draws, for the slide after it to clear. */
const careerParts = [
  line.key,
  end.key,
  now.key,
  ...markers.flatMap((marker) => [marker.key, marker.ring.key, marker.stem.key, marker.name.key, ...(marker.year ? [marker.year.key] : []), ...(marker.caption ? [marker.caption.key] : [])]),
];

/** 2: the line draws left to right, each ring arriving as it passes and the last year as it ends; the first three markers light close together, then the other four, slower, each with its year. */
const career = (): StepDef[] => {
  const front = { at: 0, duration: LINE_DRAW };
  const rings = behind(front, markers.map((marker) => along(marker.x)));
  const captioned = markers.find((marker) => marker.caption)!;
  return picture("career", {
    play: chained([
      { moves: [leave([OPENING.rule.key, ...storyKeysOf("title")]), retitle(titleKey("title"), titleKey("career"))] },
      {
        with: true,
        hold: 0.45,
        moves: [
          draw(line.key, front),
          ...markers.map((marker, i) => show(marker.ring.key, { at: rings[i], duration: 0.3 })),
          draw(end.key, { at: LINE_DRAW - 0.1, duration: 0.3 }),
          rise(now.key, { at: LINE_DRAW, duration: 0.6 }),
        ],
      },
      { hold: 0.3, moves: markers.slice(0, 3).map((marker, i) => lightUp(marker, i * CLOSE)) },
      { with: true, hold: 0.9, moves: [story("career", 0)] },
      {
        hold: 0.5,
        moves: [...markers.slice(3).map((marker, i) => lightUp(marker, i * ROOMY)), rise(captioned.caption!.key, { at: 0.55, duration: 0.6 })],
      },
      { with: true, hold: 2.0, moves: [story("career", 1)] },
    ]),
  });
};

const { courses, big, partners } = LEARNING;
/** Each tile starts this long after the one before it; a heading rises just before its group. */
const NEXT = 0.3;
const up = (key: string, at = 0) => rise(key, { at, duration: 0.6 });
/** One beat a tile, each `NEXT` after the last, the first `first` after the beat before. */
const oneByOne = (keys: readonly string[], first = NEXT) => keys.map((key, i) => ({ with: true, hold: i === 0 ? first : NEXT, moves: [up(key)] }));
const tileKeys = (group: { tiles: { key: string }[] }) => group.tiles.map((tile) => tile.key);

/**
 * 3: the courses heading, then its seven logos one at a time, story line A
 * after the top row; the larger card turns in beside them, then story line
 * B; then the partners heading and its 11 logos one at a time.
 */
const learning = (): StepDef[] =>
  picture("learning", {
    play: chained([
      { moves: [leave([...careerParts, ...storyKeysOf("career")]), retitle(titleKey("career"), titleKey("learning"))] },
      { with: true, hold: 0.45, moves: [up(courses.head.key)] },
      ...oneByOne(tileKeys(courses).slice(0, 4)),
      { with: true, hold: 0.4, moves: [story("learning", 0)] },
      ...oneByOne(tileKeys(courses).slice(4), 0.6),
      { with: true, hold: 0.6, moves: [turnUp([big.key], { at: 0, duration: 1.0 }), up(big.school.key, 0.85), up(big.when.key, 1.0)] },
      { with: true, hold: 1.0, moves: [story("learning", 1)] },
      { with: true, hold: 0.6, moves: [up(partners.head.key)] },
      ...oneByOne(tileKeys(partners)),
    ]),
  });

/** Every step of the world, in the script's order. */
export const stepsOfWho = (): StepDef[] => [...title(), ...career(), ...learning()];

/** The part inside each card that turns, for the tests: the larger card's. */
export const turns = () => [turnOf(big.key)];
