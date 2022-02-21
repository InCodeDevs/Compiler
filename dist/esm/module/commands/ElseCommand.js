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
import { InCodeCommand } from "./InCodeCommand";
import { CommandExecutor } from "./CommandExecutor";
var ElseCommand = /** @class */ (function (_super) {
    __extends(ElseCommand, _super);
    function ElseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElseCommand.prototype.execute = function (args) {
        if (args.length > 0) {
            return "else ".concat(CommandExecutor.executeCommand(args.join(" ")));
        }
        else {
            return "else";
        }
    };
    return ElseCommand;
}(InCodeCommand));
export { ElseCommand };
//# sourceMappingURL=ElseCommand.js.map