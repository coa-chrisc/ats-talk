/**
 * The ideas world's stage: one plane the size of the stage, never moved by
 * a camera. Every slide's title sits in the same place; each slide's picture
 * is two parts, its marks and its HTML, so it goes in one move when the next
 * slide arrives. Each slide's drawing is in its own scene module; where
 * things go and what they say is in the layout modules, how they move in the
 * steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { EarnHtml, EarnMarks } from "./scene-earn";
import { EnforceHtml, EnforceMarks } from "./scene-enforce";
import { LadderHtml, LadderMarks } from "./scene-ladder";
import { PeopleHtml, PeopleMarks } from "./scene-people";
import "./ideas.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <LadderMarks />
          <EnforceMarks />
          <PeopleMarks />
          <EarnMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <LadderHtml />
      <EnforceHtml />
      <PeopleHtml />
      <EarnHtml />
    </Plane>
  );
}
