"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = exports.Compiler = exports.AliasManager = exports.AbstractSyntaxTreeGenerator = exports.CodeGenerator = void 0;
var CodeGenerator_1 = require("./module/CodeGenerator");
Object.defineProperty(exports, "CodeGenerator", { enumerable: true, get: function () { return CodeGenerator_1.CodeGenerator; } });
var AbstractSyntaxTreeGenerator_1 = require("./module/AbstractSyntaxTreeGenerator");
Object.defineProperty(exports, "AbstractSyntaxTreeGenerator", { enumerable: true, get: function () { return AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator; } });
var AliasManager_1 = require("./module/AliasManager");
Object.defineProperty(exports, "AliasManager", { enumerable: true, get: function () { return AliasManager_1.AliasManager; } });
var Compiler_1 = require("./module/Compiler");
Object.defineProperty(exports, "Compiler", { enumerable: true, get: function () { return Compiler_1.Compiler; } });
var CommandExecutor_1 = require("./module/commands/CommandExecutor");
Object.defineProperty(exports, "CommandExecutor", { enumerable: true, get: function () { return CommandExecutor_1.CommandExecutor; } });
//# sourceMappingURL=index.js.map