/**
 * The plan world's stage: one plane the size of the stage, never moved by a
 * camera. Every slide's title sits in the same place; each slide's picture
 * is two parts, its marks and its HTML (its story lines among them), so it
 * goes in one move when the next slide arrives. Each slide's drawing is in
 * its own scene module; where things go and what they say is in the layout
 * modules, how they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { LanesHtml, LanesMarks } from "./scene-lanes";
import { LevelUpHtml, LevelUpMarks } from "./scene-level-up";
import { OutcomesHtml, OutcomesMarks } from "./scene-outcomes";
import "./pl.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <LanesMarks />
          <LevelUpMarks />
          <OutcomesMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <LanesHtml />
      <LevelUpHtml />
      <OutcomesHtml />
    </Plane>
  );
}
