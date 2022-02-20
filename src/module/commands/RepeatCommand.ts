/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";
import { InCodeCommand } from "./InCodeCommand";

export class RepeatCommand extends InCodeCommand {
  public execute(args: string[]): string {
    if (args.length < 2) {
      return "// This line contained a repeat command, but it was missing arguments.";
    } else {
      if (args.length === 2) {
        return `for (let i = 0; i < ${args[0]}; i++)`;
      } else if (args.length === 6) {
        if (AliasManager.getOperatorAliases(args[2]).length > 0) {
          return `while(${args[1]} ${
            AliasManager.getOperatorAliases(args[2])[0]
          } ${args[4]})`;
        } else {
          return `// This line contained a repeat command, but the operator was not recognized.`;
        }
      } else {
        return `// This line contained a repeat command, but it had too many arguments.`;
      }
    }
  }
}
