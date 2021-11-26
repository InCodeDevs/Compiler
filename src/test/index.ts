/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import AST from "./ast";

let startTime, endTime;

startTime = new Date();

new AST().runTest();

endTime = new Date();
let timeDiff = endTime - startTime;
timeDiff /= 1000;
console.log();
console.log("Time elapsed: " + timeDiff + " seconds");
console.log();
