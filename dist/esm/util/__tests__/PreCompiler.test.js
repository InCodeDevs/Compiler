/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { PreCompiler } from "../PreCompiler";
test("Remove Whitespaces", function () {
    expect(PreCompiler.preCompile("W  hitespaces")).toBe("Whitespaces");
});
test("Remove Escape Characters", function () {
    expect(PreCompiler.preCompile("\r")).toBe("");
});
//# sourceMappingURL=PreCompiler.test.js.map