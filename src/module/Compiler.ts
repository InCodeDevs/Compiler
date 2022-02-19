/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../types/AbstractSyntaxTree";
import { AbstractSyntaxTreeGenerator } from "./AbstractSyntaxTreeGenerator";
import { AliasManager } from "./AliasManager";
import { JSCommand } from "./commands/JSCommand";
import { CreateCommand } from "./commands/CreateCommand";
import { CallCommand } from "./commands/CallCommand";
import { AddCommand } from "./commands/AddCommand";
import { RepeatCommand } from "./commands/RepeatCommand";

export class Compiler {
  public static compile(
    source: string | AbstractSyntaxTree[],
    comments: boolean = false // @TODO: implement
  ): string {
    let ast: AbstractSyntaxTree[] = [];
    if (typeof source === "string") {
      ast = AbstractSyntaxTreeGenerator.generate(source);
    }

    let code = `/**
 * @generator InCode
 * @version 2.x
 */\n\nwindow.incode = {}\n\n`;

    ast.forEach((node) => {
      // code += "Code Comment" // TODO: implement
      code += this.compileNode(node) + "\n";
    });

    return code;
  }

  public static compileNode(ast: AbstractSyntaxTree): string {
    let code = "";

    if (AliasManager.getCommandAliases(ast.command.toLowerCase()).length > 0) {
      switch (AliasManager.getCommandAliases(ast.command.toLowerCase())[0]) {
        case "@":
          code += JSCommand.compile(ast.args);
          break;
        case "create":
          code += CreateCommand.compile(ast.args);
          break;
        case "call":
          code += CallCommand.compile(ast.args);
          break;
        case "add":
          code += AddCommand.compile(ast.args);
          break;
        case "repeat":
          code += RepeatCommand.compile(ast.args);
          break;
        default:
          code += `// ${ast.command} ${ast.args.join(
            " "
          )} -> Command not implemented yet.`;
      }
    } else {
      code += `// "${ast.command} ${ast.args.join(" ")}" -> Command ${
        ast.command
      } not found.`;
    }

    if (ast.children.length > 0) {
      code += " {\n";
      ast.children.forEach((child) => {
        for (let i = 0; i < child.intents; i++) {
          code += "  ";
        }
        code += this.compileNode(child);
      });
      code += "}";
    }

    code += "\n";

    return code;
  }
}

console.log(Compiler.compile("Wiederhole solange x kleiner als 10 ist"));
