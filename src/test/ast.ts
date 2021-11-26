/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as fs from "fs";
import * as path from "path";
import AbstractSyntaxTreeGenerator from "../modules/AbstractSyntaxTreeGenerator";
import { InCodeTest } from "./InCodeTest";
import chalk from "chalk";

export default class AST extends InCodeTest {
  runTest() {
    console.log();
    fs.readdirSync(
      path.join(__dirname, "..", "..", "resources", "test", "ast")
    ).forEach((file) => {
      if (file.endsWith(".incode")) {
        if (
          fs.existsSync(
            path.join(
              __dirname,
              "..",
              "..",
              "resources",
              "test",
              "ast",
              file + ".hash"
            )
          )
        ) {
          const resultContent = fs
            .readFileSync(
              path.join(
                __dirname,
                "..",
                "..",
                "resources",
                "test",
                "ast",
                file + ".hash"
              )
            )
            .toString();
          const content = fs
            .readFileSync(
              path.join(__dirname, "..", "..", "resources", "test", "ast", file)
            )
            .toString();

          const result = JSON.stringify(
            new AbstractSyntaxTreeGenerator(content, 4).finalize()
          );

          this.check(result, resultContent, "resources/test/ast", file);

          /*
                    const res_md5 = crypto.createHash("md5");

                    res_md5.update(result);
                    const res_digest = res_md5.digest("hex");

                    if (res_digest === resultContent) {
                      console.log(
                        chalk.bgGreenBright.black(" PASSED ") +
                          "\t" +
                          chalk.gray("resources/test/ast/") +
                          file
                      );
                    } else {
                      console.log(
                        chalk.bgRed.black(" FAILED ") +
                          "\t" +
                          chalk.gray("resources/test/ast/") +
                          file
                      );
                      console.log("\nNeeded: " + resultContent);
                      console.log("Output Hash: " + res_digest);
                      console.log("Output: " + result + "\n");
                    }
                  } else {
                    console.log(
                      chalk.bgRed.black(" FAILED ") +
                        "\t" +
                        chalk.gray("resources/test/ast/") +
                        file
                    );
                  }
                  console.log();
                }*/
        }
      }
    });
  }
}
