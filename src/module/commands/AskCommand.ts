/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export class AskCommand {
  public static compile(args: string[]): string {
    if (args.length === 0) {
      return "// This line contained a print command, but it was missing arguments.";
    } else {
      args[0] = args[0].replace(/\u0000/g, " ");
      if (args.length === 1) {
        return `prompt(${args[0]});`;
      } else {
        return `let ${args[args.length - 1]} = prompt(${args[0]});`;
      }
    }
  }
}
