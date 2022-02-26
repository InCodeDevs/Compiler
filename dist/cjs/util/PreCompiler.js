"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCompiler = void 0;
var PreCompiler = /** @class */ (function () {
    function PreCompiler() {
    }
    PreCompiler.preCompile = function (source) {
        source = source.replace(/ {2}/g, "");
        source = source.replace(/\r/g, "");
        return source;
    };
    return PreCompiler;
}());
exports.PreCompiler = PreCompiler;
//# sourceMappingURL=PreCompiler.js.map