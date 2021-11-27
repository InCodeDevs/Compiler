/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import AST from "./ast";
import { InCodeTest } from "./InCodeTest";
import chalk from "chalk";
import All from "./all";
import Language from "./language";

let startTime, endTime;

startTime = new Date();

new AST().runTest();
new All().runTest();
new Language().runTest();

endTime = new Date();
let timeDiff = endTime - startTime;
timeDiff /= 1000;
console.log();
console.log("Time elapsed: " + timeDiff + " seconds");
console.log();

console.log(
  "Tests PASSED: " +
    (InCodeTest.TOTAL_TESTS - InCodeTest.FAILED_TESTS) +
    "/" +
    InCodeTest.TOTAL_TESTS
);
if (InCodeTest.FAILED_TESTS === 0) {
  console.log(chalk.greenBright("All tests passed.\n"));
  process.exit(0);
} else {
  console.log(chalk.red("Not all tests passed.\n"));
  process.exit(1);
}
