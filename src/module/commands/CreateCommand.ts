/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";

export class CreateCommand {
  public static compile(args: string[]): string {
    if (args.length < 1) {
      return "// This line contained a create command, but no arguments were provided.";
    }
    if (args.length === 1) {
      return `let ${args[0]};`;
    } else {
      if (AliasManager.getTypeAliases(args[2]).length > 0) {
        if (AliasManager.getTypeAliases(args[2])[0] === "function") {
          return `window.incode.${args[0]} = () =>`;
        }
        return `let ${args[0]} = document.createElement('${
          AliasManager.getTypeAliases(args[2])[0]
        }');`;
      } else {
        return `let ${args[0]} = document.createElement("div"); // "${args[2]}" -> Not Found`;
      }
    }
  }
}
