/**
 * The clicks of slides 7 and 8, one chain each (beats.ts). Slide 7: the
 * empty outline, the agents beside it filling it row by row, the person's
 * mark travelling from the person to the tool, then everyone but the tool
 * steps away, the tool comes to the middle and grows, and the tag drops onto
 * its corner. Slide 8: the leads at the desk read the six folders as they
 * land; the board opens beside them and splits; three waves of agents work
 * its rows; then the view closes in on one finished piece, and its three
 * marks land under it.
 */
import { DUR, EASE, draw, fill, hide, mark, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { keys } from "./layout";
import { AI_BUILDS, SETUP } from "./layout-builds";

/** Slide 7: each block takes this long to travel from its agent to its place, and the next leaves this soon after; the mark sets out from the person this soon after the person comes, and travels this long. */
const TILE_TRAVEL = 0.9;
const TILE_APART = 0.14;
const MARK_AT = 0.6;
const MARK_PATH = 0.6;

export const aiBuilds = picture("ai-builds", {
  play: play(
    into("ai-builds"),
    { with: true, hold: 0.6, moves: [draw(AI_BUILDS.app.key, { at: 0 })] },
    {
      // The agents, outside its left edge, named.
      with: true,
      hold: 0.6,
      moves: [draw(keys(AI_BUILDS.agents), { at: 0, duration: 0.5, stagger: 0.15 }), rise(AI_BUILDS.agentsLabel.key, { at: 0.3 })],
    },
    { with: true, hold: 0.3, moves: [story("ai-builds", 0)] },
    {
      // Their rings fill as they work, and the blocks leave them row by row, growing as they go to their places.
      with: true,
      hold: 0.9,
      moves: [
        fill(keys(AI_BUILDS.agents), { at: 0, duration: 2.0, stagger: 0 }),
        ...AI_BUILDS.tiles.map((tile, i) =>
          to(tile.key, { x: 0, y: 0, autoAlpha: 1, "--k": 1 }, { x: tile.from.x, y: tile.from.y, autoAlpha: 0, "--k": 0 }, { at: i * TILE_APART, duration: TILE_TRAVEL, ease: EASE.page }),
        ),
      ],
    },
    {
      // The person, named, and the mark that approves the tool: it leaves the person's hand and travels to the tool's corner.
      hold: 0.8,
      moves: [
        draw(AI_BUILDS.person.key, { at: 0, duration: 0.6 }),
        rise(AI_BUILDS.person.label.key, { at: 0.2 }),
        mark(AI_BUILDS.mark.key, { at: MARK_AT, duration: MARK_PATH }),
        to(AI_BUILDS.mark.key, { x: 0 }, { x: AI_BUILDS.mark.from.x }, { at: MARK_AT, duration: MARK_PATH, ease: "sine.out" }),
        to(AI_BUILDS.mark.key, { y: 0 }, { y: AI_BUILDS.mark.from.y }, { at: MARK_AT, duration: MARK_PATH, ease: "sine.in" }),
      ],
    },
    {
      // The agents step back and fade, and the person goes; the person's name stays with the mark.
      hold: 0.2,
      moves: [
        to(keys(AI_BUILDS.agents), { x: AI_BUILDS.stepBack, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, { at: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 }),
        hide([AI_BUILDS.agentsLabel.key, AI_BUILDS.person.key], { at: 0.1, stagger: 0 }),
      ],
    },
    {
      // The tool stands on its own: it comes to the middle and grows, the name beside its mark going with it, and it is named.
      hold: 0.2,
      moves: [
        to(AI_BUILDS.tool.key, { "--x": AI_BUILDS.tool.to.x, "--y": AI_BUILDS.tool.to.y, "--s": AI_BUILDS.tool.scale }, { "--x": 0, "--y": 0, "--s": 1 }, { at: 0, duration: DUR.base, ease: EASE.page }),
        to(AI_BUILDS.person.label.key, { x: AI_BUILDS.person.label.by.x, y: AI_BUILDS.person.label.by.y }, { x: 0, y: 0 }, { at: 0, duration: DUR.base, ease: EASE.page }),
        rise(AI_BUILDS.finished.key, { at: DUR.base - 0.2 }),
      ],
    },
    // The tag drops onto its corner.
    { hold: 0.2, moves: [to(AI_BUILDS.tag.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: AI_BUILDS.tag.drop }, { at: 0, duration: 0.6, ease: EASE.out })] },
    { with: true, hold: 0, moves: [story("ai-builds", 1)] },
  ),
});

/** Slide 8: a folder lands this often; each one's reading leaves it this soon after and takes this long, and the folder opens and closes again over this long as it does. */
const FOLDER_APART = 0.32;
const READ = { after: 0.3, travel: 0.5 };
const OPEN_CLOSE = 0.3;
/** A wave starts this often; inside it, its agents arrive, then its cells fill with their dots riding the front. */
const WAVE_APART = 0.7;
const FILL_AFTER = 0.3;
const FILL = 0.8;
/** The view closes in over this long. */
const CLOSE_IN = DUR.travel;

const { board, piece } = SETUP;

export const setup = picture("setup", {
  play: play(
    into("setup"),
    {
      // The desk, and the leads at it, named.
      with: true,
      hold: 0.5,
      moves: [draw(SETUP.desk.key, { at: 0, duration: 0.6 }), draw(keys(SETUP.leads), { at: 0.2, duration: 0.5, stagger: 0.1 }), rise(SETUP.leadsLabel.key, { at: 0.4 })],
    },
    {
      // The folders land one at a time; a reading leaves each for the leads, whose rings fill as they read.
      with: true,
      hold: 0.7,
      moves: [
        ...SETUP.folders.map((folder, i) => to(folder.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: SETUP.drop }, { at: i * FOLDER_APART, duration: 0.45, ease: EASE.out })),
        ...SETUP.reads.flatMap((read, i) => [
          to(read.key, { x: read.by.x, y: read.by.y, autoAlpha: 1 }, { x: 0, y: 0, autoAlpha: 0 }, { at: i * FOLDER_APART + READ.after, duration: READ.travel, ease: EASE.page }),
          hide(read.key, { at: i * FOLDER_APART + READ.after + READ.travel, duration: 0.2 }),
        ]),
        // Each folder opens as its reading leaves it and closes again.
        ...SETUP.folders.flatMap((folder, i) => [
          to(folder.key, { "--k": 1 }, { "--k": 0 }, { at: i * FOLDER_APART + READ.after, duration: OPEN_CLOSE / 2, ease: EASE.soft }),
          to(folder.key, { "--k": 0 }, undefined, { at: i * FOLDER_APART + READ.after + OPEN_CLOSE / 2, duration: OPEN_CLOSE / 2, ease: EASE.soft }),
        ]),
        fill(keys(SETUP.leads), { at: READ.after, duration: 5 * FOLDER_APART + READ.travel, stagger: 0 }),
      ],
    },
    { with: true, hold: 0.3, moves: [story("setup", 0)] },
    {
      // Beside the desk the board opens under its heading and splits: its rows, named, then its sprints, named.
      with: true,
      hold: 1.7,
      moves: [
        rise(board.heading.key, { at: 0 }),
        draw(board.frame.key, { at: 0, duration: 0.7 }),
        draw(board.rows.key, { at: 0.4, duration: 0.5 }),
        show(board.epics.key, { at: 0.5 }),
        draw(board.cols.key, { at: 0.8, duration: 0.5 }),
        show(board.sprints.key, { at: 0.9 }),
      ],
    },
    {
      // The agents arrive in waves, a row each, and fill its cells, their dots riding across.
      with: true,
      hold: 1.4,
      moves: [
        show(board.waves.key, { at: 0.1 }),
        ...board.rowsOfWork.flatMap((row, w) => {
          const at = w * WAVE_APART;
          return [
            to(row.wave.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -30 }, { at, duration: 0.4, ease: EASE.out, stagger: 0.06 }),
            fill(row.fills.key, { at: at + FILL_AFTER, duration: FILL, ease: "none", stagger: 0.08 }),
            to(row.dots.key, { autoAlpha: 1, x: row.dots.ride }, { autoAlpha: 0, x: 0 }, { at: at + FILL_AFTER, duration: FILL, ease: "none", stagger: 0.08 }),
          ];
        }),
      ],
    },
    { with: true, hold: 0.3, moves: [story("setup", 1)] },
    {
      // The view closes in on one finished piece: the board goes small and faint beside it and its names, too small to read there, go; the desk and its folders go; and the piece grows out of its cell.
      hold: 0.3,
      moves: [
        to(board.key, { "--x": board.to.x, "--y": board.to.y, "--s": board.small, autoAlpha: board.faint }, { "--x": 0, "--y": 0, "--s": 1, autoAlpha: 1 }, { at: 0, duration: CLOSE_IN, ease: EASE.page }),
        hide([SETUP.desk.key, ...keys(SETUP.leads), SETUP.leadsLabel.key, ...keys(SETUP.folders), board.heading.key, board.epics.key, board.sprints.key, board.waves.key], { at: 0, stagger: 0 }),
        show(piece.key, { at: 0, duration: 0.3 }),
        to(piece.key, { "--x": 0, "--y": 0, "--s": 1 }, { "--x": piece.from.x, "--y": piece.from.y, "--s": piece.from.scale }, { at: 0, duration: CLOSE_IN, ease: EASE.page }),
      ],
    },
    {
      // Under it, its three marks in turn, each named: the two reviewers, then the person's approval.
      hold: 0.1,
      moves: [
        draw(SETUP.marks[0].key, { at: 0, duration: 0.5 }),
        fill(SETUP.marks[0].key, { at: 0.2, duration: 0.4 }),
        rise(SETUP.marks[0].label.key, { at: 0.1 }),
        draw(SETUP.marks[1].key, { at: 0.5, duration: 0.5 }),
        fill(SETUP.marks[1].key, { at: 0.7, duration: 0.4 }),
        rise(SETUP.marks[1].label.key, { at: 0.6 }),
        mark(SETUP.marks[2].key, { at: 1.0, duration: 0.6 }),
        rise(SETUP.marks[2].label.key, { at: 1.1 }),
      ],
    },
  ),
});
