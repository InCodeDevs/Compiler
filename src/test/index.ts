/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import AST from "./ast";
import { InCodeTest } from "./InCodeTest";
import chalk from "chalk";

let startTime, endTime;

startTime = new Date();

new AST().runTest();

endTime = new Date();
let timeDiff = endTime - startTime;
timeDiff /= 1000;
console.log();
console.log(
  "Tests PASSED: " +
    (InCodeTest.TOTAL_TESTS - InCodeTest.FAILED_TESTS) +
    "/" +
    InCodeTest.TOTAL_TESTS
);
console.log("Time elapsed: " + timeDiff + " seconds");
console.log();
