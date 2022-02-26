/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";
import { InCodeCommand } from "./InCodeCommand";

export class RemoveCommand extends InCodeCommand {
  public execute(args: string[]): string {
    if (args.length < 3) {
      return "// This line contained a remove command, but it was missing arguments.";
    } else {
      const element = args[0];
      let parent = args[args.length - 1];
      if (AliasManager.getTypeAliases(parent).length > 0) {
        parent = AliasManager.getTypeAliases(parent)[0];
      }
      return `${parent}.removeChild(${element});`;
    }
  }
}
