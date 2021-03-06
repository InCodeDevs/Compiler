/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
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
import { InCodeCommand } from "./InCodeCommand";
import { Error } from "../Error";
var AskCommand = /** @class */ (function (_super) {
    __extends(AskCommand, _super);
    function AskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AskCommand.prototype.execute = function (args) {
        if (args.length === 0) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            args[0] = args[0].replace(/\u0000/g, " ");
            if (args.length === 1) {
                return "// Diese Zeile fragt den Benutzer \"".concat(args[0], "\"\nprompt(").concat(args[0], ");");
            }
            else {
                return "// Diese Zeile fragt den Benutzer \"".concat(args[0], "\" und speichert die Antwort in ").concat(args[args.length - 1], "\nlet ").concat(args[args.length - 1], " = prompt(").concat(args[0], ");");
            }
        }
    };
    return AskCommand;
}(InCodeCommand));
export { AskCommand };
//# sourceMappingURL=AskCommand.js.map