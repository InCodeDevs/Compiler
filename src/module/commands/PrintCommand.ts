/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";
import { InCodeCommand } from "./InCodeCommand";

export class PrintCommand extends InCodeCommand {
  public execute(args: string[]): string {
    if (args.length < 4) {
      return "// This line contained a print command, but it was missing arguments.";
    } else {
      if (AliasManager.getTypeAliases(args[3]).length > 0) {
        return `${AliasManager.getTypeAliases(args[3])[0]}(${args[0].replace(
          /\u0000/g,
          " "
        )});`;
      } else {
        return "// This line contained a print command, but the type was not recognized.";
      }
    }
  }
}
