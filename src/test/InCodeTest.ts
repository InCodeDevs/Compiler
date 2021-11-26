/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as crypto from "crypto";
import chalk from "chalk";

export abstract class InCodeTest {
  abstract runTest();

  public static TOTAL_TESTS = 0;
  public static FAILED_TESTS = 0;

  public check(
    gen: string,
    needed_hash: string,
    path: string,
    file: string
  ): boolean {
    InCodeTest.TOTAL_TESTS++;
    const gen_md5 = crypto.createHash("md5");
    gen_md5.update(gen);
    const gen_digest = gen_md5.digest("hex");

    console.log();
    if (gen_digest === needed_hash) {
      console.log(
        chalk.bgGreenBright.black(" PASSED ") +
          "\t" +
          chalk.gray(path + "/") +
          file
      );
    } else {
      InCodeTest.FAILED_TESTS++;
      console.log(
        chalk.bgRed.black(" FAILED ") + "\t" + chalk.gray(path + "/") + file
      );
      console.log("\nNeeded: " + needed_hash);
      console.log("Output Hash: " + gen_digest);
      console.log("Output: " + gen + "\n");
    }
    console.log();

    return gen_digest === needed_hash;
  }
}
