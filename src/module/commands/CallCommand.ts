/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export class CallCommand {
  public static compile(args: string[]): string {
    if (args.length < 1) {
      return "// This line contained a call command, but it was missing arguments.";
    } else {
      return `window.incode.${args[0]}();`;
    }
  }
}
