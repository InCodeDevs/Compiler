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
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";
import { InCodeCommand } from "./InCodeCommand";
import { Error } from "../Error";
var RepeatCommand = /** @class */ (function (_super) {
    __extends(RepeatCommand, _super);
    function RepeatCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RepeatCommand.prototype.execute = function (args) {
        if (args.length < 2) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (args.length === 2) {
                return "// Diese Zeile wiederholt die darunter stehenden Instruktionen ".concat(args[0], " mal\nfor (let i = 0; i < ").concat(args[0], "; i++)");
            }
            else if (args.length === 6) {
                if (AliasManager.getOperatorAliases(args[2]).length > 0) {
                    return "// Diese Zeile wiederholt die darunter stehenden Instruktionen solange die Variable ".concat(args[1], " ").concat(args[2], " der Variable ").concat(args[4], " ist\nwhile(").concat(args[1], " ").concat(AliasManager.getOperatorAliases(args[2])[0], " ").concat(args[4], ")");
                }
                else {
                    return Error.ERROR_UNKNOWN_OPERATOR;
                }
            }
            else {
                return Error.ERROR_MISSING_PARAMETER;
            }
        }
    };
    return RepeatCommand;
}(InCodeCommand));
export { RepeatCommand };
//# sourceMappingURL=RepeatCommand.js.map