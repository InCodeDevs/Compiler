"use strict";
/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
var AliasManager_1 = require("../AliasManager");
var JSCommand_1 = require("./JSCommand");
var CreateCommand_1 = require("./CreateCommand");
var CallCommand_1 = require("./CallCommand");
var AddCommand_1 = require("./AddCommand");
var RepeatCommand_1 = require("./RepeatCommand");
var PrintCommand_1 = require("./PrintCommand");
var AskCommand_1 = require("./AskCommand");
var AbstractSyntaxTreeGenerator_1 = require("../AbstractSyntaxTreeGenerator");
var IfCommand_1 = require("./IfCommand");
var ElseCommand_1 = require("./ElseCommand");
var WaitCommand_1 = require("./WaitCommand");
var SetCommand_1 = require("./SetCommand");
var CommentCommand_1 = require("./CommentCommand");
var RemoveCommand_1 = require("./RemoveCommand");
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor() {
    }
    CommandExecutor.executeCommand = function (abstractSyntaxTree) {
        var ast;
        if (typeof abstractSyntaxTree === "string") {
            ast = AbstractSyntaxTreeGenerator_1.AbstractSyntaxTreeGenerator.generate(abstractSyntaxTree)[0];
        }
        else {
            ast = abstractSyntaxTree;
        }
        var code = "";
        if (AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase()).length > 0) {
            if (this.COMMANDS[AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase())[0]]) {
                code = this.COMMANDS[AliasManager_1.AliasManager.getCommandAliases(ast.command.toLowerCase())[0]].execute(ast.args);
            }
        }
        else {
            if (ast.command !== " ") {
                code += "// \"".concat(ast.command, " ").concat(ast.args.join(" "), "\" -> Der Befehl ").concat(ast.command, " konnte nicht gefunden werden.");
            }
        }
        if (ast.children.length > 0) {
            code += " {\n";
            ast.children.forEach(function (child) {
                for (var i = 0; i < child.intents; i++) {
                    code += "  ";
                }
                code += CommandExecutor.executeCommand(child);
            });
            code += "}";
        }
        code += "\n";
        return code;
    };
    CommandExecutor.COMMANDS = {
        "@": new JSCommand_1.JSCommand(),
        "//": new CommentCommand_1.CommentCommand(),
        create: new CreateCommand_1.CreateCommand(),
        call: new CallCommand_1.CallCommand(),
        add: new AddCommand_1.AddCommand(),
        remove: new RemoveCommand_1.RemoveCommand(),
        repeat: new RepeatCommand_1.RepeatCommand(),
        print: new PrintCommand_1.PrintCommand(),
        ask: new AskCommand_1.AskCommand(),
        if: new IfCommand_1.IfCommand(),
        else: new ElseCommand_1.ElseCommand(),
        wait: new WaitCommand_1.WaitCommand(),
        set: new SetCommand_1.SetCommand(),
    };
    return CommandExecutor;
}());
exports.CommandExecutor = CommandExecutor;
//# sourceMappingURL=CommandExecutor.js.map