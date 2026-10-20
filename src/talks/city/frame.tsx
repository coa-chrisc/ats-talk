/**
 * The talk's frame, as the Austin Public Health deck draws it on every
 * content slide (docs/bchc-brand.md), as the BCHC talk's frame does, with
 * its own footer and its own class names: the department's logo top left,
 * the footer bottom left and the slide's number bottom right. All three sit in
 * the stage's 64 px edge, outside the safe area the worlds draw in. The
 * number ends short of the window's corner, where the deck's own back and
 * forward buttons and its counter sit. The title and close slides, on navy,
 * carry the logo in its white version and the number, without the footer.
 * Every part stays mounted on both grounds, so the change of ground fades
 * (frame.css) instead of popping: the two logos cross-fade and the footer
 * fades out and back.
 */
import Image from "next/image";
import type { FrameProps } from "@/components/deck/engine";
import { withBase } from "@/lib/base-path";
import "./frame.css";

/** The logo's file (1920 by 646) and its height on the stage; its width keeps the file's proportions. */
export const LOGO = { src: withBase("/brand/aph-logo.v1.png"), h: 40, w: Math.round((40 * 1920) / 646) } as const;

/** The logo's white version, for the navy title and close slides. */
export const LOGO_WHITE = withBase("/brand/aph-logo-white.v1.png");

/** The footer's words: the department, then the group the talk is for. */
export const FOOTER = { department: "Austin Public Health", group: "AI Strategy" } as const;

export function Frame({ number, ground }: FrameProps) {
  const logo = (src: string, tone: "ink" | "white", shown: boolean) => (
    <Image
      className={`city-frame__logo city-frame__logo--${tone}`}
      src={src}
      alt={shown ? "Austin Public Health" : ""}
      aria-hidden={shown ? undefined : true}
      width={LOGO.w}
      height={LOGO.h}
      loading="eager"
      decoding="sync"
      unoptimized
    />
  );
  return (
    <div className="city-frame" data-ground={ground}>
      {logo(LOGO.src, "ink", !ground)}
      {logo(LOGO_WHITE, "white", Boolean(ground))}
      <p className="city-frame__footer" aria-hidden={ground ? true : undefined}>
        <b>{FOOTER.department}</b> · {FOOTER.group}
      </p>
      <p className="city-frame__number">{number}</p>
    </div>
  );
}
