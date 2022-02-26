/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
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
export { PreCompiler };
//# sourceMappingURL=PreCompiler.js.map