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
exports.CallCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var InCodeCommand_1 = require("./InCodeCommand");
var Error_1 = require("../Error");
var CallCommand = /** @class */ (function (_super) {
    __extends(CallCommand, _super);
    function CallCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return Error_1.Error.ERROR_MISSING_PARAMETER;
        }
        else {
            return "// Diese Zeile ruft die Funktion ".concat(args[0], " auf\nwindow.incode.").concat(args[0], "();");
        }
    };
    return CallCommand;
}(InCodeCommand_1.InCodeCommand));
exports.CallCommand = CallCommand;
//# sourceMappingURL=CallCommand.js.map