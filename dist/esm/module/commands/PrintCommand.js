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
var PrintCommand = /** @class */ (function (_super) {
    __extends(PrintCommand, _super);
    function PrintCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintCommand.prototype.execute = function (args) {
        if (args.length < 4) {
            return Error.ERROR_MISSING_PARAMETER;
        }
        else {
            if (AliasManager.getTypeAliases(args[3]).length > 0) {
                return "// Diese Zeile gibt den angegebenen Text in der ".concat(args[3], " aus\n").concat(AliasManager.getTypeAliases(args[3])[0], "(").concat(args[0].replace(/\u0000/g, " "), ");");
            }
            else {
                return Error.ERROR_UNKNOWN_TYPE;
            }
        }
    };
    return PrintCommand;
}(InCodeCommand));
export { PrintCommand };
//# sourceMappingURL=PrintCommand.js.map