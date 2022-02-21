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
exports.AddCommand = void 0;
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
var AliasManager_1 = require("../AliasManager");
var InCodeCommand_1 = require("./InCodeCommand");
var AddCommand = /** @class */ (function (_super) {
    __extends(AddCommand, _super);
    function AddCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddCommand.prototype.execute = function (args) {
        if (args.length < 4) {
            return "// This line contained an add command, but it was missing arguments.";
        }
        else {
            var element = args[0];
            var parent = args[args.length - 2];
            if (AliasManager_1.AliasManager.getTypeAliases(parent).length > 0) {
                parent = AliasManager_1.AliasManager.getTypeAliases(parent)[0];
            }
            return "".concat(parent, ".appendChild(").concat(element, ");");
        }
    };
    return AddCommand;
}(InCodeCommand_1.InCodeCommand));
exports.AddCommand = AddCommand;
//# sourceMappingURL=AddCommand.js.map