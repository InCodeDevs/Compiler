/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import chalk from "chalk";

export default class InCodeError {
  constructor(name: string, message: string) {
    try {
      throw new Error("Silent Error");
    } catch (e) {
      console.log(
        chalk.bgRed.black(" ERROR ") +
          "\t\t" +
          chalk.gray(name) +
          ": " +
          message
      );
    }
  }
}
