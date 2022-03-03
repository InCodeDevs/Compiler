"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var InCodeCommand_1 = require("./InCodeCommand");
var Error_1 = require("../Error");
var WaitCommand = /** @class */ (function (_super) {
    __extends(WaitCommand, _super);
    function WaitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaitCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (!parseFloat(args[0])) {
                return Error_1.Error.ERROR_NOT_A_NUMBER;
            }
            else {
                return "// Diese Zeile wartet ".concat(args[0], "000 Millisekunden\nawait new Promise(done => setTimeout(() => done(), ").concat(args[0], "000))");
            }
        }
    };
    return WaitCommand;
}(InCodeCommand_1.InCodeCommand));
exports.WaitCommand = WaitCommand;
//# sourceMappingURL=WaitCommand.js.map