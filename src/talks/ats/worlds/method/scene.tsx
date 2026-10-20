/**
 * The method world's stage: one plane the size of the stage, never moved by
 * a camera. Every slide's title sits in the same place; each slide's picture
 * is two parts, its marks and its HTML, so it goes in one move when the
 * next slide arrives. Each slide's drawing is in its own
 * scene module; where things go and what they say is in the layout modules,
 * how they move in the steps modules.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { ListenHtml, ListenMarks } from "./scene-listen";
import { NotProposingHtml, NotProposingMarks } from "./scene-not-proposing";
import { PeopleHtml, PeopleMarks } from "./scene-people";
import { SortHtml, SortMarks } from "./scene-sort";
import "./method.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <NotProposingMarks />
          <PeopleMarks />
          <ListenMarks />
          <SortMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <NotProposingHtml />
      <PeopleHtml />
      <ListenHtml />
      <SortHtml />
    </Plane>
  );
}
