/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";
import { JSCommand } from "./JSCommand";
import { CreateCommand } from "./CreateCommand";
import { CallCommand } from "./CallCommand";
import { AddCommand } from "./AddCommand";
import { RepeatCommand } from "./RepeatCommand";
import { PrintCommand } from "./PrintCommand";
import { AskCommand } from "./AskCommand";
import { AbstractSyntaxTreeGenerator } from "../AbstractSyntaxTreeGenerator";
import { IfCommand } from "./IfCommand";
import { ElseCommand } from "./ElseCommand";
import { WaitCommand } from "./WaitCommand";
import { SetCommand } from "./SetCommand";
import { CommentCommand } from "./CommentCommand";
import { RemoveCommand } from "./RemoveCommand";
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor() {
    }
    CommandExecutor.executeCommand = function (abstractSyntaxTree) {
        var ast;
        if (typeof abstractSyntaxTree === "string") {
            ast = AbstractSyntaxTreeGenerator.generate(abstractSyntaxTree)[0];
        }
        else {
            ast = abstractSyntaxTree;
        }
        var code = "\n";
        if (AliasManager.getCommandAliases(ast.command.toLowerCase()).length > 0) {
            if (this.COMMANDS[AliasManager.getCommandAliases(ast.command.toLowerCase())[0]]) {
                code = this.COMMANDS[AliasManager.getCommandAliases(ast.command.toLowerCase())[0]].execute(ast.args);
            }
        }
        else {
            if (ast.command !== "") {
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
            code += "}\n";
        }
        code += "\n";
        return code;
    };
    CommandExecutor.COMMANDS = {
        "@": new JSCommand(),
        "//": new CommentCommand(),
        create: new CreateCommand(),
        call: new CallCommand(),
        add: new AddCommand(),
        remove: new RemoveCommand(),
        repeat: new RepeatCommand(),
        print: new PrintCommand(),
        ask: new AskCommand(),
        if: new IfCommand(),
        else: new ElseCommand(),
        wait: new WaitCommand(),
        set: new SetCommand(),
    };
    return CommandExecutor;
}());
export { CommandExecutor };
//# sourceMappingURL=CommandExecutor.js.map