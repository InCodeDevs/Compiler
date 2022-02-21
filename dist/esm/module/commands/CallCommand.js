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
var CallCommand = /** @class */ (function (_super) {
    __extends(CallCommand, _super);
    function CallCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallCommand.prototype.execute = function (args) {
        if (args.length < 1) {
            return "// This line contained a call command, but it was missing arguments.";
        }
        else {
            return "window.incode.".concat(args[0], "();");
        }
    };
    return CallCommand;
}(InCodeCommand));
export { CallCommand };
//# sourceMappingURL=CallCommand.js.map