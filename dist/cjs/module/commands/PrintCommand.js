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
exports.PrintCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var AliasManager_1 = require("../AliasManager");
var InCodeCommand_1 = require("./InCodeCommand");
var PrintCommand = /** @class */ (function (_super) {
    __extends(PrintCommand, _super);
    function PrintCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintCommand.prototype.execute = function (args) {
        if (args.length < 4) {
            return "// This line contained a print command, but it was missing arguments.";
        }
        else {
            if (AliasManager_1.AliasManager.getTypeAliases(args[3]).length > 0) {
                return "".concat(AliasManager_1.AliasManager.getTypeAliases(args[3])[0], "(").concat(args[0].replace(/\u0000/g, " "), ");");
            }
            else {
                return "// This line contained a print command, but the type was not recognized.";
            }
        }
    };
    return PrintCommand;
}(InCodeCommand_1.InCodeCommand));
exports.PrintCommand = PrintCommand;
//# sourceMappingURL=PrintCommand.js.map