/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../types/AbstractSyntaxTree";
import { AbstractSyntaxTreeGenerator } from "./AbstractSyntaxTreeGenerator";
import { CommandExecutor } from "./commands/CommandExecutor";
import { js_beautify as beautify } from "js-beautify";
import { PreCompiler } from "../util/PreCompiler";

export class Compiler {
  public static compile(
    source: string | AbstractSyntaxTree[],
    comments: boolean = false // @TODO: implement
  ): string {
    if (typeof source === "string") {
      source = PreCompiler.preCompile(source);
    }
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
      code += CommandExecutor.executeCommand(node) + "\n";
    });

    return beautify(code, {
      indent_char: " ",
      indent_size: 2,
    });
  }
}

console.log(
  Compiler.compile(
    "Wenn die Taste x gedrückt wird Gib 'Hello World' in der Dialogbox aus"
  )
);
