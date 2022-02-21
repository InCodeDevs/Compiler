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
exports.IfCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var AliasManager_1 = require("../AliasManager");
var InCodeCommand_1 = require("./InCodeCommand");
var CommandExecutor_1 = require("./CommandExecutor");
var IfCommand = /** @class */ (function (_super) {
    __extends(IfCommand, _super);
    function IfCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IfCommand.prototype.execute = function (args) {
        // [4] x gleich 2 ist
        // [5] x is equal to 2
        // [4] x gedrückt wird <command>
        // [4] x is pressed <command>
        if (args.length < 4) {
            return "// This line contained an if command, but it was missing arguments.";
        }
        else {
            if (AliasManager_1.AliasManager.getOperatorAliases(args[1]).length > 0 ||
                AliasManager_1.AliasManager.getOperatorAliases(args[2]).length > 0) {
                // normal if --- then
                var operator = void 0;
                var operatorPosition = void 0;
                var first = void 0;
                var second = void 0;
                if (AliasManager_1.AliasManager.getOperatorAliases(args[1]).length > 0) {
                    operator = AliasManager_1.AliasManager.getOperatorAliases(args[1])[0];
                    operatorPosition = 1;
                }
                else {
                    operator = AliasManager_1.AliasManager.getOperatorAliases(args[2])[0];
                    operatorPosition = 2;
                }
                if (operatorPosition === 1) {
                    first = args[0];
                    second = args[2].replace(/\u0000/g, " ");
                }
                else {
                    first = args[0];
                    second = args[1].replace(/\u0000/g, " ");
                }
                return "if (".concat(first, " ").concat(operator, " ").concat(second, ")");
            }
            else if (AliasManager_1.AliasManager.getEventAliases(args[1]).length > 0 ||
                AliasManager_1.AliasManager.getEventAliases(args[2]).length > 0) {
                // event listener
                var first = args[0];
                var event = void 0;
                var eventPosition = void 0;
                var command = void 0;
                command = args.slice(3).join(" ");
                if (AliasManager_1.AliasManager.getEventAliases(args[1]).length > 0) {
                    event = AliasManager_1.AliasManager.getEventAliases(args[1])[0];
                    eventPosition = 1;
                }
                else {
                    event = AliasManager_1.AliasManager.getEventAliases(args[2])[0];
                    eventPosition = 2;
                }
                return "".concat(first, ".addEventListener(\"").concat(event, "\", () => {\n  ").concat(CommandExecutor_1.CommandExecutor.executeCommand(command).split("\n")[0], "\n});");
            }
        }
        return "";
    };
    return IfCommand;
}(InCodeCommand_1.InCodeCommand));
exports.IfCommand = IfCommand;
//# sourceMappingURL=IfCommand.js.map