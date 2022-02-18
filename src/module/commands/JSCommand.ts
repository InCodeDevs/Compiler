/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export class JSCommand {
  public static readonly COMMAND_NAME = "@";

  public static compile(args: string[]): string {
    return args.join(" ");
  }
}
