/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { InCodeCommand } from "./InCodeCommand";

export class WaitCommand extends InCodeCommand {
  execute(args: string[]): string {
    if (args.length < 1) {
      return "// This line contained a wait command, but it was missing arguments.";
    } else {
      if (!parseFloat(args[0])) {
        return `// This line contained a wait command, but the given time was not a number.`;
      } else {
        return `await new Promise(done => setTimeout(() => done(), ${args[0]}000))`;
      }
    }
    return "";
  }
}
