/**
 * The built world's stage: Part 2, slides 4 to 12a, on one plane at HOME.
 * Each slide's title at the deck's place, then each slide's own drawing:
 * its marks in the plane's SVG and its HTML (its story lines among it) on
 * top. Nothing here moves on its own; the steps move it.
 */
"use client";

import { Plane, SetText } from "@/components/deck/kit";
import { TITLE, TITLES } from "./layout";
import { AiBuildsHtml, AiBuildsMarks, SetupHtml, SetupMarks } from "./scene-builds";
import { RadBornHtml, RadBornMarks } from "./scene-rad-born";
import { RadEvolvesHtml, RadEvolvesMarks } from "./scene-rad-evolves";
import { PortfolioHtml, PortfolioMarks, RecognitionHtml, RecognitionMarks, SeenHtml, SeenMarks } from "./scene-proof";
import { ControlsHtml, ControlsMarks, SafeHtml, SafeMarks } from "./scene-safe";
import { StartHtml, StartMarks } from "./scene-start";
import { TooLongHtml, TooLongMarks } from "./scene-too-long";
import { TwentyHtml, TwentyMarks, WrongHtml, WrongMarks } from "./scene-turn";
import { WeeklyHtml, WeeklyMarks } from "./scene-weekly";
import "./built.css";
import "./built-proof.css";
import "./built-rad.css";

export function Scene() {
  return (
    <Plane
      marks={
        <>
          <StartMarks />
          <SafeMarks />
          <WeeklyMarks />
          <WrongMarks />
          <TwentyMarks />
          <RadBornMarks />
          <AiBuildsMarks />
          <SetupMarks />
          <TooLongMarks />
          <RadEvolvesMarks />
          <PortfolioMarks />
          <SeenMarks />
          <RecognitionMarks />
          <ControlsMarks />
        </>
      }
    >
      {TITLES.map((title) => (
        <SetText key={title.key} id={title.key} x={TITLE.x} y={TITLE.y} size="title" lines={title.lines} />
      ))}
      <StartHtml />
      <SafeHtml />
      <WeeklyHtml />
      <WrongHtml />
      <TwentyHtml />
      <RadBornHtml />
      <AiBuildsHtml />
      <SetupHtml />
      <TooLongHtml />
      <RadEvolvesHtml />
      <PortfolioHtml />
      <SeenHtml />
      <RecognitionHtml />
      <ControlsHtml />
    </Plane>
  );
}
