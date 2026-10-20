/**
 * The stand world's stage: Part 1, slides 1 to 4a, on one plane the size
 * of the stage, never moved by a camera. Slide 1's title page is set on
 * navy in the stage's middle (scene-title.tsx); the white slides' titles
 * sit in the deck's place, and each white slide's picture is two parts,
 * its marks and its HTML, so it goes in one move when the next slide
 * arrives. Where things go and what they say is in the layout modules, how
 * they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { PICTURES, TITLE, titleOf } from "./layout";
import { ExistsHtml, ExistsMarks } from "./scene-exists";
import { FleetHtml, FleetMarks } from "./scene-fleet";
import { PositionHtml, PositionMarks } from "./scene-position";
import { TitleHtml } from "./scene-title";
import { WorldMovedHtml, WorldMovedMarks } from "./scene-world-moved";
import "./stand.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <WorldMovedMarks />
          <PositionMarks />
          <ExistsMarks />
          <FleetMarks />
        </>
      }
    >
      <TitleHtml />
      {PICTURES.slice(1).map((picture) => {
        const title = titleOf(picture.id);
        return <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />;
      })}
      <WorldMovedHtml />
      <PositionHtml />
      <ExistsHtml />
      <FleetHtml />
    </Plane>
  );
}
