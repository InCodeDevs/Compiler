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
var JSCommand = /** @class */ (function (_super) {
    __extends(JSCommand, _super);
    function JSCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSCommand.prototype.execute = function (args) {
        var c = args.join(" ");
        c = c.replace(/\u0000/g, " ");
        return c;
    };
    JSCommand.COMMAND_NAME = "@";
    return JSCommand;
}(InCodeCommand));
export { JSCommand };
//# sourceMappingURL=JSCommand.js.map