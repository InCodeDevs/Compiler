"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error() {
    }
    Error.ERROR_MISSING_PARAMETER = "// FEHLER: Diese Zeile enthielt zu wenige Parameter.";
    Error.ERROR_UNKNOWN_TYPE = "// FEHLER: Diese Zeile enthielt einen unbekannten Typ.";
    Error.ERROR_UNKNOWN_OPERATOR = "// FEHLER: Diese Zeile enthielt einen unbekannten Operator.";
    Error.ERROR_NOT_A_NUMBER = "// FEHLER: Diese Zeile enthielt keine Zahl.";
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=Error.js.map