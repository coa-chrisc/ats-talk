import {expect,it} from "vitest";
import {playOf,markup} from "./harness";
import {shown} from "../../script/find";
it("presents six illustrated requests with data access and funding separate",()=>{
 for(let i=0;i<6;i++) expect(playOf("could-be.play",`could-be.action.${i}`)).toHaveLength(1);
 const words=shown("could-be","play"); expect(words[8]).toBe("Approve data-access rules");expect(words[10]).toBe("Allocate funding");
 expect(markup).not.toContain('data-build="could-be.panel.');
});
