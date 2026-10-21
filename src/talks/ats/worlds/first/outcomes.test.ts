import {expect,it} from "vitest";
import {startOf,endOf,markup} from "./harness";
import {shown} from "../../script/find";
it("establishes the measure before baseline, target, and review responsibilities",()=>{
 expect(startOf("outcomes.play","outcomes.baseline")).toBeGreaterThanOrEqual(endOf("outcomes.play","outcomes.ruler"));
 expect(startOf("outcomes.play","outcomes.check.0")).toBeGreaterThanOrEqual(endOf("outcomes.play","outcomes.target"));
 const words=shown("outcomes","play");
 expect(words[0]).toMatch(/^Illustrative project:/);
 expect(words[5]).toContain("before the pilot"); expect(words[7]).toContain("after measuring the baseline");
 expect(markup).not.toContain('data-build="outcomes.panel.');
});
