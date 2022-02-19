/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AliasManager } from "../AliasManager";

export class AddCommand {
  public static compile(args: string[]): string {
    if (args.length < 4) {
      return "// This line contained an add command, but it was missing arguments.";
    } else {
      const element = args[0];
      let parent = args[args.length - 2];
      if (AliasManager.getTypeAliases(parent).length > 0) {
        parent = AliasManager.getTypeAliases(parent)[0];
      }
      return `${parent}.appendChild(${element});`;
    }
  }
}
