/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import chalk from "chalk";

export default class AbstractSyntaxTreeGenerationError extends Error {
  constructor(msg: string) {
    super();
    this.message = chalk.red("\n\n" + msg + "\n\n");
    this.stack = "";
    this.name = "AbstractSyntaxTreeGenerationError";
  }
}
