import {expect,it} from "vitest";
import {startOf,endOf,markup} from "./harness";
it("completes the approved-tool branch before moving to the review branch",()=>{
 expect(startOf("control.play","control.request")).toBeGreaterThanOrEqual(endOf("control.play","control.visibility"));
 expect(startOf("control.play","control.review")).toBeGreaterThanOrEqual(endOf("control.play","control.review-path"));
 expect(markup).not.toContain('data-build="control.panel.');
});
