"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var PreCompiler_1 = require("../PreCompiler");
test("Remove Whitespaces", function () {
    expect(PreCompiler_1.PreCompiler.preCompile("W  hitespaces")).toBe("Whitespaces");
});
test("Remove Escape Characters", function () {
    expect(PreCompiler_1.PreCompiler.preCompile("\n\r")).toBe("");
});
//# sourceMappingURL=PreCompiler.test.js.map