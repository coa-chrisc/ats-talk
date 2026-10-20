/**
 * The enterprise world's stage: Part 2, slides 3 to 6 and 4a, on one plane the
 * size of the stage, never moved by a camera. Each slide's title sits in
 * the deck's place, and each slide's picture is two parts, its marks and
 * its HTML, so it goes in one move when the next slide arrives. Where
 * things go and what they say is in the layout modules, how they move in
 * the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { AgentsHtml, AgentsMarks } from "./scene-agents";
import { FleetHtml, FleetMarks } from "./scene-fleet";
import { ReviewHtml, ReviewMarks } from "./scene-review";
import { SpendingHtml, SpendingMarks } from "./scene-spending";
import { StumbledHtml, StumbledMarks } from "./scene-stumbled";
import "./enterprise.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <SpendingMarks />
          <AgentsMarks />
          <ReviewMarks />
          <FleetMarks />
          <StumbledMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <SpendingHtml />
      <AgentsHtml />
      <ReviewHtml />
      <FleetHtml />
      <StumbledHtml />
    </Plane>
  );
}
