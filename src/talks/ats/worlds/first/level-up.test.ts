import {expect,it} from "vitest";
import {startOf,endOf,playOf,markup} from "./harness";
it("establishes the roles before one complete practice cycle",()=>{
 expect(startOf("level-up.play","level-up.practice")).toBeGreaterThanOrEqual(endOf("level-up.play","level-up.role.2"));
 for(let i=0;i<4;i++) expect(playOf("level-up.play",`level-up.arc.${i}`)).toHaveLength(1);
 expect(markup).not.toContain('data-build="level-up.panel.');
});
